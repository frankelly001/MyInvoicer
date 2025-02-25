import React, {FunctionComponent, ReactNode, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {
  DeleteIcon,
  MoreIcon,
  NotSelectedIcon,
  SelectedIcon,
} from '../../assets/svg';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import SwipeActionBtns from '../swipe-action-buttons';
import {customerCardStyles} from './styles';
import {ItemCardProps} from './types';
import {COLOR_TYPES} from '../../config/const';
import {getCurrencySymbol} from '../../utils/helpers';

const ItemCard: FunctionComponent<ItemCardProps> = ({
  description,
  name,
  listNum,
  price,
  currency,
  onPress,
  selected,
  isSelecting,
  shouldCloseSlide,
  enableSwipe,
  onLongPress,
  onDeletePress,
  onMorePress,
  removeListNum,
}) => {
  const colors = useColors();

  const swipeRef = useRef<Swipeable>(null);

  useEffect(() => {
    if (shouldCloseSlide) {
      swipeRef.current?.close();
    }
  }, [shouldCloseSlide]);

  const styles = customerCardStyles({colors});

  const actions: {
    name: string;
    Icon: ReactNode;
    onPress?: () => void;
    color1: COLOR_TYPES;
    color2: COLOR_TYPES;
  }[] = [
    {
      name: 'More',
      Icon: <MoreIcon fill={colors.highlight_5} />,
      onPress: onMorePress,
      color1: 'highlight_5',
      color2: 'highlight_1',
    },
    {
      name: 'Delete',
      Icon: <DeleteIcon fill={colors.support_error_3} />,
      onPress: onDeletePress,
      color1: 'support_error_3',
      color2: 'support_error_1',
    },
  ];

  return (
    <Swipeable
      ref={swipeRef}
      enabled={enableSwipe}
      renderRightActions={() => (
        <SwipeActionBtns btnStyle={styles.swipeBtn} actions={actions} />
      )}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.subContainer1}>
          {isSelecting && (
            <View style={styles.selectIcon}>
              {selected ? <SelectedIcon /> : <NotSelectedIcon />}
            </View>
          )}
          {!removeListNum && (
            <AppText
              text={listNum}
              type="body_s"
              color="neutral_dark_5"
              style={styles.listNum}
            />
          )}
          <View style={styles.profile}>
            <AppText text={name} type="heading_h5" color="neutral_dark_5" />
            <AppText
              text={description}
              type="body_s"
              style={styles.email}
              numberOfLines={1}
              color="neutral_dark_2"
            />
          </View>
        </View>
        <AppText
          text={`${getCurrencySymbol(currency)} ${price}`}
          type="heading_h5"
          color="neutral_dark_5"
        />
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ItemCard;
