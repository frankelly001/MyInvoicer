import React, {FunctionComponent, ReactNode, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {DeleteIcon, NotSelectedIcon, SelectedIcon} from '../../assets/svg';
import {COLOR_TYPES} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import SwipeActionBtns from '../swipe-action-buttons';
import {notificationCardStyles} from './styles';
import {NotificationCardProps} from './types';

const NotificationCard: FunctionComponent<NotificationCardProps> = ({
  subTitle,
  title,
  duration,
  selected,
  isSelecting,
  enableSwipe,
  isRead,
  onPress,
  onLongPress,
  onDeletePress,
  shouldCloseSlide,
}) => {
  const colors = useColors();
  const swipeRef = useRef<Swipeable>(null);

  useEffect(() => {
    if (shouldCloseSlide) {
      swipeRef.current?.close();
    }
  }, [shouldCloseSlide]);

  const styles = notificationCardStyles({colors});

  const actions: {
    name: string;
    Icon: ReactNode;
    onPress?: () => void;
    color1: COLOR_TYPES;
    color2: COLOR_TYPES;
  }[] = [
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

          {!isRead && <View style={styles.isUnRead} />}
          <View style={styles.profile}>
            <AppText text={title} type="heading_h5" color="neutral_dark_5" />
            <AppText
              text={subTitle}
              type="body_s"
              style={styles.email}
              numberOfLines={1}
              color="neutral_dark_2"
            />
          </View>
        </View>
        <AppText text={duration} type="body_xs" color="neutral_dark_1" />
      </TouchableOpacity>
    </Swipeable>
  );
};

export default NotificationCard;
