import {TimesheetStatusTypes} from '../../utils/constants/status';

export type TimesheetCardProps = {
  name?: string;
  createdAt?: string;
  duration?: string;
  status?: TimesheetStatusTypes;
  onPress?: () => void;
  onLongPress?: () => void;
  onMorePress?: () => void;
  onDeletePress?: () => void;
  enableSwipe?: boolean;
  isSelecting?: boolean;
  selected?: boolean;
  shouldCloseSlide?: boolean;
};
