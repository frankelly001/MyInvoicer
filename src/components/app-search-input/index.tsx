import React, {FunctionComponent} from 'react';
import {Pressable, View} from 'react-native';
import {SearchIcon} from '../../assets/svg';
import {TextInput} from 'react-native-gesture-handler';
import {useColors} from '../../hooks/useColors';
import {appSearchInputStyles} from './styles';
import {AppSearchInputProps} from './type';

const AppSearchInput: FunctionComponent<AppSearchInputProps> = ({
  onPress = () => null,
  inputRef,
  containerStyle,
  ...otherInputProps
}) => {
  const colors = useColors();
  const styles = appSearchInputStyles({colors});
  return (
    <Pressable
      onPress={() => {
        onPress();
        inputRef?.current?.focus();
      }}
      style={[styles.inputContainer, containerStyle]}>
      <SearchIcon fill={colors.neutral_dark_5} />
      <View style={styles.inputView}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={colors.neutral_dark_1}
          {...otherInputProps}
        />
      </View>
    </Pressable>
  );
};

export default AppSearchInput;
