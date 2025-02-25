import React, {FunctionComponent} from 'react';
import {View, ViewStyle} from 'react-native';
import {COLOR_TYPES} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import {appSeperatorStyles} from './styles';

const AppSeperator: FunctionComponent<{
  color?: COLOR_TYPES;
  containerStyle?: ViewStyle;
  paddingHorizontal?: number;
}> = ({color = 'neutral_light_4', paddingHorizontal = 24, containerStyle}) => {
  const colors = useColors();
  return (
    <View style={[{paddingHorizontal}, containerStyle]}>
      <View
        style={{
          borderColor: colors[color],
          ...appSeperatorStyles.container,
        }}
      />
    </View>
  );
};

export default AppSeperator;
