import {useContext} from 'react';
import {TimerContext} from '../providers/timer';

const useTimer = () => {
  const {
    startTime,
    elapsedTime,
    isRunning,
    setIsRunning,
    setStartTime,
    setElapsedTime,
  } = useContext(TimerContext);

  const handleSetIsRunning = (val: boolean) => {
    setIsRunning(val);
  };
  const handleSetStartTime = (val: number) => {
    setStartTime(val);
  };
  const handleSetElapsedTime = (val: number) => {
    setElapsedTime(val);
  };

  const start = () => {
    handleSetIsRunning(true);
    handleSetStartTime(Date.now() - elapsedTime);
  };

  const pause = () => {
    handleSetIsRunning(false);
  };

  const resume = () => {
    handleSetIsRunning(true);
    handleSetStartTime(Date.now() - elapsedTime);
  };

  const stop = () => {
    handleSetIsRunning(false);
    handleSetStartTime(0);
    handleSetElapsedTime(0);
  };

  return {
    isRunning,
    elapsedTime,
    startTime,
    start,
    pause,
    resume,
    stop,
  };
};

export default useTimer;
