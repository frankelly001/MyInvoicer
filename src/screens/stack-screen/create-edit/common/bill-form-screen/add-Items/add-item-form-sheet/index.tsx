/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */

import {zodResolver} from '@hookform/resolvers/zod';
import {FunctionComponent, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {
  AppBottomSheet,
  AppBtnInput,
  AppButton,
  AppLoading,
  AppTextInput,
  AppTextarea,
} from '../../../../../../../components';
import {showToast} from '../../../../../../../components/app-toast';
import {FormFieldController} from '../../../../../../../components/form-field-controller';
import {useColors} from '../../../../../../../hooks/useColors';
import {useCreateItemApiMutation} from '../../../../../../../state/services/item/api';
import {AllInputFields} from '../../../../../../../types/Fields';
import {BaseSheetProps} from '../../../../../../../types/Sheet';
import {getErrorMessage} from '../../../../../../../utils/helpers';
import {createInvoicestyles} from '../../styles';
import {AddBillItemSchemaType, addBillItemSchema} from './schema';

const addItemInputFields: AllInputFields<AddBillItemSchemaType> = [
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
    name: 'quantity',
    label: 'Quantity',
    placeholder: '5',
    style: {width: '47%'},
    keyBoardType: 'numeric',
    type: 'text',
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
  {
    name: 'total',
    label: 'Total',
    placeholder: '0.00',
    type: 'button',
    style: {width: '47%'},
  },
];

const AddItemFormSheet: FunctionComponent<
  {
    onSubmit: (values: AddBillItemSchemaType) => void;
    currency: string;
  } & BaseSheetProps
> = ({closeSheet = () => null, sheetRef, onSubmit, currency}) => {
  const colors = useColors();

  const {control, handleSubmit, reset, watch, setValue} =
    useForm<AddBillItemSchemaType>({
      resolver: zodResolver(addBillItemSchema),
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  const price = watch('price');
  const quantity = watch('quantity');

  useEffect(() => {
    setValue('total', `${Number(+price * +quantity) || 0}`);
  }, [price, quantity]);

  const [createItem, {isLoading}] = useCreateItemApiMutation();

  const submit = async (values: AddBillItemSchemaType) => {
    try {
      const response = await createItem({
        createItem: {
          currency,
          name: values.productName,
          description: values.description,
          price: values.price,
          unit: values.unit,
        },
      }).unwrap();

      onSubmit(values);
      closeSheet();
      reset();
      showToast('SUCCESS', {
        title: 'Item Created successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('SUCCESS', {
        message: 'Item Created successfully',
        title: getErrorMessage(error),
      });
    }
  };

  const styles = createInvoicestyles({colors});
  return (
    <AppBottomSheet
      title="Add new item"
      sheetRef={sheetRef}
      onOpen={reset}
      closeSheet={closeSheet}>
      <View style={[styles.inputFields, styles.mt24]}>
        <AppLoading visible={isLoading} />
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
                ) : item.type === 'button' ? (
                  <AppBtnInput
                    placeholder={item.placeholder}
                    label={item.label}
                    value={value}
                    textColor="neutral_dark_1"
                    buttonColor={'neutral_light_3'}
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
          text="Add new"
          borderWidth={1.5}
          borderColor="highlight_5"
          style={styles.addItemSubmit}
          onPress={handleSubmit(submit)}
        />
      </View>
    </AppBottomSheet>
  );
};

export default AddItemFormSheet;
