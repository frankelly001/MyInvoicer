export type ItemCardProps = {
  listNum?: number;
  removeListNum?: boolean;
  name: string;
  description: string;
  price: string;
  currency: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onMorePress?: () => void;
  onDeletePress?: () => void;
  enableSwipe?: boolean;
  isSelecting?: boolean;
  selected?: boolean;
  shouldCloseSlide?: boolean;
};
