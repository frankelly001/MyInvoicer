import React, {FunctionComponent} from 'react';
import {useGetAllEstimateMetricsApiQuery} from '../../../../../state/services/estimate/api';
import {BaseSheetProps} from '../../../../../types/Sheet';
import {EstimateStatusTypes} from '../../../../../utils/constants/status';
import {AppChartFilterSheet} from '../../../../../components';

const EstimateChartFilterSheet: FunctionComponent<
  {
    onFilterPress?: (status: EstimateStatusTypes | null) => void;
  } & BaseSheetProps
> = ({onFilterPress = () => null, closeSheet, sheetRef}) => {
  const {data: invoiceMatricsData} = useGetAllEstimateMetricsApiQuery();
  const filterOptionsBtns = [
    {
      value: `${invoiceMatricsData?.totalEstimatesSent}`,
      label: 'Total Estimate Sent',
      onPress: () => onFilterPress(null),
    },
    {
      value: `${invoiceMatricsData?.totalEstimatesAccepted}/${invoiceMatricsData?.totalEstimatesSent}`,
      label: 'Total Accepted',
      onPress: () => onFilterPress('accepted'),
    },
    {
      value: `${invoiceMatricsData?.totalEstimatesDeclined}/${invoiceMatricsData?.totalEstimatesSent}`,
      label: 'Total Declined',
      onPress: () => onFilterPress('declined'),
    },
    {
      value: `${invoiceMatricsData?.totalEstimatesExpired}/${invoiceMatricsData?.totalEstimatesSent}`,
      label: 'Total Expired',
      onPress: () => onFilterPress('expired'),
    },
    {
      value: `${invoiceMatricsData?.totalEstimatesPending}/${invoiceMatricsData?.totalEstimatesSent}`,
      label: 'Total Pending',
      onPress: () => onFilterPress('pending'),
    },
    {
      value: `${invoiceMatricsData?.totalEstimatesDrafted}/${invoiceMatricsData?.totalEstimatesSent}`,
      label: 'Draft',
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

export default EstimateChartFilterSheet;
