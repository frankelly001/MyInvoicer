import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {AppFlashList, ItemCard} from '../../../../../components';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {useGetAllBillingsApiQuery} from '../../../../../state/services/customer/api';

const RecentSentBillsList: FunctionComponent = () => {
  const {data: sentBillings, isLoading} = useGetAllBillingsApiQuery({
    page: 1,
    documentCount: 5,
  });

  const navigation = useNavigation<GeneralNavProp>();

  const navigationTypes = {
    estimate: (estimateId: string) =>
      navigation.navigate(routesNames.PREVIEW_ESTIMATE, {estimateId}),
    invoice: (invoiceId: string) =>
      navigation.navigate(routesNames.PREVIEW_INVOICE, {invoiceId}),
    order: (orderId: string) =>
      navigation.navigate(routesNames.PREVIEW_PURCHASE_ORDER, {orderId}),
    receipt: (receiptId: string) =>
      navigation.navigate(routesNames.PREVIEW_SALES_RECEIPT, {receiptId}),
  };

  return (
    <AppFlashList
      data={sentBillings?.data}
      isLoading={isLoading}
      estimatedItemSize={5}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ItemCard
          name={item?.customerData?.name}
          price={item.grandTotal}
          currency={item.currency}
          description={item.invoiceNumber}
          removeListNum
          enableSwipe={false}
          onPress={() => navigationTypes[item.type](item.id)}
        />
      )}
    />
  );
};

export default RecentSentBillsList;
