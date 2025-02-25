import {useNavigation} from '@react-navigation/native';
import {ListRenderItemInfo} from '@shopify/flash-list';
import React, {FunctionComponent, useState} from 'react';
import {BillCard} from '../../../../components';
import {InvoiceMoreSheet} from '../../../../components/sheets/more-sheet';
import {useSheet} from '../../../../hooks/useSheet';
import {routesNames} from '../../../../navigation/routes';
import {GeneralNavProp} from '../../../../navigation/types';
import {Invoice} from '../../../../types/Invoices';
import {convertToReadableDate} from '../../../../utils/helpers';
import {convertToReadableTime} from '../../../../utils/helpers/convertDate';

const RenderInvoiceItem: FunctionComponent<{
  isSelecting: boolean;
  shouldCloseSlide: boolean;
  renderedItem: ListRenderItemInfo<Invoice>;
  selected: boolean;
  onSelect?: () => void;
}> = ({
  onSelect = () => null,
  isSelecting,
  renderedItem,
  selected,
  shouldCloseSlide,
}) => {
  const {
    closeSheet: closeMoreSheet,
    openSheet: openMoreSheet,
    sheetRef: moreSheetRef,
  } = useSheet();

  const [showAlert, setShowAlert] = useState(false);
  const {item} = renderedItem;
  const navigation = useNavigation<GeneralNavProp>();

  return (
    <>
      <BillCard
        onLongPress={openMoreSheet}
        dateTime={`${convertToReadableDate(
          item?.createdAt,
          'YYYY-MM-DD',
        )}, ${convertToReadableTime(item?.createdAt)}`}
        fullname={item?.customerData?.name}
        price={`${item?.grandTotal}`}
        invoiceId={item?.invoiceNumber}
        status={item?.invoiceStatus}
        currency={item?.currency}
        isSelecting={isSelecting}
        selected={selected}
        onPress={() => {
          if (!isSelecting) {
            return navigation.navigate(routesNames.PREVIEW_INVOICE, {
              invoiceId: item.id,
            });
          } else {
            onSelect();
          }
        }}
        shouldCloseSlide={shouldCloseSlide}
        enableSwipe={!isSelecting}
        onMorePress={() => {
          openMoreSheet();
        }}
        onDeletePress={() => setShowAlert(true)}
      />
      <InvoiceMoreSheet
        sheetRef={moreSheetRef}
        closeSheet={closeMoreSheet}
        invoiceData={item}
        showDeleteAlert={showAlert}
        setShowDeleteAlert={setShowAlert}
        onSelectPress={onSelect}
        removeActions={{delete: true}}
      />
    </>
  );
};

export default RenderInvoiceItem;
