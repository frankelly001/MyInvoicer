import React, {FunctionComponent, useState} from 'react';
import {ReceiptMoreSheet} from '../../../../components/sheets/more-sheet';
import {useSheet} from '../../../../hooks/useSheet';
import {GeneralScreenProps} from '../../../../navigation/types';
import {useGetReceiptByIdApiQuery} from '../../../../state/services/receipt/api';
import {
  convertToReadableDate,
  getCurrencySymbol,
} from '../../../../utils/helpers';
import {billHTML} from '../../../../utils/helpers/html-preview/billHTML';
import {BillPreviewScreen} from '../common';

const PreviewSalesReceipt: FunctionComponent<
  GeneralScreenProps<'PREVIEW_SALES_RECEIPT'>
> = ({route}) => {
  const [showAlert, setShowAlert] = useState(false);
  const {data, isLoading} = useGetReceiptByIdApiQuery({
    receiptId: route.params?.receiptId,
  });

  const html = billHTML({
    type: 'receipt',
    billDates: [
      {
        label: 'Receipt date:',
        value: convertToReadableDate(data?.receiptDate, 'MMM DD, YYYY'),
      },
    ],
    businessData: data?.businessData,
    billNumber: `#${data?.receiptNumber}`,
    customerData: data?.customerData,
    amountDue: `${data?.grandTotal}`,
    products: data?.products,
    billTerms: data?.receiptTerms,
    discount: {percentage: '2%', price: `${data?.discount}`},
    tax: {
      percentage: '5%',
      price: `${data?.tax}`,
    },
    grandTotal: `${data?.grandTotal}`,
    subTotal: `${data?.subTotal}`,
    currency: getCurrencySymbol(data?.currency),
  });

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
        type="receipt"
        isLoading={isLoading}
        fileName={data?.receiptNumber}
      />
      {data && (
        <ReceiptMoreSheet
          receiptData={data}
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

export default PreviewSalesReceipt;
