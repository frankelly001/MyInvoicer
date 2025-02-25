import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {Path, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {ZodType} from 'zod';
import {AppBottomSheet, AppButton, AppTextarea} from '../../../../components';
import {FormFieldController} from '../../../../components/form-field-controller';
import {COLOR_TYPES} from '../../../../config/const';
import {useColors} from '../../../../hooks/useColors';
import {AllInputFields} from '../../../../types/Fields';
import {FormValidationShemaType} from '../../../../types/Form';
import {BaseSheetProps} from '../../../../types/Sheet';
import {settingsSheetStyles} from '../styles';

type SettingsSheetProps<T extends ZodType<any, any, any>> = {
  validationShema: T;
  defaultValues?: FormValidationShemaType<T>;
  inputFields: AllInputFields<FormValidationShemaType<T>>;
  onSubmit: (props: {
    values: FormValidationShemaType<T>;
    reset: () => void;
  }) => void;
  title: string;
  submitButtonColor?: COLOR_TYPES;
  submitButtonText?: string;
} & BaseSheetProps;

const SettingsSheet = <T extends ZodType<any, any, any>>({
  closeSheet,
  sheetRef,
  inputFields,
  title,
  submitButtonColor,
  submitButtonText = 'save',
  onSubmit,
  validationShema,
  defaultValues,
}: SettingsSheetProps<T>) => {
  const colors = useColors();
  const styles = settingsSheetStyles({colors});
  const {control, handleSubmit, reset, setValue} = useForm<T>({
    resolver: zodResolver(validationShema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  return (
    <AppBottomSheet
      onOpen={() => {
        Object.keys(defaultValues ?? {}).forEach(el =>
          setValue(el as Path<T>, defaultValues?.[el]),
        );
      }}
      title={title}
      sheetRef={sheetRef}
      closeSheet={closeSheet}>
      <View style={[styles.inputFields]}>
        {inputFields.map(item => (
          <FormFieldController
            control={control}
            name={item.name as Path<T>}
            key={item.name as Path<T>}
            style={{...styles.mb16, ...item.style}}
            // eslint-disable-next-line react/no-unstable-nested-components
            Field={({value, onChange}) => (
              <AppTextarea
                placeholder={item.placeholder}
                label={item.label}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        ))}

        <AppButton
          text={submitButtonText}
          buttonColor={submitButtonColor}
          borderWidth={1.5}
          style={styles.submit}
          onPress={handleSubmit(values => onSubmit({values, reset}))}
        />
      </View>
    </AppBottomSheet>
  );
};
export default SettingsSheet;
