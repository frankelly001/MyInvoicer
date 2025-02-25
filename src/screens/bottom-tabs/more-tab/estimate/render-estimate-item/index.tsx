import {useNavigation} from '@react-navigation/native';
import {ListRenderItemInfo} from '@shopify/flash-list';
import React, {FunctionComponent, useState} from 'react';
import {BillCard} from '../../../../../components';
import {EstimateMoreSheet} from '../../../../../components/sheets/more-sheet';
import {useSheet} from '../../../../../hooks/useSheet';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {Estimate} from '../../../../../types/Estimates';
import {convertToReadableDate} from '../../../../../utils/helpers';
import {convertToReadableTime} from '../../../../../utils/helpers/convertDate';

export const RenderEstimateItem: FunctionComponent<{
  isSelecting: boolean;
  shouldCloseSlide: boolean;
  renderedItem: ListRenderItemInfo<Estimate>;
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
        invoiceId={item?.estimateNumber}
        status={item?.estimateStatus}
        currency={item.currency}
        isSelecting={isSelecting}
        selected={selected}
        onPress={() => {
          if (!isSelecting) {
            return navigation.navigate(routesNames.PREVIEW_ESTIMATE, {
              estimateId: item.id,
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
      <EstimateMoreSheet
        sheetRef={moreSheetRef}
        closeSheet={closeMoreSheet}
        estimateData={item}
        showDeleteAlert={showAlert}
        setShowDeleteAlert={setShowAlert}
        onSelectPress={onSelect}
        removeActions={{delete: true}}
      />
    </>
  );
};

export default RenderEstimateItem;
