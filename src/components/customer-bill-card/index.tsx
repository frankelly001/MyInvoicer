import React, {FunctionComponent, ReactNode, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {
  DeleteIcon,
  MoreIcon,
  NotSelectedIcon,
  SelectedIcon,
} from '../../assets/svg';
import {statusStyles} from '../../utils/constants/status';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import SwipeActionBtns from '../swipe-action-buttons';
import {customerBillCardStyles} from './styles';
import {CustomerBillCardProps} from './types';
import {COLOR_TYPES} from '../../config/const';
import {convertToReadableDate} from '../../utils/helpers';

const CustomerBillCard: FunctionComponent<CustomerBillCardProps> = ({
  date,
  billNumber,
  price,
  status = 'paid',
  onPress,
  selected,
  isSelecting,
  enableSwipe,
  onDeletePress,
  onMorePress,
}) => {
  const colors = useColors();

  const swipeRef = useRef<Swipeable>(null);

  useEffect(() => {
    if (isSelecting) {
      swipeRef.current?.close();
    }
  }, [isSelecting]);

  const styles = customerBillCardStyles({colors});

  const actions: {
    name: string;
    Icon: ReactNode;
    onPress?: () => void;
    color1: COLOR_TYPES;
    color2: COLOR_TYPES;
  }[] = [
    {
      name: 'Remind',
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
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.subContainer1}>
          {isSelecting && (
            <View style={styles.selectIcon}>
              {selected ? <SelectedIcon /> : <NotSelectedIcon />}
            </View>
          )}

          <View style={styles.profile}>
            <AppText
              text={billNumber}
              type="heading_h5"
              color="neutral_dark_5"
            />
            <AppText
              text={convertToReadableDate(date)}
              type="body_xs"
              style={styles.email}
              color="neutral_dark_2"
            />
          </View>
        </View>
        <View style={styles.h100p}>
          <View style={styles.subContainer2Content}>
            <View
              style={{
                ...styles.status,
                backgroundColor: colors[statusStyles[status].color1],
              }}>
              <AppText
                text={status}
                type="caption_m"
                color={statusStyles[status].color2}
                textTransform="uppercase"
              />
            </View>
            <AppText text={price} type="heading_h5" color="neutral_dark_5" />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default CustomerBillCard;
