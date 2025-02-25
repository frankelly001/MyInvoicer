import React, {FunctionComponent, memo} from 'react';
import {Portal} from 'react-native-portalize';
import {AppLoading, TimerDraggableFloatingView} from '../../../../components';
import {showToast} from '../../../../components/app-toast';
import {useCreateTimeSheetApiMutation} from '../../../../state/services/timesheet/api';
import {BaseSheetProps} from '../../../../types/Sheet';
import {getErrorMessage} from '../../../../utils/helpers';
import TimesheetFormSheet from '../../common/timesheet-form-sheet';
import {AddTimesheetSchemaType} from '../../common/timesheet-form-sheet/shema';

const AddTimesheetSheet: FunctionComponent<BaseSheetProps> = ({
  closeSheet = () => null,
  sheetRef,
  openSheet,
}) => {
  const [createTimeSheet, {isLoading}] = useCreateTimeSheetApiMutation();

  const submit = async ({
    values,
    reset,
  }: {
    values: AddTimesheetSchemaType;
    reset: () => void;
  }) => {
    try {
      const response = await createTimeSheet({
        createTimesheet: {
          billTo: values.billTo,
          note: values.note,
          time: values.time,
          title: values.title,
          currency: values.currency,
          rate: values.rate,
        },
      }).unwrap();

      reset();
      showToast('SUCCESS', {
        title: 'Timesheet Created successfully',
        message: response.message,
      });
      closeSheet();
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <>
      <AppLoading visible={isLoading} />
      <TimesheetFormSheet
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        onSubmit={submit}
        renderFloatingComponent={title => (
          <Portal>
            <TimerDraggableFloatingView
              openTimerSheet={openSheet}
              title={title}
            />
          </Portal>
        )}
      />
    </>
  );
};

export default memo(AddTimesheetSheet);
