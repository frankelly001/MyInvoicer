import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDeleteSheet, AppFlashList} from '../../../../../../components';
import {showToast} from '../../../../../../components/app-toast';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from '../../../../../../config/const';
import {routesNames} from '../../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../../navigation/types';
import {
  estimateAdapter,
  estimateSelector,
  useDeleteMultipleEstimateApiMutation,
  useGetAllEstimatesApiQuery,
} from '../../../../../../state/services/estimate/api';
import {
  apiListParamsState,
  setEstimateApiListParams,
} from '../../../../../../state/slices/api-list-params/apiListParamsSlice';
import {BaseSheetProps} from '../../../../../../types/Sheet';
import {getErrorMessage} from '../../../../../../utils/helpers';
import EstimateChartFilterSheet from './../../chart-filter-sheet';
import RenderEstimateItem from './../../render-estimate-item';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

const EstimateSentList: FunctionComponent<{
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
  const {estimateApiListParams} = useSelector(apiListParamsState);
  const navigation = useNavigation<GeneralNavProp>();
  const {
    data: estimateData,
    isFetching: isEstimateFetching,
    isLoading: isEstimateLoading,
  } = useGetAllEstimatesApiQuery(estimateApiListParams.sent, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: estimateSelector.selectAll(
          data?.data ?? estimateAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const [deleteMultipleEstimate, {isLoading: isDeleteMultipleInvoiceLoading}] =
    useDeleteMultipleEstimateApiMutation();

  const dispatch = useDispatch();

  const _handleMultipleDelete = async () => {
    if (selectedIds.length) {
      try {
        const response = await deleteMultipleEstimate({
          arrayOfEstimateId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Estimate deleted successfully',
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
    isEstimateFetching || isEstimateLoading || isDeleteMultipleInvoiceLoading;

  return (
    <>
      <AppFlashList
        data={estimateData?.data}
        onScroll={onScroll}
        isFetchingMore={isEstimateFetching}
        contentContainerPaddingTop={CONTAINER_HEIGHT}
        isLoading={isEstimateLoading}
        extraData={[isSelecting]}
        emptyListAlert={{
          description:
            'Create your first estimate and start billing your customers. ',
          buttonText: 'Create estimate',
          onPress: () => navigation.navigate(routesNames.CREATE_ESTIMATE),
        }}
        onEndReached={() => {
          if (
            !isEstimateLoading &&
            estimateData?.nextPage &&
            estimateData?.data.length
          ) {
            dispatch(
              setEstimateApiListParams({
                type: 'sent',
                params: {page: estimateData.nextPage},
              }),
            );
          }
        }}
        keyExtractor={item => item.id}
        renderItem={renderedItem => (
          <RenderEstimateItem
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
      <EstimateChartFilterSheet
        closeSheet={filterSheet.closeSheet}
        sheetRef={filterSheet.sheetRef}
        onFilterPress={status =>
          dispatch(
            setEstimateApiListParams({
              type: 'sent',
              params: {recordStatus: status},
            }),
          )
        }
      />
    </>
  );
};

export default EstimateSentList;
