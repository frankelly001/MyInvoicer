import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AppBottomSheet, AppText} from '..';
import {useColors} from '../../hooks/useColors';
import {appChartFilterBtnStyles} from './styles';
import {AppChartFilterSheetProps} from './type';

const AppChartFilterSheet: FunctionComponent<AppChartFilterSheetProps> = ({
  closeSheet = () => null,
  filterOptionsBtns = [],
  sheetRef,
}) => {
  const colors = useColors();
  const styles = appChartFilterBtnStyles({colors});
  return (
    <AppBottomSheet
      title="Chart Filter"
      sheetRef={sheetRef}
      closeSheet={closeSheet}>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsContainer}>
          {filterOptionsBtns.map(({label, value, onPress = () => null}) => (
            <TouchableOpacity
              key={label}
              style={styles.optionItem}
              onPress={() => {
                onPress();
                closeSheet();
              }}>
              <AppText
                text={value}
                type="heading_h5"
                color="neutral_dark_5"
                style={styles.itemTitle}
              />
              <AppText text={label} type="body_xs" color="neutral_dark_5" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </AppBottomSheet>
  );
};

export default AppChartFilterSheet;
