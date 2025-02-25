import {
  EstimateStatusTypes,
  InvoiceStatusTypes,
  OrderStatusTypes,
  ReceiptStatusTypes,
} from '../../utils/constants/status';

export type BillCardProps = {
  fullname?: string;
  invoiceId?: string;
  dateTime?: string;
  status?:
    | InvoiceStatusTypes
    | EstimateStatusTypes
    | OrderStatusTypes
    | ReceiptStatusTypes;
  price?: string;
  currency?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onMorePress?: () => void;
  onDeletePress?: () => void;
  enableSwipe?: boolean;
  isSelecting?: boolean;
  selected?: boolean;
  shouldCloseSlide?: boolean;
};
