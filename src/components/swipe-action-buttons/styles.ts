import {StyleSheet} from 'react-native';
import {wp} from '../../config/const';

export const swipeActionBtnStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btnContainer: {
    paddingHorizontal: 5,

    borderRightWidth: 0,
    alignItems: 'center',
    width: wp(70),
    paddingTop: 22,
  },
  label: {marginTop: 8},
});
