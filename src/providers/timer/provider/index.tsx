import React, {FunctionComponent, ReactNode, useEffect, useState} from 'react';
import {TimerContext} from '../context';
import BackgroundTimer from 'react-native-background-timer';

const TimerProvider: FunctionComponent<{children: ReactNode}> = ({
  children,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = BackgroundTimer.setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => {
      if (interval) {
        BackgroundTimer.clearInterval(interval);
      }
    };
  }, [isRunning, startTime]);

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        startTime,
        elapsedTime,
        setIsRunning,
        setStartTime,
        setElapsedTime,
      }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
