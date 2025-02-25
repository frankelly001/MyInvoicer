import React, {FunctionComponent} from 'react';
import {useGetAllOrderMetricsApiQuery} from '../../../../../state/services/order/api';
import {BaseSheetProps} from '../../../../../types/Sheet';
import {AppChartFilterSheet} from '../../../../../components';
import {OrderStatusTypes} from '../../../../../utils/constants/status';

const OrderChartFilterSheet: FunctionComponent<
  {
    onFilterPress?: (status: OrderStatusTypes | null) => void;
  } & BaseSheetProps
> = ({onFilterPress = () => null, closeSheet, sheetRef}) => {
  const {data: invoiceMatricsData} = useGetAllOrderMetricsApiQuery();
  const filterOptionsBtns = [
    {
      value: `${invoiceMatricsData?.totalOrdersSent}`,
      label: 'Total Order Sent',
      onPress: () => onFilterPress(null),
    },
    {
      value: `${invoiceMatricsData?.totalOrdersAccepted}/${invoiceMatricsData?.totalOrdersSent}`,
      label: 'Total Accepted',
      onPress: () => onFilterPress('accepted'),
    },
    {
      value: `${invoiceMatricsData?.totalOrdersExpired}/${invoiceMatricsData?.totalOrdersSent}`,
      label: 'Total Expired',
      onPress: () => onFilterPress('expired'),
    },
    {
      value: `${invoiceMatricsData?.totalOrdersDrafted}/${invoiceMatricsData?.totalOrdersSent}`,
      label: 'Total Drafted',
      onPress: () => onFilterPress('draft'),
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

export default OrderChartFilterSheet;
