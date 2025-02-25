import {StyleSheet} from 'react-native';
import {wp} from '../../config/const';

export const appFlashListStyles = ({
  contentContainerPaddingTop,
}: {
  contentContainerPaddingTop?: number;
}) =>
  StyleSheet.create({
    contentContainer: {
      paddingTop: contentContainerPaddingTop,
      paddingBottom: wp(5),
    },
  });
