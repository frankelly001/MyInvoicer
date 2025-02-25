/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Control, FieldPath, FieldValues, Path} from 'react-hook-form';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {
  AddIcon,
  ContactIcon,
  CustomersIcon,
} from '../../../../../../assets/svg';
import {
  AppBottomSheet,
  AppCustomSelectInput,
  AppDateTimePicker,
  AppSeperator,
  AppText,
  AppTextInput,
  AppTextarea,
} from '../../../../../../components';
import {FormFieldController} from '../../../../../../components/form-field-controller';
import {useColors} from '../../../../../../hooks/useColors';
import {useSheet} from '../../../../../../hooks/useSheet';
import {AllInputFields} from '../../../../../../types/Fields';
import {GeneralBillFormSchemaType} from '../schema';
import {createInvoicestyles} from '../styles';
import CustomerSelectSheet from './customers-select-sheet';
import ContactSelectSheet from './contact-select-sheet';
import {Contact} from 'react-native-contacts';
import {getAllContacts, getErrorMessage} from '../../../../../../utils/helpers';
import {showToast} from '../../../../../../components/app-toast';
import {BillType} from '../../../../../../types/Billing';

type BillInfoFormProps<T extends FieldValues> = {
  control: Control<T, GeneralBillFormSchemaType>;
  fields: AllInputFields<{[key in FieldPath<T>]: any}>;
  billType: BillType;
  disabledFields?: (keyof T)[];
  disableImportFrom?: boolean;
};
type ContactType = Pick<
  Contact,
  'recordID' | 'phoneNumbers' | 'emailAddresses' | 'postalAddresses'
> & {fullName: string};
const BillInfoForm = <T extends FieldValues>({
  control,
  fields,
  billType,
  disabledFields,
  disableImportFrom,
}: BillInfoFormProps<T>) => {
  const colors = useColors();
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const styles = createInvoicestyles({colors});

  const {
    sheetRef: importSheetRef,
    openSheet: openImportSheet,
    closeSheet: closeImportSheet,
  } = useSheet();
  const {
    sheetRef: customersSheetRef,
    openSheet: openCustomersSheet,
    closeSheet: closeCustomersSheet,
  } = useSheet();
  const {
    sheetRef: contactSheetRef,
    openSheet: openContactSheet,
    closeSheet: closeContactSheet,
  } = useSheet();

  const getContacts = async () => {
    try {
      const response = await getAllContacts();
      if (response) {
        const parsedContacts: ContactType[] = response.map(el => ({
          fullName:
            el.displayName ||
            `${el.givenName} ${el.middleName} ${el.familyName}`,
          emailAddresses: el.emailAddresses,
          phoneNumbers: el.phoneNumbers,
          postalAddresses: el.postalAddresses,
          recordID: el.recordID,
        }));
        setContacts(parsedContacts);
        openContactSheet();
      } else {
        showToast('ERROR', {
          title: 'Contact Permission',
          message: 'Contact permission is not allowed',
        });
      }
    } catch (error) {
      showToast('ERROR', {
        title: 'Contact Error:',
        message: getErrorMessage(error),
      });
    }
  };

  const createBtns = [
    {
      name: 'My contacts list',
      Icon: <ContactIcon fill={colors.neutral_dark_5} />,
      onPress: getContacts,
    },
    {
      name: 'My customers',
      Icon: <CustomersIcon stroke={colors.neutral_dark_5} />,
      onPress: openCustomersSheet,
    },
  ];

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <View style={styles.fieldContainer}>
            <AppText
              text={`Enter you ${billType} info`}
              type="heading_h3"
              color="neutral_dark_5"
            />
            <View style={styles.inputFields}>
              {fields.map(item => (
                <FormFieldController
                  key={item.name}
                  name={item.name}
                  control={control}
                  style={{...item.style}}
                  Field={({value, onChange}) => (
                    <>
                      {item?.type === 'date' ? (
                        <AppDateTimePicker
                          placeholder={item.placeholder}
                          label={item.label}
                          value={value}
                          onChange={onChange}
                        />
                      ) : item.type === 'custom_select' ? (
                        <AppCustomSelectInput
                          placeholder={item.placeholder}
                          label={item.label}
                          onChange={selectedItem =>
                            onChange(selectedItem.value)
                          }
                          search={item.search}
                          dataType={item.dataType}
                          value={value}
                        />
                      ) : (
                        <AppTextInput
                          placeholder={item.placeholder}
                          label={item.label}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                    </>
                  )}
                />
              ))}
            </View>

            <AppSeperator paddingHorizontal={0} />
            <AppText text={'From'} type="heading_h3" color="neutral_dark_5" />
            <FormFieldController
              name={'billFrom' as Path<T>}
              control={control}
              Field={({value, onChange}) => (
                <AppCustomSelectInput
                  placeholder={'My company'}
                  onChange={selectedItem => onChange(selectedItem.value)}
                  dataType="businesses"
                  value={value}
                />
              )}
            />

            <AppSeperator paddingHorizontal={0} />
            <View style={[styles.fieldTitleContainer]}>
              <AppText
                text={'Bill to'}
                type="heading_h3"
                color="neutral_dark_5"
              />
              {!disableImportFrom && (
                <TouchableOpacity
                  style={styles.fieldTitleBtn}
                  onPress={openImportSheet}>
                  <AddIcon width={14} height={14} />
                  <AppText
                    text={'Import from'}
                    type="heading_h5"
                    color="highlight_5"
                    style={styles.ml5}
                  />
                </TouchableOpacity>
              )}
            </View>
            {billToInputFields.map(item => (
              <FormFieldController
                key={item.name}
                name={item.name as Path<T>}
                control={control}
                style={{...item.style}}
                Field={({value, onChange}) => (
                  <>
                    {item.type === 'text_area' ? (
                      <AppTextarea
                        placeholder={item.placeholder}
                        label={item.label}
                        onChangeText={onChange}
                        disabled={disabledFields?.includes(item.name)}
                        value={value}
                      />
                    ) : (
                      <AppTextInput
                        placeholder={item.placeholder}
                        label={item.label}
                        onChangeText={onChange}
                        disabled={disabledFields?.includes(item.name)}
                        value={value}
                      />
                    )}
                  </>
                )}
              />
            ))}
          </View>
        </View>

        <AppBottomSheet
          title="Import from"
          sheetRef={importSheetRef}
          closeSheet={closeImportSheet}
          shouldCloseSheetOnItemPressed
          optionsBtns={createBtns}
        />
        <CustomerSelectSheet
          sheetRef={customersSheetRef}
          closeSheet={closeCustomersSheet}
          control={control as Control<any>}
        />
        <ContactSelectSheet
          closeSheet={closeContactSheet}
          sheetRef={contactSheetRef}
          control={control as Control<any>}
          contacts={contacts}
        />
      </ScrollView>
    </>
  );
};

export default BillInfoForm;

const billToInputFields: AllInputFields<GeneralBillFormSchemaType> = [
  {name: 'fullname', label: 'Full Name', placeholder: 'John Doe', type: 'text'},
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'name@email.com',
    type: 'text',
  },
  {name: 'phone', label: 'Phone', placeholder: '+234824643898', type: 'text'},
  {
    name: 'address',
    label: 'Address',
    placeholder: '34 Locoiln Str, New Owerri',
    type: 'text_area',
  },
];
