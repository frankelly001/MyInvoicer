import React, {FunctionComponent, ReactNode, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {
  DeleteIcon,
  EditSquareIcon,
  NotSelectedIcon,
  SelectedIcon,
} from '../../assets/svg';
import {COLOR_TYPES} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import {statusStyles} from '../../utils/constants/status';
import AppText from '../app-text';
import SwipeActionBtns from '../swipe-action-buttons';
import {timeSheetCardStyles} from './styles';
import {TimesheetCardProps} from './types';
import {
  convertToReadableDate,
  convertToReadableTimeFormat,
} from '../../utils/helpers';
import {convertToReadableTime} from '../../utils/helpers/convertDate';

const TimesheetCard: FunctionComponent<TimesheetCardProps> = ({
  name = 'Logo Design',
  createdAt,
  duration = '1hr 30m',
  status = 'unbilled',
  onPress,
  selected,
  isSelecting,
  enableSwipe,
  onDeletePress,
  onMorePress,
  shouldCloseSlide,
  onLongPress,
}) => {
  const colors = useColors();

  const swipeRef = useRef<Swipeable>(null);

  useEffect(() => {
    if (shouldCloseSlide) {
      swipeRef.current?.close();
    }
  }, [shouldCloseSlide]);

  const styles = timeSheetCardStyles({colors});

  const actions: {
    name: string;
    Icon: ReactNode;
    onPress?: () => void;
    color1: COLOR_TYPES;
    color2: COLOR_TYPES;
  }[] = [
    {
      name: 'Edit',
      Icon: <EditSquareIcon fill={colors.highlight_5} />,
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

          <View style={styles.profile}>
            <AppText
              text={name}
              type="heading_h5"
              color="neutral_dark_5"
              textTransform="capitalize"
            />
            <AppText
              text={`${convertToReadableDate(
                createdAt,
                'YYYY-MM-DD',
              )}, ${convertToReadableTime(createdAt)}`}
              type="body_s"
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
            <AppText
              text={convertToReadableTimeFormat(duration)}
              type="heading_h5"
              color="neutral_dark_5"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default TimesheetCard;
