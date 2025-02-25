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
import {CustomerCardProps} from './types';
import {COLOR_TYPES} from '../../config/const';

const CustomerCard: FunctionComponent<CustomerCardProps> = ({
  email = 'alex.della@outlook.com',
  fullname = 'Alexandra Della',
  listNum = 1,
  phone = '+234 847439203',
  onPress,
  selected,
  isSelecting,
  enableSwipe,
  shouldCloseSlide,
  onLongPress,
  onDeletePress,
  onMorePress,
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
        onLongPress={onLongPress}
        style={styles.container}
        onPress={onPress}>
        <View style={styles.subContainer1}>
          {isSelecting && (
            <View style={styles.selectIcon}>
              {selected ? <SelectedIcon /> : <NotSelectedIcon />}
            </View>
          )}
          <AppText text={listNum} type="body_s" color="neutral_dark_5" />
          <View style={styles.profile}>
            <AppText text={fullname} type="heading_h5" color="neutral_dark_5" />
            <AppText
              text={email}
              type="body_s"
              style={styles.email}
              color="neutral_dark_2"
            />
          </View>
        </View>
        <AppText text={phone} type="body_xs" color="neutral_dark_2" />
      </TouchableOpacity>
    </Swipeable>
  );
};

export default CustomerCard;
