import React, {FunctionComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {inputBtnStyles} from './style';
import {AppBtnInputProps} from './type';

const AppBtnInput: FunctionComponent<AppBtnInputProps> = ({
  RightContent,
  label = 'Label',
  onPress,
  style,
  value,
  isFocused,
  placeholder = 'Placeholder',
  borderColor,
  buttonColor,
  textColor = 'neutral_dark_5',
  textSize = 'body_s',
  disabled,
}) => {
  const colors = useColors();

  const styles = inputBtnStyles({
    colors,
    isFocus: isFocused,
    borderColor,
    buttonColor,
    disabled,
  });

  return (
    <View style={[styles.container, style]}>
      <AppText text={label} type="heading_h5" textTransform="capitalize" />
      <TouchableOpacity
        disabled={disabled}
        style={[styles.inputContainer]}
        activeOpacity={1}
        onPress={onPress}>
        <AppText
          type={textSize}
          text={value || placeholder}
          color={value ? textColor : 'neutral_dark_1'}
          style={styles.text}
        />
        {RightContent && <>{RightContent}</>}
      </TouchableOpacity>
    </View>
  );
};

export default AppBtnInput;
