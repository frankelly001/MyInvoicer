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
  orderAdapter,
  orderSelector,
  useDeleteMultipleOrderApiMutation,
  useGetAllRecievedOrdersApiQuery,
} from '../../../../../../state/services/order/api';
import {
  apiListParamsState,
  setOrderApiListParams,
} from '../../../../../../state/slices/api-list-params/apiListParamsSlice';
import {BaseSheetProps} from '../../../../../../types/Sheet';
import {getErrorMessage} from '../../../../../../utils/helpers';
import OrderChartFilterSheet from './../../chart-filter-sheet';
import RenderOrderItem from './../../render-order-item';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

const OrderReceivedList: FunctionComponent<{
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
  const {orderApiListParams} = useSelector(apiListParamsState);
  const dispatch = useDispatch();
  const {
    data: orderData,
    isFetching: isOrderFetching,
    isLoading: isOrderLoading,
  } = useGetAllRecievedOrdersApiQuery(orderApiListParams.received, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: orderSelector.selectAll(
          data?.data ?? orderAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const [deleteMultipleOrder, {isLoading: isDeleteMultipleInvoiceLoading}] =
    useDeleteMultipleOrderApiMutation();

  const _handleMultipleDelete = async () => {
    if (selectedIds.length) {
      try {
        const response = await deleteMultipleOrder({
          arrayOfOrderId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Order deleted successfully',
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

  const isLoading =
    isOrderFetching || isOrderLoading || isDeleteMultipleInvoiceLoading;

  return (
    <>
      <AppFlashList
        data={orderData?.data}
        onScroll={onScroll}
        isLoading={isLoading}
        isFetchingMore={isOrderFetching}
        contentContainerPaddingTop={CONTAINER_HEIGHT}
        emptyListAlert={{
          description: 'All purchase order sent to you will be on this page',
          removeButton: true,
        }}
        onEndReached={() => {
          if (
            !isOrderLoading &&
            orderData?.nextPage &&
            orderData?.data.length
          ) {
            dispatch(
              setOrderApiListParams({
                type: 'received',
                params: {page: orderData.nextPage},
              }),
            );
          }
        }}
        extraData={[isSelecting]}
        keyExtractor={item => item.id}
        renderItem={renderedItem => (
          <RenderOrderItem
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
      <OrderChartFilterSheet
        closeSheet={filterSheet.closeSheet}
        sheetRef={filterSheet.sheetRef}
        onFilterPress={status =>
          dispatch(
            setOrderApiListParams({
              type: 'sent',
              params: {recordStatus: status},
            }),
          )
        }
      />
    </>
  );
};

export default OrderReceivedList;
