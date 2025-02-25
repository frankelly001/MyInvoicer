/* eslint-disable react/no-unstable-nested-components */
import {zodResolver} from '@hookform/resolvers/zod';
import React, {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {
  AppBottomSheet,
  AppButton,
  AppCustomSelectInput,
  AppTextInput,
  AppTextarea,
} from '../../../../components';
import {FormFieldController} from '../../../../components/form-field-controller';
import {AllInputFields} from '../../../../types/Fields';
import {BaseSheetProps} from '../../../../types/Sheet';

import {AddItemSchemaType, addItemSchema} from './shema';
import {itemFormSheetStyles} from './styles';

const addItemInputFields: AllInputFields<AddItemSchemaType> = [
  {
    name: 'productName',
    label: 'Product name',
    placeholder: 'Enter product name',
    type: 'text',
  },
  {
    name: 'description',
    label: 'Product description',
    placeholder: 'Enter product description',
    type: 'text_area',
  },
  {
    name: 'currency',
    label: 'Currency',
    placeholder: 'Nigerian Naira - N',
    type: 'custom_select',
    dataType: 'currencies',
    search: true,
  },
  {
    name: 'price',
    label: 'Price',
    placeholder: '$300',
    style: {width: '47%'},
    keyBoardType: 'numeric',
    type: 'text',
  },
  {
    name: 'unit',
    label: 'Unit',
    placeholder: 'Enter unit',
    style: {width: '47%'},
    type: 'text',
  },
];

const ItemFormSheet: FunctionComponent<
  {
    onSubmit: (props: {values: AddItemSchemaType; reset: () => void}) => void;
    defaultValues?: AddItemSchemaType;
  } & BaseSheetProps
> = ({closeSheet = () => null, sheetRef, defaultValues, onSubmit}) => {
  const {control, handleSubmit, reset} = useForm<AddItemSchemaType>({
    defaultValues,
    resolver: zodResolver(addItemSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const styles = itemFormSheetStyles;
  return (
    <AppBottomSheet
      title="Add new item"
      sheetRef={sheetRef}
      onClose={reset}
      onOpen={reset}
      closeSheet={closeSheet}>
      <View style={[styles.inputFields, styles.mt24]}>
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
                  />
                ) : item.type === 'custom_select' ? (
                  <AppCustomSelectInput
                    placeholder={item.placeholder}
                    label={item.label}
                    dropdownPosition="top"
                    onChange={selectedItem => onChange(selectedItem.value)}
                    search={item.search}
                    dataType={item.dataType}
                    value={value}
                  />
                ) : item.type === 'text' ? (
                  <AppTextInput
                    placeholder={item.placeholder}
                    label={item.label}
                    value={value}
                    onChangeText={onChange}
                  />
                ) : null}
              </>
            )}
          />
        ))}
        <AppButton
          text="Save"
          borderWidth={1.5}
          borderColor="highlight_5"
          style={styles.addItemSubmit}
          onPress={handleSubmit(values =>
            onSubmit({
              values,
              reset: () => {
                reset();
                closeSheet();
              },
            }),
          )}
        />
      </View>
    </AppBottomSheet>
  );
};

export default ItemFormSheet;
