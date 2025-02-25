/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  Animated as RNAnimated,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
  SCREEN_HEIGHT,
} from '../../config/const';
import {invoices} from '../../dummydata/invoices';
import {useColors} from '../../hooks/useColors';
import AppHeader from '../app-header';
import AppTabTitleHeader from '../app-tab-title-header';
import AppText from '../app-text';
import BillCard from '../bill-card';
import {animatedHeaderStyles} from './styles';
import {AnimatedTabHeaderProps} from './types';
import AppSearchInput from '../app-search-input';

const AnimatedTabHeader: FunctionComponent<AnimatedTabHeaderProps> = ({
  screenTitle = 'Title',
  value,
  onChangeText,
  translateY = 0,
  rightContent,
  rightTitle,
  onPressRight,
  scrollHeaderProps,
  screenRightContent,
  screenOnPressRight,
  ...headerProps
}) => {
  const colors = useColors();
  const [searchToggle, setSearchToggle] = useState(false);
  const styles = animatedHeaderStyles({colors, searchToggle});

  const recentSearchContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(searchToggle ? SCREEN_HEIGHT : 0),
    };
  }, [searchToggle]);
  const inputRef = useRef<TextInput>(null);

  const headerContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(searchToggle ? 0 : 500),
    };
  }, [searchToggle]);

  const inputContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: withTiming(searchToggle ? 22 : 16),
    };
  }, [searchToggle]);

  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      flex: withTiming(searchToggle ? 0.83 : 1),
    };
  }, [searchToggle]);

  const cancelAnimatedStyle = useAnimatedStyle(() => {
    return {
      right: withSpring(searchToggle ? 24 : 50),
      opacity: withTiming(searchToggle ? 1 : 0),
    };
  }, [searchToggle]);

  useEffect(() => {
    if (searchToggle) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [searchToggle]);

  return (
    <>
      <Animated.View
        style={[{zIndex: !searchToggle ? 2 : 1}, headerContainerAnimatedStyle]}>
        <View>
          <AppHeader
            rightContent={rightContent}
            rightTitle={rightTitle}
            onPressRight={onPressRight}
            {...headerProps}
          />
          <RNAnimated.View
            style={[
              {
                position: 'absolute',
                top: -(HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT),
                width: '100%',
                height: '100%',
              },
              {transform: [{translateY: RNAnimated.multiply(translateY, -1)}]},
            ]}>
            <AppHeader
              leftContent={scrollHeaderProps?.leftContent}
              leftTitle={scrollHeaderProps?.leftTitle}
              onPressLeft={scrollHeaderProps?.onPressLeft}
              middleContent={scrollHeaderProps?.middleContent}
              middleTitle={scrollHeaderProps?.middleTitle}
              onPressMiddle={scrollHeaderProps?.onPressMiddle}
              middleTopTitle={scrollHeaderProps?.middleTitle}
              rightContent={scrollHeaderProps?.rightContent}
              rightTitle={scrollHeaderProps?.rightTitle}
              onPressRight={onPressRight}
            />
          </RNAnimated.View>
        </View>
      </Animated.View>
      <RNAnimated.View
        style={[styles.animatedHiddenHeader, {transform: [{translateY}]}]}>
        <Animated.View style={headerContainerAnimatedStyle}>
          <AppTabTitleHeader
            screenTitle={screenTitle}
            rightContent={screenRightContent || scrollHeaderProps?.rightContent}
            onPressRight={screenOnPressRight || onPressRight}
          />
        </Animated.View>

        <Animated.View
          style={[styles.searchContainer, inputContainerAnimatedStyle]}>
          <Animated.View style={inputAnimatedStyle}>
            <AppSearchInput
              inputRef={inputRef}
              placeholder={'Search'}
              value={value}
              onChangeText={onChangeText}
              onFocus={() => {
                setSearchToggle(true);
              }}
              onBlur={() => {
                setSearchToggle(false);
              }}
            />
          </Animated.View>

          <Animated.View
            style={[{zIndex: -1, position: 'absolute'}, cancelAnimatedStyle]}>
            <View style={{paddingLeft: 8}}>
              <TouchableOpacity onPress={() => setSearchToggle(false)}>
                <AppText text={'Cancel'} type="body_m" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </RNAnimated.View>

      <Animated.View
        style={[
          styles.resultSesultContainer,
          recentSearchContainerAnimatedStyle,
        ]}>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{paddingBottom: 220}}>
            {invoices.map(el => (
              <BillCard
                key={el.invoiceId}
                currency="$"
                price="2000"
                enableSwipe={false}
              />
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
};
export default AnimatedTabHeader;
