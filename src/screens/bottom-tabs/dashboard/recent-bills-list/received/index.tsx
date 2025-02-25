import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {EmptyFileIcon} from '../../../../../assets/svg';
import {AppFlashList, ItemCard} from '../../../../../components';
import {colors} from '../../../../../config/colors';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {useGetAllRecievedBillingsApiQuery} from '../../../../../state/services/customer/api';

const RecentReceivedBillsList: FunctionComponent = () => {
  const {data: receivedBillings, isLoading} = useGetAllRecievedBillingsApiQuery(
    {
      page: 1,
      documentCount: 5,
    },
  );

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
      data={receivedBillings?.data}
      isLoading={isLoading}
      emptyListAlert={{
        description:
          'Create your first invoice and start billing your customers.',
        removeButton: true,
        Icon: (
          <EmptyFileIcon width={60} height={60} fill={colors.highlight_1} />
        ),
        containerStyle: {
          marginTop: 25,
          paddingBottom: 50,
        },
      }}
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

export default RecentReceivedBillsList;
