import React, {FunctionComponent, useState} from 'react';
import {InvoiceMoreSheet} from '../../../../components/sheets/more-sheet';
import {useSheet} from '../../../../hooks/useSheet';
import {GeneralScreenProps} from '../../../../navigation/types';
import {useGetInvoiceByIdApiQuery} from '../../../../state/services/invoice/api';
import {
  convertToReadableDate,
  getCurrencySymbol,
} from '../../../../utils/helpers';
import {billHTML} from '../../../../utils/helpers/html-preview/billHTML';
import {BillPreviewScreen} from '../common';

const PreviewInvoice: FunctionComponent<
  GeneralScreenProps<'PREVIEW_INVOICE'>
> = ({route}) => {
  const {data, isLoading} = useGetInvoiceByIdApiQuery({
    invoiceId: route.params?.invoiceId,
  });
  const [showAlert, setShowAlert] = useState(false);

  const html = billHTML({
    type: 'invoice',
    billDates: [
      {
        label: 'Issued date:',
        value: convertToReadableDate(data?.issuedDate, 'MMM DD, YYYY'),
      },
      {
        label: 'Due date:',
        value: convertToReadableDate(data?.dueDate, 'MMM DD, YYYY'),
      },
    ],
    businessData: data?.businessData,
    billNumber: `#${data?.invoiceNumber}`,
    customerData: data?.customerData,
    amountDue: `${
      Number(data?.grandTotal ?? 0) - Number(data?.amountDeposited ?? 0)
    }`,
    products: data?.products,
    billTerms: data?.invoiceTerms,
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

  console.log('Yesss');

  return (
    <>
      <BillPreviewScreen
        html={data ? html : undefined}
        onMorePress={openMoreSheet}
        type="invoice"
        isLoading={isLoading}
        fileName={data?.invoiceNumber}
      />
      {data && (
        <InvoiceMoreSheet
          invoiceData={data}
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

export default PreviewInvoice;
