import React from 'react';

export type TimerState = {
  isRunning: boolean;
  startTime: number;
  elapsedTime: number;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
};

const defaultTimerState: TimerState = {
  isRunning: false,
  startTime: 0,
  elapsedTime: 0,
  setIsRunning: () => {},
  setStartTime: () => {},
  setElapsedTime: () => {},
};

export const TimerContext = React.createContext<TimerState>(defaultTimerState);
