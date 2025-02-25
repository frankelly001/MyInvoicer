/* eslint-disable react/react-in-jsx-scope */
import {FunctionComponent, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {CalenderIcon, ClockIcon} from '../../assets/svg';
import {
  convertToReadableDate,
  convertToReadableTime,
} from '../../utils/helpers/convertDate';
import AppBtnInput from '../app-btn-input';
import {AppDatePickerProps} from './type';

const AppDateTimePicker: FunctionComponent<AppDatePickerProps> = ({
  onChange = () => null,
  value,
  mode = 'date',
  minimumDate,
  maximumDate,
  ...btnInputProps
}) => {
  const [open, setOpen] = useState(false);

  const convert =
    mode === 'time' ? convertToReadableTime : convertToReadableDate;

  return (
    <>
      <AppBtnInput
        isFocused={open}
        RightContent={mode === 'time' ? <ClockIcon /> : <CalenderIcon />}
        value={value ? convert(value) : ''}
        onPress={() => setOpen(true)}
        {...btnInputProps}
      />

      <DatePicker
        mode={mode}
        modal
        open={open}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        date={value ? value : new Date()}
        onConfirm={newDate => {
          setOpen(false);
          onChange(newDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default AppDateTimePicker;
