import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {Pressable} from 'react-native';
import {ArrowLeftIcon} from '../../assets/svg';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {appBackButtonStyles} from './styles';

const AppBackButton: FunctionComponent<{
  onPress?: () => void;
  title: string;
}> = ({onPress, title}) => {
  const colors = useColors();
  const navigation = useNavigation();
  const styles = appBackButtonStyles({colors});

  return (
    <Pressable onPress={onPress || navigation.goBack} style={styles.container}>
      <ArrowLeftIcon fill={colors.highlight_5} />
      {title && (
        <AppText
          text={title}
          align="left"
          color={'highlight_5'}
          type={'action_l'}
          style={styles.title}
        />
      )}
    </Pressable>
  );
};

export default AppBackButton;
