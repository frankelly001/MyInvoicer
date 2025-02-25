/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import {
  ContactIcon,
  CustomersIcon,
  FileFilledIcon,
  InboxMailIcon,
  PhoneFilledIcon,
} from '../../../assets/svg';
import {
  AppBackButton,
  AppBottomSheet,
  AppButton,
  AppHeader,
  AppScreen,
  AppSeperator,
  AppTabSwitcher,
  AppTabTitleHeader,
  AppText,
  CustomerBillCard,
  DashedView,
} from '../../../components';
import {BillCustomerSheet} from '../../../components/sheets';
import {wp} from '../../../config/const';
import {useColors} from '../../../hooks/useColors';
import {useSheet} from '../../../hooks/useSheet';
import {routesNames} from '../../../navigation/routes';
import {GeneralScreenProps} from '../../../navigation/types';
import {
  useGetCustmerByIdApiQuery,
  useGetCustomerBillingsApiQuery,
} from '../../../state/services/customer/api';
import {Billing} from '../../../types/Billing';
import {EMPTY_STRING} from '../../../utils/constants/fieldDefaultValues';
import {convertToReadableDate} from '../../../utils/helpers';
import {makePhoneCall, sendEmail} from '../../../utils/helpers/linking';
import {logThis} from '../../../utils/helpers/logThis';
import {customerDetailsStyles} from './styles';

const createFields = [{name: 'Personal Info'}, {name: 'Billings'}];

const CustomerDetails: FunctionComponent<
  GeneralScreenProps<'CUSTOMER_DETAILS'>
> = ({route, navigation}) => {
  const colors = useColors();

  const {data: customerBillsData} = useGetCustomerBillingsApiQuery({
    customerId: route.params?.customerId,
  });

  const {data: customerData} = useGetCustmerByIdApiQuery({
    customerId: route.params.customerId,
  });

  const styles = customerDetailsStyles({colors});
  const scrollRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {closeSheet: closeImportSheet, sheetRef: importSheetRef} = useSheet();

  const {
    closeSheet: closeBillSheet,
    openSheet: openBillSheet,
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

  const customerBill = customerBillsData?.data;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const MAX_HEIGHT = wp(210);
  const MIN_HEIGHT = wp(0);

  const animateHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
    outputRange: [MAX_HEIGHT, MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <AppScreen
      isScrollable={false}
      ScreenHeader={
        <AppHeader
          LeftContent={<AppBackButton title="Customers" />}
          rightTitle="Edit"
          onPressRight={() => {
            if (customerData) {
              navigation.navigate(routesNames.EDIT_CUSTOMER, {
                customer: customerData,
              });
            }
          }}
        />
      }>
      <Animated.View style={{height: animateHeaderHeight}}>
        <AppTabTitleHeader
          screenTitle={customerData?.name ?? route.params.customerName}
        />
        <CustomerActions
          bill={{
            currency: customerBill?.currency,
            outStandingBalance: customerBill?.outStandingBalance,
            totalBillAmount: customerBill?.totalBillAmount,
          }}
          onPressBill={openBillSheet}
          onPressEmail={() => sendEmail({email: customerData?.email})}
          onPressPhone={() => makePhoneCall(customerData?.phone)}
        />
      </Animated.View>
      <View style={styles.tabSwitcher}>
        <AppTabSwitcher
          tabs={createFields}
          selectedIndex={selectedIndex}
          onChangeTab={i => setSelectedIndex(i)}
        />
      </View>

      {/* <Animated.FlatList
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
                address={customerData?.address}
                country={customerData?.country}
                currency={customerData?.country}
                email={customerData?.email}
                name={customerData?.name}
                phone={customerData?.phone}
                website={customerData?.website}
                dateAdded={customerData?.createdAt}
              />
            ),
          },
          {
            id: '2',
            Screen: (
              <BillingInfo
                billings={customerBill?.billings ?? []}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                  {useNativeDriver: false},
                )}
              />
            ),
          },
        ]}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return item.Screen;
        }}
      /> */}

      {selectedIndex ? (
        <BillingInfo
          billings={customerBill?.billings ?? []}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
            {useNativeDriver: false},
          )}
        />
      ) : (
        <PersonalInfo
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
            {useNativeDriver: false},
          )}
          address={customerData?.address}
          country={customerData?.country}
          currency={customerData?.country}
          email={customerData?.email}
          name={customerData?.name}
          phone={customerData?.phone}
          website={customerData?.website}
          dateAdded={customerData?.createdAt}
        />
      )}

      <View style={styles.submitBtn}>
        <AppButton
          text="Edit"
          borderWidth={1.5}
          borderColor="highlight_5"
          onPress={() =>
            setSelectedIndex(selectedIndex >= 1 ? 0 : selectedIndex + 1)
          }
          style={styles.btn}
        />
      </View>
      <AppBottomSheet
        sheetRef={importSheetRef}
        closeSheet={closeImportSheet}
        title={'Create new customer'}
        optionsBtns={createBtns}
      />
      <BillCustomerSheet
        sheetRef={billSheetRef}
        closeSheet={closeBillSheet}
        customer={{
          fullname: customerData?.name ?? EMPTY_STRING,
          address: customerData?.address ?? EMPTY_STRING,
          email: customerData?.email ?? EMPTY_STRING,
          phone: customerData?.phone ?? EMPTY_STRING,
        }}
      />
    </AppScreen>
  );
};

export default CustomerDetails;

interface CustomerActionsProps {
  bill: {
    currency: string | undefined;
    totalBillAmount: number | undefined;
    outStandingBalance: number | undefined;
  };
  onPressBill: () => void;
  onPressPhone: () => void;
  onPressEmail: () => void;
}

export const CustomerActions: React.FC<CustomerActionsProps> = ({
  bill,
  onPressBill,
  onPressEmail,
  onPressPhone,
}) => {
  const colors = useColors();
  const styles = customerDetailsStyles({colors});
  return (
    <View>
      <View style={styles.profileBillContainer}>
        {[
          {
            price: `${bill?.currency} ${bill?.totalBillAmount}`,
            label: 'Amount Billed',
          },
          {
            price: `${bill?.currency}${bill?.outStandingBalance}`,
            label: 'Outstanding Balance',
          },
        ].map(item => (
          <DashedView
            key={item.label}
            value={item.price}
            label={item.label}
            style={styles.billCard}
          />
        ))}
      </View>
      <View style={styles.profileBtnsContainer}>
        {[
          {
            label: 'Call',
            Icon: <PhoneFilledIcon fill={colors.highlight_5} />,
            onPress: onPressPhone,
          },
          {
            label: 'Email',
            Icon: <InboxMailIcon fill={colors.highlight_5} />,
            onPress: onPressEmail,
          },
          {
            label: 'Bill',
            Icon: <FileFilledIcon fill={colors.highlight_5} />,
            onPress: onPressBill,
          },
        ].map(item => (
          <AppButton
            key={item.label}
            text={item.label}
            LeftView={<View style={{marginRight: 8}}>{item.Icon}</View>}
            textColor="highlight_5"
            buttonColor="highlight_1"
            style={styles.profileBtn}
            onPress={item.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const PersonalInfo: FunctionComponent<{
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined | null;
  address: string | undefined | null;
  country: string | undefined;
  website: string | undefined | null;
  currency: string | undefined;
  dateAdded: string | undefined;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = props => {
  const colors = useColors();
  const styles = customerDetailsStyles({colors});
  const customerDetailsFields = [
    {label: 'Name', value: props?.name},
    {label: 'Email', value: props?.email},
    {label: 'Phone', value: props?.phone},
    {label: 'Address', value: props?.address},
    {label: 'Country', value: props?.country},
    {label: 'Website', value: props?.website ?? 'N/A'},
    {label: 'Currency', value: props.currency},
    {label: 'Date added', value: convertToReadableDate(props.dateAdded)},
  ];

  return (
    <>
      <FlatList
        data={customerDetailsFields}
        style={styles.sectionContainer}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <AppSeperator paddingHorizontal={0} />}
        onScroll={props.onScroll}
        keyExtractor={item => item.label}
        renderItem={({item, index}) => (
          <View key={index} style={styles.detailContainer}>
            <AppText text={item.label} color="neutral_dark_2" type="body_s" />
            <AppText
              text={item.value}
              color="neutral_dark_5"
              type="heading_h5"
            />
          </View>
        )}
      />
    </>
  );
};

const BillingInfo: FunctionComponent<{
  billings: Billing[];
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}> = ({billings, onScroll}) => {
  const colors = useColors();
  const styles = customerDetailsStyles({colors});

  return (
    <>
      <View
        style={[
          styles.sectionContainer,
          {paddingHorizontal: 0, paddingTop: 0},
        ]}>
        <FlatList
          data={billings}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          contentContainerStyle={{
            paddingBottom: 2000,
            backgroundColor: colors.neutral_light_1,
          }}
          renderItem={({item}) => (
            <CustomerBillCard
              date={item.createdAt}
              billNumber={item?.invoiceNumber ?? item?.estimateNumber}
              price={item.grandTotal}
              status={item?.invoiceStatus ?? item?.estimateStatus}
            />
          )}
        />
      </View>
    </>
  );
};
