import {
  EstimateStatusTypes,
  InvoiceStatusTypes,
} from '../../utils/constants/status';

export type CustomerBillCardProps = {
  listNum?: number;
  billNumber?: string;
  date?: string;
  price?: string;
  status?: InvoiceStatusTypes | EstimateStatusTypes;
  onPress?: () => void;
  onLongPress?: () => void;
  onMorePress?: () => void;
  onDeletePress?: () => void;
  enableSwipe?: boolean;
  isSelecting?: boolean;
  selected?: boolean;
};
