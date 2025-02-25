import {ListRenderItemInfo} from '@shopify/flash-list';
import React, {FunctionComponent, useState} from 'react';
import {AppConfirm, AppLoading, TimesheetCard} from '../../../../../components';
import {showToast} from '../../../../../components/app-toast';
import {useSheet} from '../../../../../hooks/useSheet';
import {useUpdateTimeSheetApiMutation} from '../../../../../state/services/timesheet/api';
import {TimeSheet} from '../../../../../types/TimeSheet';
import {getErrorMessage} from '../../../../../utils/helpers';
import TimesheetFormSheet from '../../../common/timesheet-form-sheet';
import {AddTimesheetSchemaType} from '../../../common/timesheet-form-sheet/shema';
import TimeDetailsSheet from '../details-sheet';

export const RenderTimesheetItem: FunctionComponent<{
  renderedItem: ListRenderItemInfo<TimeSheet>;
  isSelecting?: boolean;
  shouldCloseSlide?: boolean;
  selected?: boolean;
  enableSwipe?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}> = ({
  isSelecting,
  shouldCloseSlide,
  renderedItem,
  selected,
  enableSwipe,
  onSelect = () => null,
  onDelete = () => null,
}) => {
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

  const [showAlert, setShowAlert] = useState(false);
  const {item} = renderedItem;
  const [updateTimesheet, {isLoading}] = useUpdateTimeSheetApiMutation();

  const submit = async ({
    values,
    reset,
  }: {
    values: AddTimesheetSchemaType;
    reset: () => void;
  }) => {
    try {
      const response = await updateTimesheet({
        updateTimeSheet: {
          timesheetId: item.id,
          billTo: values.billTo,
          note: values.note,
          time: values.time,
          title: values.title,
          currency: values.currency,
          rate: values.rate,
        },
      }).unwrap();
      console.log('response...', response.data);
      reset();
      showToast('SUCCESS', {
        title: 'Timesheet Created successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('SUCCESS', {
        message: 'Timesheet Created successfully',
        title: getErrorMessage(error),
      });
    }
  };

  return (
    <>
      <AppLoading visible={isLoading} />
      <TimesheetCard
        createdAt={item.createdAt}
        name={item.title}
        duration={item.time}
        status={item.timesheetStatus}
        isSelecting={isSelecting}
        shouldCloseSlide={shouldCloseSlide || isLoading}
        selected={selected}
        enableSwipe={enableSwipe}
        onLongPress={onSelect}
        onMorePress={() => {
          openEditSheet();
        }}
        onPress={() => {
          if (!isSelecting) {
            openDetailsSheet();
          } else {
            onSelect();
          }
        }}
        onDeletePress={() => setShowAlert(true)}
      />

      <TimesheetFormSheet
        closeSheet={closeEditSheet}
        sheetRef={editSheetRef}
        defaultValues={{
          billTo: item?.billTo?.id,
          note: item?.note,
          time: item?.time,
          title: item?.title,
          currency: item?.currency,
          rate: item?.rate,
        }}
        onSubmit={submit}
      />
      <TimeDetailsSheet
        sheetRef={detailsSheetRef}
        closeSheet={closeDetailsSheet}
        data={item}
        onPressEdit={() => {
          openEditSheet();
          closeDetailsSheet();
        }}
      />
      <AppConfirm
        title="Delete Item"
        description={
          'You’re about to delete this timesheet, would you like to proceed'
        }
        visible={showAlert}
        yesTitle={'Yes, Delete'}
        onNoPress={() => setShowAlert(false)}
        onYesPress={() => {
          onDelete();
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

export default RenderTimesheetItem;
