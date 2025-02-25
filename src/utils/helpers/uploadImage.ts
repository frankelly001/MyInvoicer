import ImagePicker from 'react-native-image-crop-picker';
import {logThis} from './logThis';

export const uploadImage = async ({
  crop,
  from,

  selectMultiple,
}: {
  from: 'openCamera' | 'openPicker';
  selectMultiple?: boolean;
  crop?: {
    shouldCrop: boolean;
    width: number;
    height: number;
    circleOverlay?: boolean;
  };
}) => {
  if (!from) {
    return null;
  }
  try {
    const response = await ImagePicker[from]({
      mediaType: 'photo',
      includeBase64: true,
      multiple: selectMultiple,
      width: crop?.width,
      height: crop?.height,
      cropping: crop?.shouldCrop,
      cropperCircleOverlay: crop?.circleOverlay,
    });

    if (response) {
      return response;
    } else {
      logThis('failed to get image');
    }
  } catch (error) {
    logThis(error, ' fail');
  }
};
