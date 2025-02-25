import {ReactNode} from 'react';
import {BaseSheetProps} from '../../types/Sheet';
import {Animated, FlatListProps} from 'react-native';

export type AppSheetListProps<ItemT> = {
  title?: string;
  onOpen?: () => void;
  onClose?: () => void;
  removeHeader?: boolean;
  AdditionalHeaderContent?: ReactNode;
  HeaderComponent?: ReactNode;
  FooterComponent?: ReactNode;
  adjustToContentHeight?: boolean;
  panGestureEnabled?: boolean;
  closeOnOverlayTap?: boolean;
} & Animated.AnimatedProps<FlatListProps<ItemT>> &
  BaseSheetProps;
