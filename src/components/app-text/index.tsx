import React, {FunctionComponent} from 'react';
import {Text} from 'react-native';
import {typography} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import {textAlignStyles} from './styles';
import {AppTextProps} from './type';

const AppText: FunctionComponent<AppTextProps> = ({
  text,
  color = 'neutral_dark_5',
  type = 'body_s',
  align = 'auto',
  textTransform = 'none',
  style,
  onPress,
  ...otherTextProps
}) => {
  const colors = useColors();

  const textAlign = textAlignStyles[align];
  const textType = typography[type];
  const textColor = {color: colors[color]};

  const baseTextStyle = {
    ...textType,
    ...textColor,
    ...textAlign,
  };

  return (
    <Text
      onPress={onPress}
      style={[
        baseTextStyle,
        {
          textTransform,
        },
        style,
      ]}
      {...otherTextProps}>
      {text}
    </Text>
  );
};

export default AppText;
