import {StyleSheet} from 'react-native';
import {wp} from '../../../../config/const';

export const billListStyles = StyleSheet.create({
  container: {gap: 30, paddingHorizontal: 20},
});
export const billListCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wp(50),
  },
  subContainer1: {gap: 16, flex: 1},
  subContainer2: {gap: 16, flex: 0.5},
  flex1: {flex: 1},
  listContent: {flex: 1, borderRadius: 33, height: wp(16.5)},
});
