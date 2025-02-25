/* eslint-disable react/no-unstable-nested-components */
import {zodResolver} from '@hookform/resolvers/zod';
import React, {
  FunctionComponent,
  ReactNode,
  memo,
  useMemo,
  useState,
} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {
  AppBottomSheet,
  AppCustomSelectInput,
  AppTextInput,
  AppTextarea,
} from '../../../../components';
import {FormFieldController} from '../../../../components/form-field-controller';
import {useColors} from '../../../../hooks/useColors';
import {AllInputFields} from '../../../../types/Fields';
import {BaseSheetProps} from '../../../../types/Sheet';
import {formatTime} from '../../../../utils/helpers';

import FormattedTextTimer from './formatted-timer-text';
import {AddTimesheetSchemaType, addTimeSheetSchema} from './shema';
import {timeSheetFormStyles} from './styles';
import SubmitActions from './submit-actions';
import TimerActionControl from './timer-action-control';

const TimesheetFormSheet: FunctionComponent<
  {
    onSubmit: (props: {
      values: AddTimesheetSchemaType;
      reset: () => void;
    }) => void;
    defaultValues?: AddTimesheetSchemaType;
    renderFloatingComponent?: (tille: string) => ReactNode;
  } & BaseSheetProps
> = ({
  closeSheet = () => null,
  sheetRef,
  defaultValues,
  onSubmit,
  renderFloatingComponent = () => null,
}) => {
  const [isTimeSaved, setIsTimeSaved] = useState(false);
  const {control, handleSubmit, reset, setValue, watch} =
    useForm<AddTimesheetSchemaType>({
      defaultValues,
      values: defaultValues,
      resolver: zodResolver(addTimeSheetSchema),
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  const colors = useColors();
  const styles = timeSheetFormStyles({colors});

  const title = watch('title');
  const memoizedFloatingComponent = useMemo(
    () => renderFloatingComponent(title),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title],
  );

  return (
    <>
      {memoizedFloatingComponent}
      <AppBottomSheet
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        withHandle
        removeCancel
        handleStyle={styles.handle}
        adjustToContentHeight
        FooterComponent={
          <View style={styles.footerContanier}>
            {!isTimeSaved && !defaultValues ? (
              <TimerActionControl
                onSubmitTime={elapsedTime => {
                  setValue('time', formatTime(elapsedTime));
                  setIsTimeSaved(true);
                }}
              />
            ) : (
              <SubmitActions
                onDiscard={() => {
                  reset();
                  closeSheet();
                  setIsTimeSaved(false);
                }}
                onSave={handleSubmit(values =>
                  onSubmit({
                    values,
                    reset: () => {
                      reset();
                      closeSheet();
                      setIsTimeSaved(false);
                    },
                  }),
                )}
              />
            )}
          </View>
        }>
        {!isTimeSaved && !defaultValues ? (
          <FormattedTextTimer />
        ) : (
          <FormFieldController
            name={'time'}
            control={control}
            style={styles.timeForm}
            Field={({value, onChange}) => (
              <AppTextInput
                placeholder={'00:20:30'}
                label={'Duration of project'}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        )}
        <View style={[styles.inputFields]}>
          {addItemInputFields.map(item => (
            <FormFieldController
              key={item.name}
              name={item.name}
              control={control}
              style={{...item.style}}
              Field={({value, onChange}) => (
                <>
                  {item.type === 'text_area' ? (
                    <AppTextarea
                      placeholder={item.placeholder}
                      label={item.label}
                      value={value}
                      onChangeText={onChange}
                      keyboardType={item.keyBoardType}
                    />
                  ) : item.type === 'custom_select' ? (
                    <AppCustomSelectInput
                      placeholder={item.placeholder}
                      label={item.label}
                      search
                      value={value}
                      dropdownPosition="top"
                      onChange={selectedItem => onChange(selectedItem.value)}
                      dataType={item.dataType}
                    />
                  ) : item.type === 'text' ? (
                    <AppTextInput
                      placeholder={item.placeholder}
                      label={item.label}
                      value={value}
                      onChangeText={onChange}
                      keyboardType={item.keyBoardType}
                    />
                  ) : null}
                </>
              )}
            />
          ))}
        </View>
      </AppBottomSheet>
    </>
  );
};

export default memo(TimesheetFormSheet);

const addItemInputFields: AllInputFields<AddTimesheetSchemaType> = [
  {
    name: 'title',
    label: 'Title of project',
    placeholder: 'Enter title of project',
    type: 'text',
  },
  {
    name: 'rate',
    label: 'Rate',
    placeholder: 'Project hourly rate',
    type: 'text',
    keyBoardType: 'number-pad',
  },
  {
    name: 'currency',
    label: 'Currency',
    placeholder: 'Select a currency',
    type: 'custom_select',
    dataType: 'currencies',
  },
  {
    name: 'billTo',
    label: 'Bill to',
    placeholder: 'Select a customer',
    type: 'custom_select',
    dataType: 'customers',
  },
  {
    name: 'note',
    label: 'Note',
    placeholder: 'Enter a note to customer',
    type: 'text_area',
  },
];
