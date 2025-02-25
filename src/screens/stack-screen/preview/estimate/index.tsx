import React, {FunctionComponent, useState} from 'react';
import {EstimateMoreSheet} from '../../../../components/sheets/more-sheet';
import {useSheet} from '../../../../hooks/useSheet';
import {GeneralScreenProps} from '../../../../navigation/types';
import {useGetEstimateByIdApiQuery} from '../../../../state/services/estimate/api';
import {
  convertToReadableDate,
  getCurrencySymbol,
} from '../../../../utils/helpers';
import {billHTML} from '../../../../utils/helpers/html-preview/billHTML';
import {BillPreviewScreen} from '../common';

const PreviewEstimate: FunctionComponent<
  GeneralScreenProps<'PREVIEW_ESTIMATE'>
> = ({route}) => {
  const [showAlert, setShowAlert] = useState(false);
  const {data, isLoading} = useGetEstimateByIdApiQuery({
    estimateId: route.params?.estimateId,
  });

  const html = billHTML({
    type: 'estimate',
    billDates: [
      {
        label: 'Estimate date:',
        value: convertToReadableDate(data?.estimateDate, 'MMM DD, YYYY'),
      },
      {
        label: 'Expiry date:',
        value: convertToReadableDate(data?.expiryDate, 'MMM DD, YYYY'),
      },
    ],
    businessData: data?.businessData,
    billNumber: `#${data?.estimateNumber}`,
    customerData: data?.customerData,
    amountDue: `${
      Number(data?.grandTotal ?? 0) - Number(data?.amountDeposited ?? 0)
    }`,
    products: data?.products,
    billTerms: data?.estimateTerms,
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
        type="estimate"
        onMorePress={openMoreSheet}
        isLoading={isLoading}
        fileName={data?.estimateNumber}
      />
      {data && (
        <EstimateMoreSheet
          estimateData={data}
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

export default PreviewEstimate;
