import React, {FunctionComponent, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useColors} from '../../hooks/useColors';
import {AppVectorIcons, Icon} from '../app-icons';
import AppText from '../app-text';
import {selectInputStyles} from './style';
import {AppSelectInputProps} from './type';

const AppSelectInput: FunctionComponent<AppSelectInputProps> = ({
  label,
  placeholder = 'placeholder',
  onChange,
  value = '',
  containerStyle,
  inputContainerStyle,
  enableSearchInput,
  RightContent,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const colors = useColors();
  const [isFocus, setIsFocus] = useState(false);
  const selectInputRef = useRef<any>(null);
  const styles = selectInputStyles({colors, isFocus});

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText
          text={label}
          type="heading_h5"
          textTransform="capitalize"
          style={styles.label}
        />
      )}
      <TouchableOpacity
        style={[styles.inputContainer, inputContainerStyle]}
        activeOpacity={1}
        onPress={() => {
          !isFocus && setIsFocus(true);
          selectInputRef.current?.open();
        }}>
        <View style={styles.selectInputView}>
          <Dropdown
            ref={selectInputRef}
            style={styles.dropdown}
            placeholderStyle={[styles.placeholderStyle]}
            selectedTextStyle={[styles.selectedTextStyle]}
            value={value}
            onChange={item => onChange(item)}
            inputSearchStyle={[styles.inputSearchStyle]}
            iconStyle={styles.iconStyle}
            search={enableSearchInput}
            maxHeight={300}
            dropdownPosition="auto"
            showsVerticalScrollIndicator={false}
            containerStyle={styles.dropdownContainer}
            onBlur={() => {
              isFocus && setIsFocus(false);
              if (onBlur) {
                onBlur();
              }
            }}
            onFocus={() => {
              !isFocus && setIsFocus(true);
              if (onFocus) {
                onFocus();
              }
            }}
            placeholder={placeholder}
            searchPlaceholder={'Search...'}
            labelField={'label'}
            valueField={'value'}
            {...otherProps}
            renderItem={(item: {label: string; value: string}) => {
              return (
                <View
                  style={[
                    styles.item,
                    {
                      backgroundColor:
                        colors[
                          item.value === value
                            ? 'neutral_light_5'
                            : 'neutral_light_1'
                        ],
                    },
                  ]}>
                  <AppText
                    text={item.label}
                    color={
                      item.value === value ? 'neutral_dark_5' : 'neutral_dark_2'
                    }
                    textTransform="capitalize"
                    type="body_m"
                  />
                </View>
              );
            }}
          />
          <View style={styles.iconPosition}>
            {RightContent ? (
              RightContent
            ) : (
              <Icon
                IconTag={AppVectorIcons.SimpleLineIcons}
                name="arrow-down"
                size={13}
                color={colors.neutral_dark_5}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppSelectInput;
