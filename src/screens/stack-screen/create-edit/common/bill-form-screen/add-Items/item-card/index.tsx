import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import AppText from '../../../../../../../components/app-text';
import {DeleteIcon} from '../../../../../../../assets/svg';
import {createInvoicestyles} from '../../styles';
import {useColors} from '../../../../../../../hooks/useColors';
import {detectTouch} from '../../../../../../../config/const';

const ItemCard: FunctionComponent<{
  name?: string;
  quatity?: string;
  price?: string;
  total?: string;
  currency?: string;
  onPressDelete?: () => void;
}> = ({name, price, quatity, total, currency, onPressDelete}) => {
  const colors = useColors();
  const styles = createInvoicestyles({colors});
  return (
    <View style={[styles.fieldContainer, styles.addedItemContainer]}>
      <View style={styles.addedItemDetails}>
        <AppText
          text={name}
          type="action_m"
          color="neutral_dark_5"
          style={styles.mb16}
        />
        <AppText
          text={`Quantity: ${quatity}`}
          type="body_s"
          color="neutral_dark_2"
        />
      </View>
      <View style={styles.addedItemPrice}>
        <AppText
          text={`Price: ${price}`}
          type="action_m"
          color="neutral_dark_2"
          style={styles.mb16}
        />
        <AppText
          text={`${currency} ${total}`}
          type="heading_h4"
          color="neutral_dark_5"
        />
      </View>

      <TouchableOpacity
        hitSlop={detectTouch}
        style={styles.deleteBtn}
        onPress={onPressDelete}>
        <DeleteIcon fill={colors.support_error_3} />
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;
