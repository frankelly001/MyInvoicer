import {ViewStyle} from 'react-native';
import {Image} from 'react-native-image-crop-picker';

export type ImageInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (image?: Image) => void;
  style?: ViewStyle;
};
