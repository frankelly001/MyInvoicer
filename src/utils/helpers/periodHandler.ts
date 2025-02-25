import {startOfDay, startOfMonth, startOfWeek, startOfYear} from 'date-fns';
export type PeriodOptions = 'today' | 'this week' | 'this month' | 'this year';
export const periodHandler = (option: PeriodOptions) => {
  let startDate: Date | string = '';
  let endDate: Date | string = '';

  const now = new Date();

  switch (option) {
    case 'today':
      startDate = startOfDay(now);
      endDate = now;
      break;
    case 'this week':
      startDate = startOfWeek(now);
      endDate = now;
      break;
    case 'this month':
      startDate = startOfMonth(now);
      endDate = now;
      break;
    case 'this year':
      startDate = startOfYear(now);
      endDate = now;
      break;
    default:
      break;
  }

  return {
    startDate: startDate ? new Date(startDate as string).toISOString() : '',
    endDate: endDate ? new Date(endDate as string).toISOString() : '',
  };
};
