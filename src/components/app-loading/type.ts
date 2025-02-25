import {AnimationObject} from 'lottie-react-native';
import {ViewStyle} from 'react-native';

export type AppLoadinTypes = {
  extraLoadingStyles?: ViewStyle;
  visible?: boolean;
  loadingIcon?:
    | string
    | AnimationObject
    | {
        uri: string;
      };
};
