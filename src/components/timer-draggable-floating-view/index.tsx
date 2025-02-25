import React, {FunctionComponent} from 'react';
import {View} from 'react-native';

import {formatTime} from '../../utils/helpers';
import AppText from '../app-text';
import DraggableView from './draggable-view';
import {timerViewStyles} from './styles';
import AppButton from '../app-button';
import useTimer from '../../hooks/useTimer';
import {useColors} from '../../hooks/useColors';

const TimerDraggableFloatingView: FunctionComponent<{
  openTimerSheet?: () => void;
  title?: string;
}> = ({openTimerSheet, title}) => {
  const {pause, resume, stop, startTime, elapsedTime, isRunning} = useTimer();
  const colors = useColors();
  const styles = timerViewStyles({colors});

  return startTime ? (
    <DraggableView>
      <View style={[styles.container, {backgroundColor: colors.highlight_1}]}>
        <View style={styles.details}>
          <AppText
            onPress={openTimerSheet}
            align="left"
            text={formatTime(elapsedTime)}
            type="heading_h3"
          />
          <AppText
            text={title}
            type="body_s"
            numberOfLines={1}
            align="left"
            color="neutral_dark_2"
          />
        </View>
        {isRunning ? (
          <AppButton
            text="Pause"
            buttonColor="neutral_light_1"
            borderColor="highlight_5"
            textColor="highlight_5"
            borderWidth={1.5}
            style={{width: undefined}}
            onPress={pause}
          />
        ) : (
          <>
            <AppButton
              text="Discard"
              borderColor="support_error_3"
              buttonColor="neutral_light_1"
              textColor="support_error_3"
              borderWidth={1.5}
              style={{width: undefined}}
              onPress={stop}
            />
            <AppButton
              text="Play"
              buttonColor="neutral_light_1"
              borderColor="highlight_5"
              textColor="highlight_5"
              borderWidth={1.5}
              style={{width: undefined}}
              onPress={resume}
            />
          </>
        )}
      </View>
    </DraggableView>
  ) : null;
};

export default TimerDraggableFloatingView;
