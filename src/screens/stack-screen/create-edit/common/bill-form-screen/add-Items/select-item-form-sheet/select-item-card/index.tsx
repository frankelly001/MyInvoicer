import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useColors} from '../../../../../../../../hooks/useColors';
import {AppText} from '../../../../../../../../components';
import {MinusIcon, PlusIcon} from '../../../../../../../../assets/svg';
import {selectItemCardStyles} from './styles';

const SelectItemCard: FunctionComponent<{
  itemName?: string;
  description?: string;
  quantity?: number;
  totalPrice?: string;
  onAddPress?: () => void;
  onSubPress?: () => void;
  onPress?: () => void;
  isSelected?: boolean;
}> = ({
  itemName,
  description,
  quantity,
  totalPrice,
  isSelected = true,
  onAddPress,
  onSubPress,
  onPress,
}) => {
  const colors = useColors();
  const styles = selectItemCardStyles({colors, isSelected});
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.subContainer, styles.details]}>
        <AppText text={itemName} type="action_m" color="neutral_dark_5" />
        <AppText
          text={description}
          numberOfLines={1}
          type="body_s"
          color="neutral_dark_2"
        />
      </View>
      <View style={[styles.subContainer, styles.priceSumContainer]}>
        <View style={styles.itemDetails}>
          <TouchableOpacity style={styles.actionBtn} onPress={onSubPress}>
            <MinusIcon fill={colors.highlight_5} />
          </TouchableOpacity>
          <AppText style={styles.quantity} text={quantity} type="body_m" />
          <TouchableOpacity style={styles.actionBtn} onPress={onAddPress}>
            <PlusIcon fill={colors.highlight_5} />
          </TouchableOpacity>
        </View>
        <AppText
          text={totalPrice}
          type="heading_h4"
          color="neutral_dark_5"
          align="center"
        />
      </View>
    </TouchableOpacity>
  );
};

export default SelectItemCard;
