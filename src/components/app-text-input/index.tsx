import React, {FunctionComponent, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {EyeIcon, EyeSlashIcon} from '../../assets/svg';
import {detectTouch} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {appInputStyles} from './styles';
import {AppTextInputProps} from './type';

const AppTextInput: FunctionComponent<AppTextInputProps> = ({
  containerStyle,
  inputStyle,
  label,
  placeholder = 'placeholder',
  textContentType,
  LeftSuffixIcon,
  RightSuffixIcon,
  leftIconOnPress = () => null,
  rightIconOnPress = () => null,
  enableLeftIconOnPress = false,
  enableRightIconOnPress = false,
  inputContainerStyle,
  disabled,
  ...otherProps
}) => {
  const colors = useColors();

  const [isFocus, setIsFocus] = useState(false);

  const [secureText, setSecureText] = useState(textContentType === 'password');

  const isPasswordText = textContentType === 'password';

  const styles = appInputStyles({
    colors,
    isFocus,
    isDisabled: disabled,
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText text={label} type="heading_h5" textTransform="capitalize" />
      )}
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {RightSuffixIcon && (
          <TouchableOpacity
            hitSlop={detectTouch}
            onPress={leftIconOnPress}
            disabled={!enableLeftIconOnPress}
            style={styles.iconContainer}>
            {RightSuffixIcon}
          </TouchableOpacity>
        )}
        <View style={[styles.inputView]}>
          <TextInput
            placeholder={placeholder}
            style={[styles.inputField, inputStyle]}
            placeholderTextColor={colors.neutral_dark_1}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
            textContentType={textContentType}
            secureTextEntry={isPasswordText ? secureText : false}
            editable={!disabled}
            {...otherProps}
          />
        </View>

        {(isPasswordText || LeftSuffixIcon) && (
          <TouchableOpacity
            hitSlop={detectTouch}
            disabled={isPasswordText ? false : !enableRightIconOnPress}
            onPress={() =>
              isPasswordText ? setSecureText(!secureText) : rightIconOnPress()
            }
            style={styles.iconContainer}>
            {isPasswordText ? (
              <>
                {secureText ? (
                  <EyeIcon fill={colors.neutral_dark_2} />
                ) : (
                  <EyeSlashIcon fill={colors.neutral_dark_2} />
                )}
              </>
            ) : (
              <>{LeftSuffixIcon}</>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppTextInput;
