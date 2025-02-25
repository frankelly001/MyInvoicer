import {BaseSheetProps} from '../../types/Sheet';

export type AppDeleteSheetProps = {
  onOpen?: () => void;
  onClose?: () => void;
  onPressDelete?: () => void;
  withOverlay?: boolean;
  shouldCloseSheetWhenItemPressed?: boolean;
} & BaseSheetProps;
