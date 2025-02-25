import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {swipeActionBtnStyles} from './styles';
import {SwipeActionBtnsProps} from './type';

const SwipeActionBtns: FunctionComponent<SwipeActionBtnsProps> = ({
  btnStyle,
  actions,
}) => {
  const colors = useColors();

  return (
    <View style={swipeActionBtnStyles.container}>
      {actions.map((item, i) => (
        <TouchableOpacity
          onPress={item.onPress}
          key={i}
          style={[
            {
              backgroundColor: colors[item.color2],
              ...swipeActionBtnStyles.btnContainer,
            },
            btnStyle,
          ]}>
          <View style={{}}>{item.Icon}</View>
          <AppText
            text={item.name}
            type="body_xs"
            color={item.color1}
            align="center"
            style={swipeActionBtnStyles.label}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SwipeActionBtns;
