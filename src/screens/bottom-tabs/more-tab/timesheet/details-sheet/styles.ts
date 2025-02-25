import {StyleSheet} from 'react-native';

export const timeDetailsSheetStyles = StyleSheet.create({
  container: {gap: 16, paddingTop: 16},
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 26,
  },
  billInfoContainer: {gap: 8},
  submitBtn: {flex: 1},
  footerContanier: {
    flexDirection: 'row',
    paddingBottom: 30,
    justifyContent: 'space-between',
    columnGap: 16,
    paddingHorizontal: 20,
  },
});
