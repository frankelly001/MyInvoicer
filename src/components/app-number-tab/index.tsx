import React, {FunctionComponent} from 'react';
import {Pressable, View} from 'react-native';
import {CheckIcon} from '../../assets/svg';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {appNumberTabStyles} from './styles';
import {AppNumberTabProps} from './types';

const AppNumberTab: FunctionComponent<AppNumberTabProps> = ({
  selectedIndex = 0,
  tabs = [],
  onChangeTab = () => null,
  tabErrorIndex = [],
}) => {
  const colors = useColors();
  const styles = appNumberTabStyles({colors});
  if (!tabs.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {tabs.map((item, i) => (
        <Pressable
          key={i}
          style={styles.barCardContainer}
          onPress={() => onChangeTab(i)}>
          <View
            style={[
              styles.barCard,
              {
                backgroundColor:
                  colors?.[
                    i === selectedIndex
                      ? 'highlight_5'
                      : i < selectedIndex
                      ? 'highlight_2'
                      : 'neutral_light_2'
                  ],
              },
            ]}>
            {i >= selectedIndex ? (
              <AppText
                text={i + 1}
                type="caption_m"
                color={
                  i === selectedIndex ? 'neutral_light_1' : 'neutral_dark_1'
                }
              />
            ) : (
              <CheckIcon fill={'white'} />
            )}
            {tabErrorIndex?.includes(i) && (
              <View style={styles.errorIndicator} />
            )}
          </View>

          <AppText
            text={item.name}
            type="heading_h5"
            align="center"
            color={i === selectedIndex ? 'neutral_dark_5' : 'neutral_dark_1'}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default AppNumberTab;
