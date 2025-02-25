import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ArrowRightIcon,
  ContactIcon,
  CustomersIcon,
  DeleteIcon,
  EstimateIcon,
  FileIcon,
  InvoiceIcon,
  ShoppingCartIcon,
} from '../../../assets/svg';
import {
  AppBackButton,
  AppBottomSheet,
  AppDisplayImage,
  AppHeader,
  AppLoading,
  AppScreen,
  AppTabSwitcher,
  AppTabTitleHeader,
  AppText,
} from '../../../components';
import AppListButton from '../../../components/app-list-button';
import {useColors} from '../../../hooks/useColors';
import {useSheet} from '../../../hooks/useSheet';
import {routesNames} from '../../../navigation/routes';
import {GeneralScreenProps} from '../../../navigation/types';
import {
  useDeactivateBusinessApiMutation,
  useGetAllBusinessByIdApiQuery,
  useUpdateBusinessApiMutation,
} from '../../../state/services/business/api';
import {AllInputFields} from '../../../types/Fields';
import {getScrollCurrentIndex} from '../../../utils/helpers/getScrollCurrentIndex';
import {logThis} from '../../../utils/helpers/logThis';
import SettingsSheet from './settings-sheet';
import {
  PredefinedNoteSchemaSchemaType,
  PredefinedNoteTermsSchemaSchemaType,
  ReasonSchemaSchemaType,
  predefinedNoteSchema,
  predefinedNoteTermsSchema,
  reasonSchema,
} from './shema';
import {businessDetailsStyles} from './styles';
import {UpdateBusinessSettings} from '../../../state/services/business/type';
import {showToast} from '../../../components/app-toast';
import {getErrorMessage} from '../../../utils/helpers';
import {BusinesSettings} from '../../../types/Business';
import {useNavigation} from '@react-navigation/native';

const createFields = [{name: 'Personal Info'}, {name: 'Settings'}];

const BusinessDetails: FunctionComponent<
  GeneralScreenProps<'BUSINESS_DETAILS'>
> = ({navigation, route}) => {
  const colors = useColors();

  const styles = businessDetailsStyles({colors});
  const scrollRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {data: businessIdData} = useGetAllBusinessByIdApiQuery({
    businessId: route.params?.business?.id,
  });

  console.log(businessIdData);

  const {
    closeSheet: closeImportSheet,
    // openSheet: openImportSheet,
    sheetRef: importSheetRef,
  } = useSheet();

  const {
    closeSheet: closeBillSheet,
    // openSheet: openBillSheet,
    sheetRef: billSheetRef,
  } = useSheet();

  useEffect(() => {
    scrollRef?.current?.scrollToIndex({
      index: selectedIndex,
      animated: true,
    });
  }, [selectedIndex]);

  const createBtns = [
    {
      name: 'Import from contacts list',
      Icon: <ContactIcon fill={colors.neutral_dark_5} />,
      onPress: () => logThis('yess'),
    },
    {
      name: 'New Customers',
      Icon: <CustomersIcon stroke={colors.neutral_dark_5} />,
      onPress: () => logThis('yess'),
    },
  ];
  const billOptions = [
    {
      name: 'New Invoice',
      Icon: <InvoiceIcon fill={colors.neutral_dark_5} />,
      onPress: () => logThis('yess'),
    },
    {
      name: 'New Estimate',
      Icon: <EstimateIcon stroke={colors.neutral_dark_5} />,
      onPress: () => logThis('yess'),
    },
    {
      name: 'New Sales Receipt',
      Icon: <FileIcon stroke={colors.neutral_dark_5} />,
      onPress: () => logThis('yess'),
    },
    {
      name: 'New Purchase Order',
      Icon: <ShoppingCartIcon fill={colors.neutral_dark_5} />,
      onPress: () => logThis('yess'),
    },
  ];

  return (
    <AppScreen isScrollable={false}>
      <AppHeader
        LeftContent={<AppBackButton title="My Business" />}
        rightTitle="Edit"
        onPressRight={() =>
          businessIdData &&
          navigation.navigate(routesNames.EDIT_BUSINESS, {
            business: businessIdData,
          })
        }
      />
      <AppTabTitleHeader screenTitle={route.params?.business?.name} />
      <View style={styles.profileContainer}>
        <View style={styles.imgContainer}>
          <AppDisplayImage uri={businessIdData?.logoUrl} size={78} />
        </View>
      </View>
      <View style={styles.tabSwitcher}>
        <AppTabSwitcher
          tabs={createFields}
          selectedIndex={selectedIndex}
          onChangeTab={i => setSelectedIndex(i)}
        />
      </View>

      <FlatList
        horizontal
        ref={scrollRef}
        pagingEnabled
        onMomentumScrollEnd={e => setSelectedIndex(getScrollCurrentIndex(e))}
        showsHorizontalScrollIndicator={false}
        data={[
          {
            id: '1',
            Screen: (
              <PersonalInfo
                address={businessIdData?.address}
                bank={businessIdData?.bankName}
                actName={businessIdData?.accName}
                actNumber={businessIdData?.accNumber}
                currency={businessIdData?.currency}
                email={businessIdData?.email}
                phone={businessIdData?.phone}
                website={businessIdData?.website}
              />
            ),
          },
          {
            id: '2',
            Screen: (
              <Settings
                businessId={route.params.business?.id}
                initialSettings={{
                  invoiceNotes: businessIdData?.invoiceNotes,
                  invoiceTermsAndConditions:
                    businessIdData?.invoiceTermsAndConditions,
                  estimateNotes: businessIdData?.estimateNotes,
                  estimateTermsAndConditions:
                    businessIdData?.estimateTermsAndConditions,
                  orderNotes: businessIdData?.orderNotes,
                  orderTermsAndConditions:
                    businessIdData?.orderTermsAndConditions,
                  receiptNotes: businessIdData?.receiptNotes,
                }}
              />
            ),
          },
        ]}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return item.Screen;
        }}
      />

      <AppBottomSheet
        sheetRef={importSheetRef}
        closeSheet={closeImportSheet}
        title={'Create new customer'}
        optionsBtns={createBtns}
      />

      <AppBottomSheet
        sheetRef={billSheetRef}
        closeSheet={closeBillSheet}
        title={'Bill customer'}
        optionsBtns={billOptions}
      />
    </AppScreen>
  );
};

export default BusinessDetails;

const PersonalInfo: FunctionComponent<{
  [key in
    | 'email'
    | 'phone'
    | 'address'
    | 'currency'
    | 'website'
    | 'actNumber'
    | 'actName'
    | 'bank']?: string;
}> = ({actName, actNumber, address, bank, currency, email, phone, website}) => {
  const colors = useColors();
  const styles = businessDetailsStyles({colors});
  const customerDetailsFields = [
    {label: 'Email', value: email},
    {label: 'Phone', value: phone},
    {label: 'Address', value: address},
    {label: 'Currency', value: currency},
    {label: 'Website', value: website},
    {label: 'Account Number', value: actNumber},
    {label: 'Account Name', value: actName},
    {label: 'Bank', value: bank},
  ];

  return (
    <>
      <View style={styles.sectionContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {customerDetailsFields.map((item, i) => (
            <View
              key={i}
              style={[
                styles.detailContainer,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  borderBottomWidth:
                    i + 1 === customerDetailsFields.length ? 0 : 0.5,
                },
              ]}>
              <AppText text={item.label} color="neutral_dark_2" type="body_s" />
              <AppText
                text={item.value}
                color="neutral_dark_5"
                type="heading_h5"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const Settings: FunctionComponent<{
  businessId: string;
  initialSettings: BusinesSettings;
}> = ({businessId, initialSettings}) => {
  const colors = useColors();
  const styles = businessDetailsStyles({colors});
  const navigation = useNavigation();

  const {
    closeSheet: closeInvSetSheet,
    openSheet: openInvSetSheet,
    sheetRef: invSetSheetRef,
  } = useSheet();
  const {
    closeSheet: closeEstSetSheet,
    openSheet: openEstSetSheet,
    sheetRef: estSetSheetRef,
  } = useSheet();
  const {
    closeSheet: closeSalesSetSheet,
    openSheet: openSalesSetSheet,
    sheetRef: salesSetSheetRef,
  } = useSheet();
  const {
    closeSheet: closeOrdersSetSheet,
    openSheet: openOrdersSetSheet,
    sheetRef: ordersSetSheetRef,
  } = useSheet();
  const {
    closeSheet: closeDeactivateBusinessSheet,
    openSheet: openDeactivateBusinessSheet,
    sheetRef: deactivateBusinessSheetRef,
  } = useSheet();

  const others = [
    {
      name: 'Online Payment',
    },
    {
      name: 'Invoice',
      onPress: openInvSetSheet,
    },
    {
      name: 'Estimates',
      onPress: openEstSetSheet,
    },
    {
      name: 'Sales Receipt',
      onPress: openSalesSetSheet,
    },
    {
      name: 'Purchase Orders',
      onPress: openOrdersSetSheet,
    },
    {
      name: 'Other Settings',
    },
  ];

  const [updateBusinessSettings, {isLoading: isUpdating}] =
    useUpdateBusinessApiMutation();
  const [deactivateBusiness, {isLoading: isDeactivating}] =
    useDeactivateBusinessApiMutation();

  const submitDeactivate = async ({
    values,
    reset,
  }: {
    values: ReasonSchemaSchemaType;
    reset: () => void;
  }) => {
    try {
      const response = await deactivateBusiness({
        deactivateBusiness: {businessId, reason: values.reasons},
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Business deactivated successfully',
        message: response.message,
      });
      reset();
      closeDeactivateBusinessSheet();
      navigation?.goBack();
    } catch (error) {
      showToast('ERROR', {
        title: 'Business deactivated failed',
        message: getErrorMessage(error),
      });
    }
  };

  const submitBusinessBillSettings = async ({
    settingsValues,
    onSuccess = () => null,
  }: {
    settingsValues: UpdateBusinessSettings;
    onSuccess?: () => void;
  }) => {
    try {
      const response = await updateBusinessSettings({
        updateBusinessSettings: {businessId, ...settingsValues},
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Business settings updated successfully',
        message: response.message,
      });
      onSuccess();
    } catch (error) {
      showToast('ERROR', {
        title: 'Business settings update failed',
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <>
      <AppLoading visible={isUpdating || isDeactivating} />
      <View style={[styles.sectionContainer]}>
        {others.map((item, i) => {
          return (
            <AppListButton
              onPress={item.onPress}
              key={i}
              title={item.name}
              RightIcon={<ArrowRightIcon fill={colors.neutral_dark_1} />}
              borderType={'Bottom'}
            />
          );
        })}
        <AppListButton
          title={'Deactivate business'}
          titleColor="support_error_3"
          RightIcon={<DeleteIcon fill={colors.support_error_3} />}
          onPress={openDeactivateBusinessSheet}
        />
      </View>
      <SettingsSheet
        title="Invoice settings"
        sheetRef={invSetSheetRef}
        closeSheet={closeInvSetSheet}
        inputFields={invoiceSettingsInputFields}
        validationShema={predefinedNoteTermsSchema}
        defaultValues={{
          predefinedNote: initialSettings?.invoiceNotes ?? '',
          predefinedTerms: initialSettings?.invoiceTermsAndConditions ?? '',
        }}
        onSubmit={({values}) =>
          submitBusinessBillSettings({
            settingsValues: {
              invoiceNotes: values.predefinedNote,
              invoiceTermsAndConditions: values.predefinedTerms,
            },
            onSuccess: closeInvSetSheet,
          })
        }
      />
      <SettingsSheet
        title="Estimate settings"
        sheetRef={estSetSheetRef}
        closeSheet={closeEstSetSheet}
        inputFields={estimateSettingsInputFields}
        validationShema={predefinedNoteTermsSchema}
        defaultValues={{
          predefinedNote: initialSettings?.estimateNotes ?? '',
          predefinedTerms: initialSettings?.estimateTermsAndConditions ?? '',
        }}
        onSubmit={({values}) =>
          submitBusinessBillSettings({
            settingsValues: {
              estimateNotes: values.predefinedNote,
              estimateTermsAndConditions: values.predefinedTerms,
            },
            onSuccess: closeEstSetSheet,
          })
        }
      />
      <SettingsSheet
        title="Sales receipt settings"
        sheetRef={salesSetSheetRef}
        closeSheet={closeSalesSetSheet}
        inputFields={salesSettingsInputFields}
        validationShema={predefinedNoteSchema}
        defaultValues={{
          predefinedNote: initialSettings?.receiptNotes ?? '',
        }}
        onSubmit={({values}) =>
          submitBusinessBillSettings({
            settingsValues: {
              receiptNotes: values.predefinedNote,
            },
            onSuccess: closeSalesSetSheet,
          })
        }
      />
      <SettingsSheet
        title="Purchase order settings"
        sheetRef={ordersSetSheetRef}
        closeSheet={closeOrdersSetSheet}
        inputFields={ordersSettingsInputFields}
        defaultValues={{
          predefinedNote: initialSettings?.orderNotes ?? '',
          predefinedTerms: initialSettings?.orderTermsAndConditions ?? '',
        }}
        validationShema={predefinedNoteTermsSchema}
        onSubmit={({values}) =>
          submitBusinessBillSettings({
            settingsValues: {
              orderNotes: values.predefinedNote,
              orderTermsAndConditions: values.predefinedTerms,
            },
            onSuccess: closeOrdersSetSheet,
          })
        }
      />
      <SettingsSheet
        title="Deactivate Business"
        sheetRef={deactivateBusinessSheetRef}
        closeSheet={closeDeactivateBusinessSheet}
        inputFields={deactivateBusinessInputFields}
        submitButtonColor="danger"
        submitButtonText="Deactivate"
        validationShema={reasonSchema}
        onSubmit={submitDeactivate}
      />
    </>
  );
};

const invoiceSettingsInputFields: AllInputFields<PredefinedNoteTermsSchemaSchemaType> =
  [
    {
      name: 'predefinedNote',
      label: 'Predefined Invoice Note',
      placeholder: 'Enter invoice note',
      type: 'text_area',
    },
    {
      name: 'predefinedTerms',
      label: 'Predefined Terms & Conditions',
      placeholder: 'Enter terms and condition',
      type: 'text_area',
    },
  ];
const estimateSettingsInputFields: AllInputFields<PredefinedNoteTermsSchemaSchemaType> =
  [
    {
      name: 'predefinedNote',
      label: 'Predefined Estimate Note',
      placeholder: 'Enter Estimate note',
      type: 'text_area',
    },
    {
      name: 'predefinedTerms',
      label: 'Predefined Terms & Conditions',
      placeholder: 'Enter terms and condition',
      type: 'text_area',
    },
  ];
const salesSettingsInputFields: AllInputFields<PredefinedNoteSchemaSchemaType> =
  [
    {
      name: 'predefinedNote',
      label: 'Predefined receipt Note',
      placeholder: 'Enter receipt note',
      type: 'text_area',
    },
  ];
const ordersSettingsInputFields: AllInputFields<PredefinedNoteTermsSchemaSchemaType> =
  [
    {
      name: 'predefinedNote',
      label: 'Predefined Order Note',
      placeholder: 'Enter Order note',
      type: 'text_area',
    },
    {
      name: 'predefinedTerms',
      label: 'Predefined Terms & Conditions',
      placeholder: 'Enter terms and condition',
      type: 'text_area',
    },
  ];
const deactivateBusinessInputFields: AllInputFields<ReasonSchemaSchemaType> = [
  {
    name: 'reasons',
    label: 'Reasons for deactivating',
    placeholder: 'Why do you want to deactivate this business? ',
    type: 'text_area',
  },
];
