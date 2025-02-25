import {StyleSheet} from 'react-native';

export const itemDetailsSheetStyles = StyleSheet.create({
  container: {paddingBottom: 8},
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detail: {marginVertical: 8, flex: 0},

  submitBtn: {width: '48%'},
  descriptionLabel: {paddingHorizontal: 0},
  descriptionValue: {marginTop: 16, marginBottom: 32},
  actionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
