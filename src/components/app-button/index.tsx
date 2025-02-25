import React, {FunctionComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {appBtnStyles} from './styles';
import {appButtonProps} from './type';
import {ActivityIndicator} from 'react-native';

const AppButton: FunctionComponent<appButtonProps> = ({
  text = 'BUTTON',
  textSize = 'action_m',
  readonly,
  style,
  textTransform,
  disabled = false,
  buttonColor,
  textColor = 'button',
  LeftView,
  borderColor = 'transparent',
  borderWidth = 1.5,
  borderRadius = 12,
  isLoading,
  ...otherProps
}) => {
  const colors = useColors();

  const styles = appBtnStyles({
    colors,
    borderColor,
    borderRadius,
    borderWidth,
    buttonColor,
    disabled,
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={readonly ? 1 : 0.7}
      style={[styles.container, style]}
      {...otherProps}>
      {LeftView}
      {isLoading ? (
        <ActivityIndicator color={colors?.highlight_5} size={25} />
      ) : (
        <AppText
          text={text}
          align="center"
          type={textSize}
          color={textColor}
          style={{textTransform}}
        />
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
