import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {EmptyFileIcon} from '../../assets/svg';
import {useColors} from '../../hooks/useColors';
import AppButton from '../app-button';
import AppText from '../app-text';
import {appAlertStyles} from './styles';
import {AppAlertProps} from './types';

const AppAlert: FunctionComponent<AppAlertProps> = ({
  buttonText,
  containerStyle,
  description,
  Icon,
  onPress,
  removeButton,
  title = 'Nothing here for now.',
}) => {
  const colors = useColors();
  const styles = appAlertStyles;
  return (
    <View style={[styles.container, containerStyle]}>
      {Icon || <EmptyFileIcon fill={colors.highlight_1} />}
      <AppText
        text={title}
        color="neutral_dark_4"
        type="heading_h2"
        align="center"
        style={styles.tttle}
      />
      <AppText
        text={description}
        color="neutral_dark_2"
        type="body_m"
        align="center"
        style={styles.desc}
      />
      {!removeButton && (
        <AppButton text={buttonText} style={styles.btn} onPress={onPress} />
      )}
    </View>
  );
};

export default AppAlert;
