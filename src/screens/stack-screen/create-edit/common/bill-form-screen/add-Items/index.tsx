/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {AppBottomSheet, AppButton, AppText} from '../../../../../../components';
import {AddFilledIcon, TextMsgIcon} from '../../../../../../assets/svg';
import {Control, useFieldArray, useWatch} from 'react-hook-form';
import {detectTouch} from '../../../../../../config/const';
import {createInvoicestyles} from '../styles';
import {useColors} from '../../../../../../hooks/useColors';
import {useSheet} from '../../../../../../hooks/useSheet';
import AddItemFormSheet from './add-item-form-sheet';
import ItemCard from './item-card';
import {FormFieldController} from '../../../../../../components/form-field-controller';
import SelectItemFormSheet from './select-item-form-sheet';
import TotalSummary from './common/total-summary';
import {GeneralBillFormSchemaType} from '../schema';
import {BillType} from '../../../../../../types/Billing';
import {showToast} from '../../../../../../components/app-toast';
import {getCurrencySymbol} from '../../../../../../utils/helpers';

type AddItemsFormProps = {
  control: Control<GeneralBillFormSchemaType>;
  billType: BillType;
};

const AddItemsForm = ({billType, control}: AddItemsFormProps) => {
  const colors = useColors();
  const styles = createInvoicestyles({colors});
  const {
    sheetRef: addItemSheetRef,
    openSheet: openAddItemSheet,
    closeSheet: closeAddItemSheet,
  } = useSheet();
  const {
    sheetRef: addItemTypeSheetRef,
    openSheet: openAddItemTypeSheet,
    closeSheet: closeAddItemTypeSheet,
  } = useSheet();
  const {
    sheetRef: addMultipleItemSheetRef,
    openSheet: openAddMultipleItemSheet,
    closeSheet: closeAddMultipleItemSheet,
  } = useSheet();
  const {fields, insert, remove} = useFieldArray({
    control,
    name: 'items',
  });

  const currency: string = useWatch({control, name: 'currency' as any});

  const total = fields.reduce((sum, item) => Number(item.total ?? 0) + sum, 0);

  const currencyAlert = () =>
    showToast('ERROR', {
      title: 'Currency is required',
      message: 'Please select a curreny',
    });

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.sectionContainer, styles.pv0]}>
          <FormFieldController
            name={'items'}
            errorTextAlign="center"
            control={control}
            Field={() => (
              <View style={styles.addItemHeader}>
                <AppText
                  text={`Add ${billType} items`}
                  type="heading_h3"
                  color="neutral_dark_5"
                />
                <Pressable
                  hitSlop={detectTouch}
                  onPress={currency ? openAddItemTypeSheet : currencyAlert}>
                  <AddFilledIcon />
                </Pressable>
              </View>
            )}
          />
          <View>
            {fields.map((item, index) => (
              <ItemCard
                name={item.productName}
                price={item.price}
                quatity={item.quantity}
                total={item.total}
                key={item.id}
                currency={getCurrencySymbol(currency)}
                onPressDelete={() => remove(index)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={[styles.footer, styles.delAddContainer]}>
        <TotalSummary total={`${getCurrencySymbol(currency) || ''} ${total}`} />
        <View style={styles.submitBtns}>
          <AppButton
            text="Clear all"
            buttonColor="neutral_light_1"
            textColor="support_error_3"
            borderColor="support_error_3"
            borderWidth={1.5}
            style={styles.btn}
            onPress={() =>
              remove(Array.from({length: fields.length}, (_, index) => index))
            }
          />
          <AppButton
            text="Add new"
            borderWidth={1.5}
            borderColor="highlight_5"
            onPress={currency ? openAddItemSheet : currencyAlert}
            style={styles.btn}
          />
        </View>
      </View>

      <AppBottomSheet
        title="Add item"
        sheetRef={addItemTypeSheetRef}
        closeSheet={closeAddItemTypeSheet}
        optionsBtns={[
          {
            name: 'Select items',
            Icon: <TextMsgIcon stroke={colors.neutral_dark_5} />,
            onPress: () => {
              openAddMultipleItemSheet();
              closeAddItemTypeSheet();
            },
          },
          {
            name: 'Add new item',
            Icon: <TextMsgIcon stroke={colors.neutral_dark_5} />,
            onPress: () => {
              openAddItemSheet();
              closeAddItemTypeSheet();
            },
          },
        ]}
      />
      <AddItemFormSheet
        sheetRef={addItemSheetRef}
        closeSheet={closeAddItemSheet}
        onSubmit={data => insert(0, data)}
        currency={currency}
      />
      <SelectItemFormSheet
        onSubmit={items => items.forEach(el => insert(0, el))}
        closeSheet={closeAddMultipleItemSheet}
        sheetRef={addMultipleItemSheetRef}
        currency={currency}
      />
    </View>
  );
};

export default AddItemsForm;
