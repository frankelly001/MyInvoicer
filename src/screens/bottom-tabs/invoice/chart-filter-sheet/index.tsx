import React, {FunctionComponent} from 'react';
import {AppChartFilterSheet} from '../../../../components';
import {useGetAllInvoiceMetricsApiQuery} from '../../../../state/services/invoice/api';
import {BaseSheetProps} from '../../../../types/Sheet';
import {InvoiceStatusTypes} from '../../../../utils/constants/status';

const InvoiceChartFilterSheet: FunctionComponent<
  {
    onFilterPress?: (status: InvoiceStatusTypes | null) => void;
  } & BaseSheetProps
> = ({onFilterPress = () => null, closeSheet, sheetRef}) => {
  const {data: invoiceMatricsData} = useGetAllInvoiceMetricsApiQuery();
  const filterOptionsBtns = [
    {
      value: `${invoiceMatricsData?.totalInvoices}`,
      label: 'Total Invoice Sent',
      onPress: () => onFilterPress(null),
    },
    {
      value: `${invoiceMatricsData?.totalInvoicesPaid}/${invoiceMatricsData?.totalInvoices}`,
      label: 'Total Paid',
      onPress: () => onFilterPress('paid'),
    },
    {
      value: `${invoiceMatricsData?.totalInvoicesPending}/${invoiceMatricsData?.totalInvoices}`,
      label: 'Total Pending',
      onPress: () => onFilterPress('pending'),
    },
    {
      value: `${invoiceMatricsData?.totalInvoicesOverdue}/${invoiceMatricsData?.totalInvoices}`,
      label: 'Total Overdue',
      onPress: () => onFilterPress('overdue'),
    },
    {
      value: `${invoiceMatricsData?.totalInvoicesDrafted}/${invoiceMatricsData?.totalInvoices}`,
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

export default InvoiceChartFilterSheet;
