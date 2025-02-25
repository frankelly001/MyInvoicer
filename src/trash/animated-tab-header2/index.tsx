import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Animated as RNAnimated,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {CloseXSIcon, SearchIcon} from '../../assets/svg';
import {
  detectTouch,
  HEADER_SEARCH_HEIGHT,
  MAIN_HEADER_HEIGHT,
  SCREEN_HEIGHT,
} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import AppHeader from '../../components/app-header';
import AppText from '../../components/app-text';
import BillCard from '../../components/bill-card';
import {animatedHeaderStyles} from './styles';
import {AnimatedTabHeaderProps} from './types';

const AnimatedTabHeader: FunctionComponent<AnimatedTabHeaderProps> = ({
  // screenTitle = 'Title',
  value,
  onChangeText,
  // translateY = 0,
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
      paddingBottom: withTiming(searchToggle ? 0 : 10),
      paddingHorizontal: withTiming(searchToggle ? 22 : 16),
      minHeight: withTiming(searchToggle ? HEADER_SEARCH_HEIGHT : 0),
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
      <Animated.View style={headerContainerAnimatedStyle}>
        <View>
          <AppHeader {...headerProps} />
        </View>
        {/* <View style={styles.screenTitle}>
          <AppText text={screenTitle} size={'heading_h1'} />
        </View> */}
      </Animated.View>

      <Animated.View
        style={[styles.searchContainer, inputContainerAnimatedStyle]}>
        <Animated.View style={inputAnimatedStyle}>
          <Pressable
            onPress={() => setSearchToggle(true)}
            style={styles.inputContainer}>
            <SearchIcon fill={colors.neutral_dark_5} />

            <View style={styles.inputView}>
              <TextInput
                ref={inputRef}
                placeholder={'Search'}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                placeholderTextColor={colors.neutral_dark_1}
                onFocus={() => {
                  setSearchToggle(true);
                }}
                onBlur={() => {
                  setSearchToggle(false);
                }}
              />
            </View>
          </Pressable>
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

      <Animated.View
        style={[
          styles.resultSesultContainer,
          recentSearchContainerAnimatedStyle,
        ]}>
        <View
          style={{
            // paddingHorizontal: 16,
            flex: 1,
          }}>
          {/* <AppText
            text={'Recent searches'}
            style={[styles.result, {paddingTop: 10}]}
            textTransform="uppercase"
            size="caption_m"
            color="neutral_dark_2"
          /> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            {[1, 2, 3, 4].map(el => (
              // <TouchableOpacity
              //   key={el}
              //   onPress={() => {
              //     setSearchToggle(false);
              //   }}
              //   style={styles.result}>
              //   <AppText text={'Alexandra'} />
              //   <TouchableOpacity hitSlop={detectTouch}>
              //     <CloseXSIcon />
              //   </TouchableOpacity>
              // </TouchableOpacity>
              <BillCard key={el} />
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
};
export default AnimatedTabHeader;
