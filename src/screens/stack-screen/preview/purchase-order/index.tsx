import React, {FunctionComponent, useState} from 'react';
import {PurchaseOrderMoreSheet} from '../../../../components/sheets/more-sheet';
import {useSheet} from '../../../../hooks/useSheet';
import {GeneralScreenProps} from '../../../../navigation/types';
import {useGetOrderByIdApiQuery} from '../../../../state/services/order/api';
import {
  convertToReadableDate,
  getCurrencySymbol,
} from '../../../../utils/helpers';
import {billHTML} from '../../../../utils/helpers/html-preview/billHTML';
import {BillPreviewScreen} from '../common';

const PreviewPurchaseOrder: FunctionComponent<
  GeneralScreenProps<'PREVIEW_PURCHASE_ORDER'>
> = ({route}) => {
  const [showAlert, setShowAlert] = useState(false);
  const {data, isLoading} = useGetOrderByIdApiQuery({
    orderId: route.params?.orderId,
  });

  const html = billHTML({
    type: 'order',
    billDates: [
      {
        label: 'Order date:',
        value: convertToReadableDate(data?.orderDate, 'MMM DD, YYYY'),
      },
      {
        label: 'Ecpiry date:',
        value: convertToReadableDate(data?.orderExpiryDate, 'MMM DD, YYYY'),
      },
    ],
    businessData: data?.businessData,
    billNumber: `#${data?.orderNumber}`,
    customerData: data?.customerData,
    amountDue: `${
      Number(data?.grandTotal ?? 0) - Number(data?.amountDeposited ?? 0)
    }`,
    products: data?.products,
    billTerms: data?.orderTerms,
    discount: {percentage: '2%', price: `${data?.discount}`},
    tax: {
      percentage: '5%',
      price: `${data?.tax}`,
    },
    grandTotal: `${data?.grandTotal}`,
    subTotal: `${data?.subTotal}`,
    currency: getCurrencySymbol(data?.currency),
  });

  console.log(data);

  const {
    sheetRef: moreSheetRef,
    closeSheet: closeMoreSheet,
    openSheet: openMoreSheet,
  } = useSheet();

  return (
    <>
      <BillPreviewScreen
        html={data ? html : undefined}
        onMorePress={openMoreSheet}
        type="order"
        isLoading={isLoading}
        fileName={data?.orderNumber}
      />
      {data && (
        <PurchaseOrderMoreSheet
          orderData={data}
          sheetRef={moreSheetRef}
          closeSheet={closeMoreSheet}
          showDeleteAlert={showAlert}
          setShowDeleteAlert={setShowAlert}
          shouldGoBackOnDelete
        />
      )}
    </>
  );
};

export default PreviewPurchaseOrder;
