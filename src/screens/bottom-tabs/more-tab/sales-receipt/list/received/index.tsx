import React, {FunctionComponent} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDeleteSheet, AppFlashList} from '../../../../../../components';
import {showToast} from '../../../../../../components/app-toast';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from '../../../../../../config/const';
import {
  receiptAdapter,
  receiptSelector,
  useDeleteMultipleReceiptApiMutation,
  useGetAllRecievedReceiptsApiQuery,
} from '../../../../../../state/services/receipt/api';
import {
  apiListParamsState,
  setReceiptApiListParams,
} from '../../../../../../state/slices/api-list-params/apiListParamsSlice';
import {BaseSheetProps} from '../../../../../../types/Sheet';
import {getErrorMessage} from '../../../../../../utils/helpers';
import ReceiptChartFilterSheet from './../../chart-filter-sheet';
import RenderReceiptItem from './../../render-receipt-item';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

const ReceiptReceivedList: FunctionComponent<{
  onScroll?:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | undefined;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIds: string[];
  isSelecting: boolean;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  filterSheet: BaseSheetProps;
  muitiDeleteSheet: BaseSheetProps;
}> = ({
  onScroll,
  isSelecting,
  selectedIds,
  setSelectedIds,
  setIsSelecting,
  filterSheet,
  muitiDeleteSheet,
}) => {
  const {receiptApiListParams} = useSelector(apiListParamsState);
  const dispatch = useDispatch();

  const {
    data: receiptData,
    isFetching: isReceiptFetching,
    isLoading: isReceiptLoading,
  } = useGetAllRecievedReceiptsApiQuery(receiptApiListParams.received, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: receiptSelector.selectAll(
          data?.data ?? receiptAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const [deleteMultipleReceipt, {isLoading: isDeleteMultipleInvoiceLoading}] =
    useDeleteMultipleReceiptApiMutation();

  const _handleMultipleDelete = async () => {
    if (selectedIds.length) {
      try {
        const response = await deleteMultipleReceipt({
          arrayOfReceiptId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Receipt deleted successfully',
          message: response.message,
        });
      } catch (error) {
        showToast('ERROR', {
          title: 'Error Encountered!',
          message: getErrorMessage(error),
        });
      }
    }
  };

  const handleSelect = (itemId: string) => {
    if (!isSelecting) {
      setSelectedIds([itemId]);
      setIsSelecting(true);
      if (muitiDeleteSheet.openSheet) {
        muitiDeleteSheet.openSheet();
      }
    } else {
      const isChecked = selectedIds.includes(itemId);
      setSelectedIds(
        !isChecked
          ? [...selectedIds.filter(el => el !== itemId), itemId]
          : selectedIds.filter(el => el !== itemId),
      );
    }
  };
  const isLoading = isReceiptFetching || isDeleteMultipleInvoiceLoading;
  return (
    <>
      <AppFlashList
        data={receiptData?.data}
        onScroll={onScroll}
        isFetchingMore={isReceiptFetching}
        isLoading={isReceiptLoading}
        emptyListAlert={{
          description: 'All sales receipt sent to you will be on this page',
          removeButton: true,
        }}
        contentContainerPaddingTop={CONTAINER_HEIGHT}
        extraData={[isSelecting]}
        onEndReached={() => {
          if (
            !isReceiptFetching &&
            receiptData?.nextPage &&
            receiptData?.data.length
          ) {
            dispatch(
              setReceiptApiListParams({
                type: 'received',
                params: {page: receiptData.nextPage},
              }),
            );
          }
        }}
        keyExtractor={item => item.id}
        renderItem={renderedItem => (
          <RenderReceiptItem
            renderedItem={renderedItem}
            isSelecting={isSelecting}
            shouldCloseSlide={isSelecting || isLoading}
            selected={selectedIds.includes(renderedItem.item.id)}
            onSelect={() => handleSelect(renderedItem.item.id)}
          />
        )}
      />

      <AppDeleteSheet
        onClose={() => {
          setSelectedIds([]);
          setIsSelecting(false);
        }}
        shouldCloseSheetWhenItemPressed={!!selectedIds.length}
        sheetRef={muitiDeleteSheet.sheetRef}
        closeSheet={muitiDeleteSheet.closeSheet}
        onPressDelete={_handleMultipleDelete}
      />
      <ReceiptChartFilterSheet
        closeSheet={filterSheet.closeSheet}
        sheetRef={filterSheet.sheetRef}
        onFilterPress={status =>
          dispatch(
            setReceiptApiListParams({
              type: 'sent',
              params: {recordStatus: status},
            }),
          )
        }
      />
    </>
  );
};

export default ReceiptReceivedList;
