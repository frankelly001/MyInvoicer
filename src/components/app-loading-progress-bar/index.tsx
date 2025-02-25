import React, {FunctionComponent} from 'react';
import {View, ViewStyle} from 'react-native';
import {Bar as ProgressBar} from 'react-native-progress';
import {useColors} from '../../hooks/useColors';
import {COLOR_TYPES, SCREEN_WIDTH, wp} from '../../config/const';
import {appLoadingProgressBarstyles} from './styles';

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
const styles = appLoadingProgressBarstyles;

const AppLoadingProgressBar: FunctionComponent<{
  width?: IntRange<0, 101>;
  visible?: boolean;
  borderColor?: COLOR_TYPES;
  containerStyles?: ViewStyle;
  borderWidth?: number;
  height?: number;
}> = ({
  width = 100,
  visible = true,
  borderColor = 'transparent',
  containerStyles,
  height = 1.5,
  borderWidth = 0,
}) => {
  const colors = useColors();
  if (!visible) {
    return null;
  }
  return (
    <View style={[styles.container, containerStyles]}>
      <ProgressBar
        indeterminate={true}
        color={colors?.highlight_5}
        borderColor={colors?.[borderColor]}
        borderWidth={borderWidth}
        unfilledColor={colors.transparent}
        width={(width / 100) * SCREEN_WIDTH}
        height={wp(height)}
      />
    </View>
  );
};

export default AppLoadingProgressBar;
