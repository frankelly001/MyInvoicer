export const formatTime = (time: number) => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const reverseFormatTime = (formattedTime: string = ''): number => {
  const [hours, minutes, seconds] = formattedTime.split(':').map(Number);
  return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
};

export const convertMsToHr = (milliseconds: number): number => {
  return milliseconds / (1000 * 60 * 60);
};

export const convertFormatTimeToHr = (formattedTime: string = ''): number => {
  const milliseconds = reverseFormatTime(formattedTime);
  return convertMsToHr(milliseconds);
};

export const convertToReadableTimeFormat = (
  timeStr: string = '00:00:00',
): string => {
  const [hours, minutes] = timeStr.split(':');
  return `${parseInt(hours, 10)}hr ${parseInt(minutes, 10)}m`;
};
