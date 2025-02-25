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
import {invoiceCardStyles} from './styles';
import {BillCardProps} from './type';
import {COLOR_TYPES} from '../../config/const';
import {getCurrencySymbol} from '../../utils/helpers';

const BillCard: FunctionComponent<BillCardProps> = ({
  dateTime = '2023-04-25, 03:42 PM',
  fullname = 'Alexandra Della',
  invoiceId = '#321456',
  onPress,
  price,
  currency,
  status = 'accepted',
  enableSwipe,
  isSelecting,
  selected,
  onLongPress,
  shouldCloseSlide,
  onDeletePress,
  onMorePress,
}) => {
  const colors = useColors();
  const styles = invoiceCardStyles({colors});
  const swipeRef = useRef<Swipeable>(null);

  useEffect(() => {
    if (shouldCloseSlide) {
      swipeRef.current?.close();
    }
  }, [shouldCloseSlide]);

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
      enabled={enableSwipe}
      ref={swipeRef}
      renderRightActions={() => <SwipeActionBtns actions={actions} />}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        onLongPress={onLongPress}>
        {isSelecting && (
          <View style={styles.selectIcon}>
            {selected ? <SelectedIcon /> : <NotSelectedIcon />}
          </View>
        )}
        <View style={styles.subContainer1}>
          <AppText text={fullname} type="action_m" color="neutral_dark_5" />
          <AppText
            text={invoiceId}
            type="body_s"
            style={styles.invoiceId}
            color="neutral_dark_2"
          />
          <AppText text={dateTime} type="body_xs" color="neutral_dark_2" />
        </View>
        <View style={styles.subContainer2}>
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
            <AppText
              text={`${getCurrencySymbol(currency)} ${price}`}
              type="heading_h5"
              color="neutral_dark_5"
              textTransform="uppercase"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default BillCard;
