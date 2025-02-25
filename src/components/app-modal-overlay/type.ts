import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export type ModalOverlayProps = {
  visible?: boolean;
  children?: ReactNode;
  modalStyle?: ViewStyle;
};
