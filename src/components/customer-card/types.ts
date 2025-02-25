export type CustomerCardProps = {
  listNum?: number;
  fullname?: string;
  email?: string;
  phone?: string | null;
  onPress?: () => void;
  onLongPress?: () => void;
  onMorePress?: () => void;
  onDeletePress?: () => void;
  enableSwipe?: boolean;
  isSelecting?: boolean;
  selected?: boolean;
  shouldCloseSlide?: boolean;
};
