import React, {FunctionComponent, useState} from 'react';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {FilterIcon} from '../../../../assets/svg';
import {
  AppBackButton,
  AppDeleteSheet,
  AppFlashList,
  AppScreen,
} from '../../../../components';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from '../../../../config/const';
import {useColors} from '../../../../hooks/useColors';
import {useSheet} from '../../../../hooks/useSheet';
import {useStickyHeaderAnimation} from '../../../../hooks/useStickyHeaderAnimation';
import {GeneralScreenProps} from '../../../../navigation/types';
import {
  timesheetAdapter,
  timesheetSelector,
  useDeleteMultipleTimeSheetApiMutation,
  useDeleteTimeSheetApiMutation,
  useGetAllTimeSheetsApiQuery,
} from '../../../../state/services/timesheet/api';
import {
  apiListParamsState,
  setTimesheetApiListParams,
} from '../../../../state/slices/api-list-params/apiListParamsSlice';
import {useAppSelector} from '../../../../state/slices/store';
import TimesheetFilter from './filter';
import TimesheetHeader from './header';
import RenderTimesheetItem from './render-timesheet-item';
import {showToast} from '../../../../components/app-toast';
import {getErrorMessage} from '../../../../utils/helpers';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

const TimeSheet: FunctionComponent<GeneralScreenProps<'TIMESHEET'>> = () => {
  const colors = useColors();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {onScroll, translateY} = useStickyHeaderAnimation(CONTAINER_HEIGHT);
  const {timesheetApiListParams} = useAppSelector(apiListParamsState);
  const dispatch = useDispatch();
  const [deleteMultipleTimesheet] = useDeleteMultipleTimeSheetApiMutation();
  const {
    data: timesheeetData,
    isFetching,
    isLoading,
  } = useGetAllTimeSheetsApiQuery(timesheetApiListParams, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: timesheetSelector.selectAll(
          data?.data ?? timesheetAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const [deleteItem] = useDeleteTimeSheetApiMutation();

  const _handleDelete = async (tsId: string) => {
    try {
      const response = await deleteItem({
        timeSheetId: tsId,
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

  const {
    closeSheet: closeFilterSheet,
    openSheet: openFilterSheet,
    sheetRef: filterSheetRef,
  } = useSheet();

  const {
    closeSheet: closeDeleteSheet,
    openSheet: openDeleteSheet,
    sheetRef: deleteSheetRef,
  } = useSheet();

  const _handleMultipleDelete = async () => {
    if (selectedIds.length) {
      try {
        const response = await deleteMultipleTimesheet({
          arrayOfTimeSheetId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Timesheet deleted successfully',
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
    <AppScreen isScrollable={false}>
      <TimesheetHeader
        translateY={translateY}
        leftTitle={isSelecting ? 'Cancel' : ''}
        LeftContent={isSelecting ? undefined : <AppBackButton title="More" />}
        RightContent={
          <Pressable onPress={openFilterSheet}>
            <FilterIcon fill={colors.neutral_dark_4} />
          </Pressable>
        }
        onDelete={_handleDelete}
        onPressLeft={() => {
          if (isSelecting) {
            setSelectedIds([]);
            closeDeleteSheet();
          }
          setIsSelecting(false);
        }}
      />
      <AppFlashList
        data={timesheeetData?.data}
        onScroll={onScroll}
        isLoading={isLoading}
        contentContainerPaddingTop={CONTAINER_HEIGHT}
        keyExtractor={item => item.id}
        extraData={[isSelecting]}
        onEndReached={() => {
          if (
            !isFetching &&
            timesheeetData?.nextPage &&
            timesheeetData?.data?.length
          ) {
            dispatch(
              setTimesheetApiListParams({page: timesheeetData?.nextPage}),
            );
          }
        }}
        renderItem={renderedItem => (
          <RenderTimesheetItem
            renderedItem={renderedItem}
            isSelecting={isSelecting}
            shouldCloseSlide={isSelecting}
            enableSwipe={!isSelecting}
            selected={selectedIds.includes(renderedItem.item.id)}
            onDelete={() => _handleDelete(renderedItem.item.id)}
            onSelect={() => handleSelect(renderedItem.item.id)}
          />
        )}
      />

      <TimesheetFilter
        sheetRef={filterSheetRef}
        closeSheet={closeFilterSheet}
        onSelect={status =>
          dispatch(setTimesheetApiListParams({recordStatus: status}))
        }
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

export default TimeSheet;
