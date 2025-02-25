import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeHeader: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    marginTop: 10,
  },
  subHeader: {paddingBottom: 12},
  chartContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
    backgroundColor: 'red',
  },
  flex1: {flex: 1},
  listContainer: {
    flex: 1,
  },
  listHeader: {
    marginTop: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  flex1_5: {flex: 1.5},
  inputContainer: {
    width: undefined,
    flex: 1,
    justifyContent: 'flex-end',
  },
  input: {height: undefined},
});
