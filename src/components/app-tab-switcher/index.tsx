import React, {FunctionComponent} from 'react';
import {Pressable, View} from 'react-native';
import {DividerIcon} from '../../assets/svg';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {appTabSwitcherStyles} from './styles';
import {AppTabSwitcherProps} from './types';

const AppTabSwitcher: FunctionComponent<AppTabSwitcherProps> = ({
  selectedIndex = 0,
  tabs = [],
  onChangeTab = () => null,
  tabLabelType = 'heading_h5',
  disabled,
  width,
}) => {
  const colors = useColors();
  const styles = appTabSwitcherStyles({colors, width});
  if (!tabs.length) {
    return null;
  }
  return (
    <View style={styles.tabContainer}>
      {tabs.map((item, i) => (
        <Pressable
          disabled={disabled}
          onPress={() => onChangeTab(i)}
          key={i}
          style={[
            styles.tab,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor:
                i === selectedIndex ? colors?.neutral_light_1 : 'transparent',
            },
          ]}>
          <AppText
            text={item.name}
            type={tabLabelType}
            numberOfLines={1}
            align="center"
            color={i === selectedIndex ? 'neutral_dark_5' : 'neutral_dark_1'}
          />
          {![selectedIndex, tabs.length - 1, selectedIndex - 1].includes(i) && (
            <View style={styles.divider}>
              <DividerIcon />
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default AppTabSwitcher;
