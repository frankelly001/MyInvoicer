import React, {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  ControllerRenderProps,
} from 'react-hook-form';
import {formFieldControllerStyles} from './styles';
import AppText from '../app-text';
import {ALIGN_TYPES} from '../../config/const';

type FormFieldControllerSingleProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  Field?: (
    controlProps: ControllerRenderProps<FieldValues, string>,
  ) => ReactNode;
  errorTextAlign?: ALIGN_TYPES;
  style?: ViewStyle;
};

type FormFieldControllerDoubleProps<T extends FieldValues> = {
  control: Control<T>;
  names: {name1: FieldPath<T>; name2: FieldPath<T>};
  Fields: (controlProps: {
    field1: ControllerRenderProps<FieldValues, string>;
    field2: ControllerRenderProps<FieldValues, string>;
  }) => ReactNode;
  errorTextAlign?: {error1?: ALIGN_TYPES; error2: ALIGN_TYPES};
  style?: ViewStyle;
};
const styles = formFieldControllerStyles;
const FormFieldController = <T extends FieldValues>({
  control,
  name,
  Field = () => null,
  errorTextAlign = 'left',
  style,
}: FormFieldControllerSingleProps<T>) => {
  const {
    field,
    fieldState: {error},
  } = useController<T, FieldPath<T>>({name, control});
  return (
    <View style={[styles.container, style]}>
      {Field({...field})}

      {error && (
        <AppText
          text={error?.message}
          type={'body_xs'}
          color="support_error_2"
          align={errorTextAlign}
          style={styles.errMsg}
        />
      )}
    </View>
  );
};

const DoubleFormFieldController = <T extends FieldValues>({
  control,
  names,
  Fields,
  errorTextAlign = {error1: 'left', error2: 'right'},
  style,
}: FormFieldControllerDoubleProps<T>) => {
  const {
    field: field1,
    fieldState: {error: error1},
  } = useController<T, FieldPath<T>>({name: names.name1, control});
  const {
    field: field2,
    fieldState: {error: error2},
  } = useController<T, FieldPath<T>>({name: names.name2, control});

  return (
    <View style={[styles.container, style]}>
      {Fields({field1: {...field1}, field2: {...field2}})}
      {(error1 || error2) && (
        <AppText
          text={error1?.message || error2?.message}
          type={'body_xs'}
          color="support_error_2"
          align={error1 ? errorTextAlign.error1 : errorTextAlign.error2}
          style={styles.errMsg}
        />
      )}
    </View>
  );
};
export {FormFieldController, DoubleFormFieldController};
