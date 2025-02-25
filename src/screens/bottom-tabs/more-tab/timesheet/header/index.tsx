import React, {FunctionComponent, ReactNode, useState} from 'react';
import {Animated} from 'react-native';
import {
  AnimatedTabHeader,
  AppConfirm,
  AppLoading,
  AppText,
  TimesheetCard,
} from '../../../../../components';
import AnimatedHeaderContent from '../../../../../components/animated-header/animated-header-content';
import {showToast} from '../../../../../components/app-toast';
import {useSheet} from '../../../../../hooks/useSheet';
import {
  useSearchTimeSheetApiQuery,
  useUpdateTimeSheetApiMutation,
} from '../../../../../state/services/timesheet/api';
import {TimeSheet} from '../../../../../types/TimeSheet';
import {EMPTY_STRING} from '../../../../../utils/constants/fieldDefaultValues';
import {getErrorMessage} from '../../../../../utils/helpers';
import TimesheetFormSheet from '../../../common/timesheet-form-sheet';
import {AddTimesheetSchemaType} from '../../../common/timesheet-form-sheet/shema';
import TimeDetailsSheet from '../details-sheet';

const TimesheetHeader: FunctionComponent<{
  onPressLeft: () => void;
  leftTitle: string;
  LeftContent: ReactNode;
  RightContent: ReactNode;
  translateY: Animated.AnimatedInterpolation<string | number> | undefined;
  onDelete?: (id: string) => void;
}> = ({
  onPressLeft,
  leftTitle,
  translateY,
  LeftContent,
  RightContent,
  onDelete = () => null,
}) => {
  const [searchText, setSearchText] = useState('');
  const {currentData = [], isFetching: isSearching} =
    useSearchTimeSheetApiQuery(
      {
        searchTerm: searchText,
      },
      {skip: searchText.length < 1},
    );

  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TimeSheet | null>(null);
  const [updateTimesheet, {isLoading}] = useUpdateTimeSheetApiMutation();

  const {
    closeSheet: closeEditSheet,
    openSheet: openEditSheet,
    sheetRef: editSheetRef,
  } = useSheet();
  const {
    closeSheet: closeDetailsSheet,
    openSheet: openDetailsSheet,
    sheetRef: detailsSheetRef,
  } = useSheet();

  const submit = async ({
    values,
    reset,
  }: {
    values: AddTimesheetSchemaType;
    reset: () => void;
  }) => {
    if (selectedItem) {
      try {
        const response = await updateTimesheet({
          updateTimeSheet: {
            timesheetId: selectedItem?.id,
            billTo: values.billTo,
            note: values.note,
            time: values.time,
            title: values.title,
          },
        }).unwrap();
        reset();
        showToast('SUCCESS', {
          title: 'Timesheet Created successfully',
          message: response.message,
        });
        setSelectedItem(null);
      } catch (error) {
        showToast('SUCCESS', {
          message: 'Timesheet Created successfully',
          title: getErrorMessage(error),
        });
      }
    }
  };

  return (
    <>
      <AppLoading visible={isLoading} />
      <AnimatedTabHeader
        translateY={translateY}
        screenTitle={'Timesheet'}
        leftTitle={leftTitle}
        LeftContent={LeftContent}
        onPressLeft={onPressLeft}
        screenRightContent={RightContent}
        RightContent={
          <AnimatedHeaderContent translateY={translateY} alignItems="flex-end">
            {RightContent}
          </AnimatedHeaderContent>
        }
        MiddleContent={
          <AnimatedHeaderContent translateY={translateY}>
            <AppText
              color={'neutral_dark_5'}
              text={'Timesheet'}
              align="center"
              textTransform="capitalize"
              type={'heading_h4'}
            />
          </AnimatedHeaderContent>
        }
        search={{
          isSearching,
          searchText,
          onChangeSearchText: setSearchText,
          searchResultData: currentData,
          searchResultKeyExtractor: item => item.id,
          // renderSearchResultItem: renderedItem => (
          //   <RenderTimesheetItem
          //     renderedItem={renderedItem}
          //     enableSwipe={false}
          //     onDelete={() => onDelete(renderedItem.item.id)}
          //   />
          // ),
          renderSearchResultItem: ({item}, onSearchToggle) => (
            <TimesheetCard
              createdAt={item.createdAt}
              name={item.title}
              duration={item.time}
              status={item.timesheetStatus}
              enableSwipe={false}
              onPress={() => {
                setSelectedItem(item);
                openDetailsSheet();
                onSearchToggle(false);
                setSearchText('');
              }}
            />
          ),
        }}
      />
      <TimesheetFormSheet
        closeSheet={closeEditSheet}
        sheetRef={editSheetRef}
        defaultValues={{
          billTo: selectedItem?.billTo?.id ?? EMPTY_STRING,
          note: selectedItem?.note ?? EMPTY_STRING,
          time: selectedItem?.time ?? EMPTY_STRING,
          title: selectedItem?.title ?? EMPTY_STRING,
          currency: selectedItem?.currency ?? EMPTY_STRING,
          rate: selectedItem?.rate ?? EMPTY_STRING,
        }}
        onSubmit={submit}
      />
      <TimeDetailsSheet
        sheetRef={detailsSheetRef}
        closeSheet={closeDetailsSheet}
        data={selectedItem as TimeSheet}
        onPressEdit={openEditSheet}
      />
      <AppConfirm
        title="Delete Item"
        description={
          'You’re about to delete this Item, would you like to proceed'
        }
        visible={showAlert}
        yesTitle={'Yes, Delete'}
        onNoPress={() => setShowAlert(false)}
        onYesPress={() => {
          onDelete(selectedItem?.id ?? '');
          setShowAlert(false);
        }}
        yesBtnProps={{
          buttonColor: 'support_error_3',
          borderColor: 'support_error_3',
        }}
      />
    </>
  );
};

export default TimesheetHeader;
