import {FlashList, FlashListProps} from '@shopify/flash-list';
import {AppAlertProps} from '../app-alert/types';

export type AppFlatListProps<T> = {
  isLoading?: boolean;
  isFetchingMore?: boolean;
  contentContainerPaddingTop?: number;
  listRef?: React.RefObject<FlashList<any>>;
  emptyListAlert?: AppAlertProps;
} & Omit<FlashListProps<T>, 'refreshing' | 'refreshControl'>;
