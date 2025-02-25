import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {FunctionComponent} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDeleteSheet, AppFlashList} from '../../../../../components';
import {showToast} from '../../../../../components/app-toast';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from '../../../../../config/const';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {
  invoiceAdapter,
  invoiceSelector,
  useDeleteMultipleInvoiceApiMutation,
  useGetAllInvoicesApiQuery,
} from '../../../../../state/services/invoice/api';
import {
  apiListParamsState,
  setInvoiceApiListParams,
} from '../../../../../state/slices/api-list-params/apiListParamsSlice';
import {BaseSheetProps} from '../../../../../types/Sheet';
import {getErrorMessage} from '../../../../../utils/helpers';
import InvoiceChartFilterSheet from '../../chart-filter-sheet';
import RenderInvoiceItem from '../../render-invoice-card';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;
const InvoiceSentList: FunctionComponent<{
  onScroll?:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | undefined;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIds: string[];
  isSelecting: boolean;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  filterSheet?: BaseSheetProps;
  muitiDeleteSheet?: BaseSheetProps;
  listRef?: React.RefObject<FlashList<any>>;
}> = ({
  onScroll,
  isSelecting,
  selectedIds,
  setSelectedIds,
  setIsSelecting,
  filterSheet,
  muitiDeleteSheet,
  listRef,
}) => {
  const {invoiceApiListParams} = useSelector(apiListParamsState);
  const navigation = useNavigation<GeneralNavProp>();
  const {
    data: invoiceSentData,
    isFetching: isInvoiceFetching,
    isLoading: isInvoiceLoading,
  } = useGetAllInvoicesApiQuery(invoiceApiListParams.sent, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: invoiceSelector.selectAll(
          data?.data ?? invoiceAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const dispatch = useDispatch();

  const [deleteMultipleInvoice] = useDeleteMultipleInvoiceApiMutation();

  const _handleMultipleDelete = async () => {
    if (selectedIds.length) {
      try {
        const response = await deleteMultipleInvoice({
          arrayOfInvoiceId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Invoice deleted successfully',
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
      if (muitiDeleteSheet?.openSheet) {
        muitiDeleteSheet?.openSheet();
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

  return (
    <>
      <AppFlashList
        listRef={listRef}
        data={invoiceSentData?.data}
        onScroll={onScroll}
        isLoading={isInvoiceLoading}
        emptyListAlert={{
          description:
            'Create your first invoice and start billing your customers.',
          buttonText: 'Create invoice',
          onPress: () => navigation.navigate(routesNames.CREATE_INVOICE),
        }}
        isFetchingMore={isInvoiceFetching}
        contentContainerPaddingTop={CONTAINER_HEIGHT}
        extraData={[isSelecting]}
        onEndReached={() => {
          if (
            !isInvoiceFetching &&
            invoiceSentData?.nextPage &&
            invoiceSentData?.data.length
          ) {
            dispatch(
              setInvoiceApiListParams({
                type: 'sent',
                params: {page: invoiceSentData.nextPage},
              }),
            );
          }
        }}
        keyExtractor={item => item.id}
        renderItem={renderedItem => (
          <RenderInvoiceItem
            renderedItem={renderedItem}
            isSelecting={isSelecting}
            shouldCloseSlide={isSelecting}
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
        sheetRef={muitiDeleteSheet?.sheetRef}
        closeSheet={muitiDeleteSheet?.closeSheet}
        onPressDelete={_handleMultipleDelete}
      />
      <InvoiceChartFilterSheet
        closeSheet={filterSheet?.closeSheet}
        sheetRef={filterSheet?.sheetRef}
        onFilterPress={status =>
          dispatch(
            setInvoiceApiListParams({
              type: 'sent',
              params: {recordStatus: status, page: 1},
            }),
          )
        }
      />
    </>
  );
};

export default InvoiceSentList;
