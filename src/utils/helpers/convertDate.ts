import dayjs, {ConfigType} from 'dayjs';

const convertToReadableDate = (
  date: ConfigType,
  template: string = 'DD MMM YYYY',
) => dayjs(date).format(template);

const convertToReadableTime = (date: ConfigType) =>
  dayjs(date).format('h:mm A');

export {convertToReadableDate, convertToReadableTime};
