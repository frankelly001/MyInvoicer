/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  AppButton,
  AppSelectInput,
  AppText,
  AppTextInput,
  AppTextarea,
} from '../../../../../../components';
import {Control, FieldPath, FieldValues} from 'react-hook-form';
import {useColors} from '../../../../../../hooks/useColors';
import {createInvoicestyles} from '../styles';
import {AllInputFields} from '../../../../../../types/Fields';
import {FormFieldController} from '../../../../../../components/form-field-controller';
import {BillType} from '../../../../../../types/Billing';

type OtherInfoFormProps<T extends FieldValues> = {
  control: Control<T>;
  fields: AllInputFields<{[key in FieldPath<T>]: any}>;
  billType: BillType;
};

const OtherInfoForm = <T extends FieldValues>({
  fields = [],
  billType,
  control,
}: OtherInfoFormProps<T>) => {
  const colors = useColors();
  const styles = createInvoicestyles({colors});
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <AppText
            text={`Enter other ${billType} info`}
            type="heading_h3"
            color="neutral_dark_5"
            style={styles.mb16}
          />

          <View style={styles.inputFields}>
            {fields.map(item => (
              <FormFieldController
                key={item.name}
                name={item.name}
                control={control}
                style={{...item.style}}
                Field={({value, onChange}) => (
                  <>
                    {item.type === 'select' ? (
                      <AppSelectInput
                        placeholder={item.placeholder}
                        label={item.label}
                        data={item?.data}
                        value={value}
                        onChange={selectedItem => onChange(selectedItem.value)}
                      />
                    ) : item.type === 'text_area' ? (
                      <AppTextarea
                        placeholder={item.placeholder}
                        label={item.label}
                        value={value}
                        onChangeText={onChange}
                      />
                    ) : (
                      <AppTextInput
                        placeholder={item.placeholder}
                        label={item.label}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  </>
                )}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitBtns}>
        <AppButton
          text="Next"
          borderWidth={1.5}
          borderColor="highlight_5"
          style={styles.btn}
        />
      </View>
    </>
  );
};

export default OtherInfoForm;
