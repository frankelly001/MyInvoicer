import {useNavigation} from '@react-navigation/native';
import {ListRenderItemInfo} from '@shopify/flash-list';
import React, {FunctionComponent, useState} from 'react';
import {BillCard} from '../../../../../components';
import {PurchaseOrderMoreSheet} from '../../../../../components/sheets/more-sheet';
import {useSheet} from '../../../../../hooks/useSheet';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {Order} from '../../../../../types/Orders';
import {convertToReadableDate} from '../../../../../utils/helpers';
import {convertToReadableTime} from '../../../../../utils/helpers/convertDate';

export const RenderOrderItem: FunctionComponent<{
  isSelecting: boolean;
  shouldCloseSlide: boolean;
  renderedItem: ListRenderItemInfo<Order>;
  selected: boolean;
  onSelect?: () => void;
}> = ({
  onSelect = () => null,
  renderedItem,
  isSelecting,
  shouldCloseSlide,
  selected,
}) => {
  const {item} = renderedItem;
  const {
    closeSheet: closeMoreSheet,
    openSheet: openMoreSheet,
    sheetRef: moreSheetRef,
  } = useSheet();

  const [showAlert, setShowAlert] = useState(false);
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
        invoiceId={item?.orderNumber}
        status={item?.orderStatus}
        currency={item.currency}
        isSelecting={isSelecting}
        selected={selected}
        onPress={() => {
          if (!isSelecting) {
            return navigation.navigate(routesNames.PREVIEW_PURCHASE_ORDER, {
              orderId: item.id,
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
      <PurchaseOrderMoreSheet
        sheetRef={moreSheetRef}
        closeSheet={closeMoreSheet}
        orderData={item}
        showDeleteAlert={showAlert}
        setShowDeleteAlert={setShowAlert}
        onSelectPress={onSelect}
        removeActions={{delete: true}}
      />
    </>
  );
};

export default RenderOrderItem;
