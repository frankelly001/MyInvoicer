import {Ref} from 'react';
import {Modalize, ModalizeProps} from 'react-native-modalize';
import {ViewStyle} from 'react-native';
import {ReactNode} from 'react';

export type SheetTypes = {
  enableSlideToClose?: boolean;
  disableBackDrop?: boolean;
  sheetRef?: Ref<Modalize>;
  onBackPress?: () => void;
  onPressButton?: () => void;
  modalStyle?: ViewStyle;
  children: ReactNode;
  snapHeight?: number;
  showButton?: boolean;
  useButtonText?: boolean;
  buttonTitle?: string;
  portal?: boolean;
} & Omit<ModalizeProps, 'children'>;
