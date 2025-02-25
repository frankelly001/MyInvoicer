import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {PenIcon} from '../../../../../assets/svg';
import {
  AppBottomSheet,
  AppButton,
  AppText,
  DashedView,
} from '../../../../../components';
import AppListButton from '../../../../../components/app-list-button';
import {useColors} from '../../../../../hooks/useColors';
import {BaseSheetProps} from '../../../../../types/Sheet';
import {itemDetailsSheetStyles} from './styles';
import {getCurrencySymbol} from '../../../../../utils/helpers';

const ItemDetailsSheet: FunctionComponent<
  {
    onEdit?: () => void;
    onDelete?: () => void;
    itemBill: {
      name: string;
      description: string;
      unit: string;
      price: string;
      currency: string;
    };
  } & BaseSheetProps
> = ({
  closeSheet,
  sheetRef,
  itemBill,
  onDelete = () => null,
  onEdit = () => null,
}) => {
  const colors = useColors();
  const details: {
    value: string;
    label: string;
    width: `${number}%`;
  }[] = [
    {
      value: `${getCurrencySymbol(itemBill.currency)}${itemBill.price}`,
      label: 'Price',
      width: '47%',
    },
    {
      value: itemBill.unit,
      label: 'Unit',
      width: '47%',
    },
  ];

  const styles = itemDetailsSheetStyles;

  return (
    <AppBottomSheet
      title={itemBill.name}
      sheetRef={sheetRef}
      closeSheet={closeSheet}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          {details.map(item => (
            <DashedView
              key={item.label}
              value={item.value}
              label={item.label}
              style={{...styles.detail, width: item.width}}
            />
          ))}
        </View>
        <AppListButton
          LeftIcon={<PenIcon stroke={colors.neutral_dark_4} />}
          title={'Description'}
          titleSize="action_l"
          style={styles.descriptionLabel}
          disabled
        />
        <AppText
          text={itemBill.description}
          type="body_m"
          style={styles.descriptionValue}
        />
        <View style={styles.actionBtnContainer}>
          <AppButton
            text="Delete"
            buttonColor="neutral_light_1"
            textColor="support_error_3"
            borderColor="support_error_3"
            borderWidth={1.5}
            style={styles.submitBtn}
            onPress={() => {
              onDelete();
              closeSheet();
            }}
          />
          <AppButton
            text="Edit"
            borderWidth={1.5}
            borderColor="highlight_5"
            style={styles.submitBtn}
            onPress={() => {
              onEdit();
              closeSheet();
            }}
          />
        </View>
      </View>
    </AppBottomSheet>
  );
};

export default ItemDetailsSheet;
