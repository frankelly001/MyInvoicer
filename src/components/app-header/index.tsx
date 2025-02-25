import React, {FunctionComponent} from 'react';
import {Pressable, View} from 'react-native';
import {appHeaderStyle} from './styles';
import {detectTouch} from '../../config/const';
import {useNavigation} from '@react-navigation/native';
import {AppHeaderProps} from './type';
import AppText from '../app-text';
import {useColors} from '../../hooks/useColors';

const AppHeader: FunctionComponent<AppHeaderProps> = ({
  LeftContent = false,
  MiddleContent = false,
  RightContent = false,
  leftTitle,
  middleTitle,
  rightTitle,
  popupContent,
  onPressLeft,
  containerStyles,
  onPressRight = () => null,
}) => {
  const navigation = useNavigation();
  const colors = useColors();

  const styles = appHeaderStyle({colors});

  return (
    <>
      <View style={[styles.container, containerStyles]}>
        <View style={styles.left}>
          <Pressable
            hitSlop={detectTouch}
            onPress={() =>
              onPressLeft
                ? onPressLeft()
                : navigation?.canGoBack()
                ? navigation.goBack()
                : null
            }>
            {LeftContent ? (
              <>{LeftContent}</>
            ) : (
              <>
                {leftTitle && (
                  <AppText
                    text={leftTitle}
                    align="left"
                    color={'highlight_5'}
                    textTransform="capitalize"
                    type={'action_m'}
                  />
                )}
              </>
            )}
          </Pressable>
        </View>
        {(MiddleContent || middleTitle) && (
          <View style={styles.middle}>
            {MiddleContent ? (
              <>{MiddleContent}</>
            ) : (
              <>
                {middleTitle && (
                  <Pressable>
                    <AppText
                      color={'neutral_dark_5'}
                      text={middleTitle}
                      align="center"
                      textTransform="capitalize"
                      type={'heading_h4'}
                    />
                  </Pressable>
                )}
              </>
            )}
          </View>
        )}

        <View style={styles.right}>
          {RightContent ? (
            <>{RightContent}</>
          ) : (
            <>
              {rightTitle && (
                <Pressable hitSlop={detectTouch} onPress={onPressRight}>
                  <AppText
                    text={rightTitle}
                    color={'highlight_5'}
                    align="right"
                    textTransform="capitalize"
                    type={'action_m'}
                  />
                </Pressable>
              )}
            </>
          )}
        </View>
      </View>
      {popupContent}
    </>
  );
};

export default AppHeader;
