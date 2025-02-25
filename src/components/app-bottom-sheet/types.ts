import {ReactNode} from 'react';
import {ModalizeSheetRef} from '../../types/Sheet';
import {ViewStyle} from 'react-native';

type BaseBottomSheetProps = {
  sheetRef?: ModalizeSheetRef;
  closeSheet?: () => void;
  title?: string;
  onOpen?: () => void;
  onClose?: () => void;
  removeHeader?: boolean;
  removeCancel?: boolean;
  AdditionalHeaderContent?: ReactNode;
  shouldCloseSheetOnItemPressed?: boolean;
  FooterComponent?: ReactNode;
  withHandle?: boolean;
  adjustToContentHeight?: boolean;
  handleStyle?: ViewStyle;
};

export type AppBottomSheetProps = BaseBottomSheetProps &
  (
    | {children: ReactNode; optionsBtns?: never}
    | {
        optionsBtns: {
          name: string;
          Icon: React.JSX.Element;
          onPress?: () => void;
        }[];
        children?: never;
      }
  );
