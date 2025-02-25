import React, {FunctionComponent} from 'react';
import {AppButton} from '../../../../../components';
import useTimer from '../../../../../hooks/useTimer';
import {timeSheetFormStyles} from '../styles';

const TimerActionControl: FunctionComponent<{
  onSubmitTime: (time: number) => void;
}> = ({onSubmitTime}) => {
  const {startTime, elapsedTime, isRunning, start, pause, resume, stop} =
    useTimer();

  const styles = timeSheetFormStyles();
  return (
    <>
      {!startTime ? (
        <AppButton
          text="Start"
          borderWidth={1.5}
          borderColor="highlight_5"
          style={styles.addItemSubmit}
          onPress={start}
        />
      ) : null}
      {startTime && isRunning ? (
        <AppButton
          text={'Pause'}
          borderWidth={1.5}
          borderColor="highlight_5"
          buttonColor="neutral_light_1"
          textColor="highlight_5"
          style={styles.addItemSubmit}
          onPress={pause}
        />
      ) : null}
      {startTime && !isRunning ? (
        <>
          <AppButton
            text={'Save'}
            borderWidth={1.5}
            borderColor="highlight_5"
            buttonColor="neutral_light_1"
            textColor="highlight_5"
            style={styles.addItemSubmit}
            onPress={() => {
              onSubmitTime(elapsedTime);
              stop();
            }}
          />
          <AppButton
            text={'Play'}
            borderWidth={1.5}
            borderColor="highlight_5"
            style={styles.addItemSubmit}
            onPress={resume}
          />
        </>
      ) : null}
    </>
  );
};

export default TimerActionControl;
