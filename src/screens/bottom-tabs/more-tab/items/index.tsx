import React, {FunctionComponent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  AppBackButton,
  AppDeleteSheet,
  AppFlashList,
  AppScreen,
} from '../../../../components';
import {showToast} from '../../../../components/app-toast';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from '../../../../config/const';
import {useSheet} from '../../../../hooks/useSheet';
import {useStickyHeaderAnimation} from '../../../../hooks/useStickyHeaderAnimation';
import {GeneralScreenProps} from '../../../../navigation/types';
import {
  itemAdapter,
  itemSelector,
  useDeleteItemApiMutation,
  useDeleteMultipleItemApiMutation,
  useGetAllItemsApiQuery,
} from '../../../../state/services/item/api';
import {
  apiListParamsState,
  setItemApiListParams,
} from '../../../../state/slices/api-list-params/apiListParamsSlice';
import {useAppSelector} from '../../../../state/slices/store';
import {getErrorMessage} from '../../../../utils/helpers';
import ItemHeader from './header';
import RenderBillItem from './render-bill-item';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

const Items: FunctionComponent<GeneralScreenProps<'ITEMS'>> = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {itemApiListParams} = useAppSelector(apiListParamsState);
  const dispatch = useDispatch();

  const {
    closeSheet: closeDeleteSheet,
    openSheet: openDeleteSheet,
    sheetRef: deleteSheetRef,
  } = useSheet();

  const {
    data: itemData,
    isLoading: isItemsLoading,
    isFetching,
  } = useGetAllItemsApiQuery(itemApiListParams, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: itemSelector.selectAll(
          data?.data ?? itemAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const {onScroll, translateY} = useStickyHeaderAnimation(CONTAINER_HEIGHT);
  const [deleteMultipleInvoice, {isLoading: isDeleteMultipleItemLoading}] =
    useDeleteMultipleItemApiMutation();
  const [deleteItem, {isLoading: isDeleteItemLoading}] =
    useDeleteItemApiMutation();

  const _handleDelete = async (invId: string) => {
    try {
      const response = await deleteItem({
        itemId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Item deleted successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };
  const _handleMultipleDelete = async () => {
    if (selectedIds.length) {
      try {
        const response = await deleteMultipleInvoice({
          arrayOfItemId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Item deleted successfully',
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
      openDeleteSheet();
    } else {
      const isChecked = selectedIds.includes(itemId);
      setSelectedIds(
        !isChecked
          ? [...selectedIds.filter(el => el !== itemId), itemId]
          : selectedIds.filter(el => el !== itemId),
      );
    }
  };

  return (
    <AppScreen
      isScrollable={false}
      ScreenHeader={
        <ItemHeader
          translateY={translateY}
          leftTitle={isSelecting ? 'Cancel' : ''}
          LeftContent={isSelecting ? undefined : <AppBackButton title="More" />}
          onDelete={_handleDelete}
          onPressLeft={() => {
            if (isSelecting) {
              setSelectedIds([]);
              closeDeleteSheet();
            }
            setIsSelecting(false);
          }}
        />
      }>
      <AppFlashList
        data={itemData?.data}
        onScroll={onScroll}
        isLoading={isItemsLoading}
        contentContainerPaddingTop={CONTAINER_HEIGHT}
        isFetchingMore={isFetching}
        extraData={[isSelecting]}
        onEndReached={() => {
          if (!isFetching && itemData?.nextPage && itemData.data.length) {
            dispatch(setItemApiListParams({page: itemData.nextPage}));
          }
        }}
        keyExtractor={item => item.id}
        renderItem={renderedItem => (
          <RenderBillItem
            renderedItem={renderedItem}
            isSelecting={isSelecting}
            shouldCloseSlide={
              isSelecting || isDeleteItemLoading || isDeleteMultipleItemLoading
            }
            enableSwipe={!isSelecting}
            selected={selectedIds.includes(renderedItem.item.id)}
            onDelete={() => _handleDelete(renderedItem.item.id)}
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
        sheetRef={deleteSheetRef}
        closeSheet={closeDeleteSheet}
        onPressDelete={_handleMultipleDelete}
      />
    </AppScreen>
  );
};

export default Items;
