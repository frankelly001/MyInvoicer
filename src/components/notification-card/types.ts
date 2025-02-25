export type NotificationCardProps = {
  title?: string;
  subTitle?: string;
  duration?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onDeletePress?: () => void;
  enableSwipe?: boolean;
  isSelecting?: boolean;
  isRead?: boolean;
  selected?: boolean;
  shouldCloseSlide?: boolean;
};
