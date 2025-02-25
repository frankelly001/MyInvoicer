import React, {FunctionComponent} from 'react';
import {AppChartFilterSheet} from '../../../../components';
import {useGetAllCustomerMetricsApiQuery} from '../../../../state/services/customer/api';
import {BaseSheetProps} from '../../../../types/Sheet';

const CustomerChartFilter: FunctionComponent<
  {
    onFilterPress?: (status: null) => void;
  } & BaseSheetProps
> = ({onFilterPress = () => null, closeSheet, sheetRef}) => {
  const {data: invoiceMatricsData} = useGetAllCustomerMetricsApiQuery();

  const filterOptionsBtns = [
    {
      value: `${invoiceMatricsData?.totalCustomers}`,
      label: 'Total Customers',
      onPress: () => onFilterPress(null),
    },
    {
      value: `${invoiceMatricsData?.totalCustomers}`,
      label: 'Total Active Customers',
      onPress: () => onFilterPress(null),
    },
    {
      value: `${invoiceMatricsData?.totalCustomers}`,
      label: 'Total Inactive Customers',
      onPress: () => onFilterPress(null),
    },
    {
      value: `${invoiceMatricsData?.totalCustomers}`,
      label: 'Total New Customers',
      onPress: () => onFilterPress(null),
    },
  ];

  return (
    <AppChartFilterSheet
      filterOptionsBtns={filterOptionsBtns}
      closeSheet={closeSheet}
      sheetRef={sheetRef}
    />
  );
};

export default CustomerChartFilter;
