import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {listButtonStyles} from './styles';
import {AppListButtonProps} from './type';

const AppListButton: FunctionComponent<AppListButtonProps> = ({
  LeftIcon,
  RightIcon,
  onPress,
  title,
  titleSize = 'body_m',
  titleColor,
  disabled,
  borderType,
  style,
  textTranform,
}) => {
  const colors = useColors();
  const styles = listButtonStyles({colors});
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          ...styles.container,
          ...(borderType && {[`border${borderType}Width`]: 0.5}),
        },
        style,
      ]}>
      {LeftIcon && <View style={styles.leftIcon}>{LeftIcon}</View>}
      <AppText
        text={title}
        type={titleSize}
        color={titleColor}
        style={styles.title}
        textTransform={textTranform}
      />

      {RightIcon}
    </TouchableOpacity>
  );
};

export default AppListButton;
