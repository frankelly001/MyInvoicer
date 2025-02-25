import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {COLOR_TYPES} from '../../config/const';

export type ProfileCardProps = {
  onPress?: () => void;
  removeChatBtn?: boolean;
  IconContent?: ReactNode;
  fullname?: string;
  email?: string;
  image?: string;
  imageSize?: number;
  disable?: boolean;
  containerStyle?: ViewStyle;
  isVerified?: boolean;
  backgroundColor?: COLOR_TYPES;
};
