import React, {FunctionComponent, useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  AppCustomSelectInput,
  AppHeader,
  AppScreen,
  AppTabTitleHeader,
  AppText,
} from '../../../components';
import {useBusinessesData} from '../../../components/app-custom-select-input/useBusinessesData';
import BilledPaidChart from './biiled-paid-chart';
import BillingMetricsCarousel from './bill-metrics-carousel';
import RecentBillsList from './recent-bills-list';
import {styles} from './styles';

const DashBoard: FunctionComponent = () => {
  const {data: businessData} = useBusinessesData();
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    if (businessData.length) {
      setBusinessId(businessData[0].value);
    }
  }, [businessData]);

  return (
    <AppScreen
      ScreenHeader={
        <>
          <AppHeader />
          <AppTabTitleHeader
            titleStyle={styles.flex1_5}
            screenTitle={'Home'}
            rightContent={
              <AppCustomSelectInput
                dataType="businesses"
                placeholder="Business"
                value={businessId}
                onChange={({value}) => setBusinessId(value)}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.input}
              />
            }
          />
          <View style={styles.subHeader}>
            <View style={styles.welcomeHeader}>
              <AppText
                text={'Hello dominic ovo!'}
                type="caption_m"
                textTransform="uppercase"
                color="neutral_dark_5"
              />
            </View>
            <BillingMetricsCarousel businessId={businessId as string} />
          </View>
        </>
      }>
      <BilledPaidChart />
      <RecentBillsList />
    </AppScreen>
  );
};

export default DashBoard;
