/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Animated as RNAnimated,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SCREEN_HEIGHT, isIOS} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import AppHeader from '../app-header';
import AppSearchInput from '../app-search-input';
import AppTabTitleHeader from '../app-tab-title-header';
import AppText from '../app-text';
import AnimatedHeaderContent from './animated-header-content';
import {animatedHeaderStyles} from './styles';
import {AnimatedTabHeaderProps} from './types';

const AnimatedTabHeader = <ItemT,>({
  screenTitle = 'Title',
  translateY = 0,
  rightTitle,
  onPressRight,
  scrollHeaderContent,
  screenRightContent,
  screenOnPressRight,
  search,
  ...headerProps
}: AnimatedTabHeaderProps<ItemT>) => {
  const colors = useColors();
  const [searchToggle, setSearchToggle] = useState(false);
  const styles = animatedHeaderStyles({colors, searchToggle});

  const recentSearchContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      minHeight: withTiming(searchToggle ? SCREEN_HEIGHT : 0),
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

  return useMemo(
    () => (
      <>
        <Animated.View
          style={[
            {zIndex: !searchToggle ? 2 : 1},
            headerContainerAnimatedStyle,
          ]}>
          <View>
            <AppHeader
              rightTitle={rightTitle}
              onPressRight={onPressRight}
              {...headerProps}
            />
            {scrollHeaderContent && (
              <AnimatedHeaderContent
                containerStyle={{position: 'absolute'}}
                translateY={translateY}>
                {scrollHeaderContent}
              </AnimatedHeaderContent>
            )}
          </View>
        </Animated.View>
        <RNAnimated.View
          style={[
            styles.animatedHiddenHeader,
            {
              transform: [
                {
                  translateY: RNAnimated.multiply(
                    translateY,
                    searchToggle ? 0 : 1,
                  ),
                },
              ],
            },
          ]}>
          <Animated.View style={headerContainerAnimatedStyle}>
            <AppTabTitleHeader
              screenTitle={screenTitle}
              rightContent={screenRightContent}
              onPressRight={screenOnPressRight}
            />
          </Animated.View>

          <Animated.View
            style={[styles.searchContainer, inputContainerAnimatedStyle]}>
            <Animated.View style={inputAnimatedStyle}>
              <AppSearchInput
                inputRef={inputRef}
                placeholder={'Search'}
                value={search?.searchText}
                onChangeText={search?.onChangeSearchText}
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
                <TouchableOpacity
                  style={{paddingVertical: 12}}
                  onPress={() => {
                    setSearchToggle(false);
                    if (search?.onChangeSearchText) {
                      search?.onChangeSearchText('');
                    }
                  }}>
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
          <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            style={{flex: 1}}>
            <FlatList
              ListEmptyComponent={
                search?.isSearching ? (
                  <ActivityIndicator size={50} color={colors.highlight_5} />
                ) : undefined
              }
              data={search?.searchResultData}
              keyboardShouldPersistTaps="handled"
              keyExtractor={search?.searchResultKeyExtractor}
              contentContainerStyle={{paddingBottom: 220}}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem =>
                search?.renderSearchResultItem
                  ? search.renderSearchResultItem(renderItem, setSearchToggle)
                  : null
              }
            />
          </KeyboardAvoidingView>
        </Animated.View>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headerContainerAnimatedStyle],
  );
};

export default AnimatedTabHeader;

// import React, {
//   FunctionComponent,
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
// } from 'react';
// import {
//   Animated,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Easing,
// } from 'react-native';
// import {SCREEN_HEIGHT} from '../../config/const';
// import {invoices} from '../../dummydata/invoices';
// import {useColors} from '../../hooks/useColors';
// import AppHeader from '../app-header';
// import AppSearchInput from '../app-search-input';
// import AppTabTitleHeader from '../app-tab-title-header';
// import AppText from '../app-text';
// import BillCard from '../bill-card';
// import AnimatedHeaderContent from './animated-header-content';
// import {animatedHeaderStyles} from './styles';
// import {AnimatedTabHeaderProps} from './types';

// const AnimatedTabHeader: FunctionComponent<AnimatedTabHeaderProps> = ({
//   screenTitle = 'Title',
//   value,
//   onChangeText,
//   translateY = 0,
//   rightContent,
//   rightTitle,
//   onPressRight,
//   scrollHeaderContent,
//   screenRightContent,
//   screenOnPressRight,
//   ...headerProps
// }) => {
//   const colors = useColors();
//   const [searchToggle, setSearchToggle] = useState(false);
//   const styles = useMemo(
//     () => animatedHeaderStyles({colors, searchToggle}),
//     [colors, searchToggle],
//   );

//   const searchToggleAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(searchToggleAnim, {
//       toValue: searchToggle ? 1 : 0,
//       duration: 500,
//       useNativeDriver: false,
//       easing: Easing.inOut(Easing.ease),
//     }).start();
//   }, [searchToggle]);

//   const recentSearchContainerAnimatedStyle = {
//     minHeight: searchToggleAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, SCREEN_HEIGHT],
//     }),
//   };

//   const headerContainerAnimatedStyle = {
//     maxHeight: searchToggleAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [500, 0],
//     }),
//   };

//   const inputContainerAnimatedStyle = {
//     paddingHorizontal: searchToggleAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [16, 22],
//     }),
//   };

//   const inputAnimatedStyle = {
//     flex: searchToggleAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, 0.83],
//     }),
//   };

//   const cancelAnimatedStyle = {
//     right: searchToggleAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [50, 24],
//     }),
//     opacity: searchToggleAnim,
//   };

//   const inputRef = useRef<TextInput>(null);

//   useEffect(() => {
//     if (searchToggle) {
//       inputRef.current?.focus();
//     } else {
//       inputRef.current?.blur();
//     }
//   }, [searchToggle]);

//   const handleFocus = useCallback(() => {
//     setSearchToggle(true);
//   }, []);

//   const handleBlur = useCallback(() => {
//     setSearchToggle(false);
//   }, []);

//   const handlePress = useCallback(() => {
//     setSearchToggle(false);
//   }, []);

//   return (
//     <>
//       <Animated.View
//         style={[{zIndex: !searchToggle ? 2 : 1}, headerContainerAnimatedStyle]}>
//         <View>
//           <AppHeader
//             rightContent={rightContent}
//             rightTitle={rightTitle}
//             onPressRight={onPressRight}
//             {...headerProps}
//           />
//           {scrollHeaderContent && (
//             <AnimatedHeaderContent
//               containerStyle={{position: 'absolute'}}
//               translateY={translateY}>
//               {scrollHeaderContent}
//             </AnimatedHeaderContent>
//           )}
//         </View>
//       </Animated.View>
//       <Animated.View
//         style={[
//           styles.animatedHiddenHeader,
//           {
//             transform: [
//               {
//                 translateY: Animated.multiply(translateY, searchToggle ? 0 : 1),
//               },
//             ],
//           },
//         ]}>
//         <Animated.View style={headerContainerAnimatedStyle}>
//           <AppTabTitleHeader
//             screenTitle={screenTitle}
//             rightContent={screenRightContent}
//             onPressRight={screenOnPressRight}
//           />
//         </Animated.View>

//         <Animated.View
//           style={[styles.searchContainer, inputContainerAnimatedStyle]}>
//           <Animated.View style={inputAnimatedStyle}>
//             <AppSearchInput
//               inputRef={inputRef}
//               placeholder={'Search'}
//               value={value}
//               onChangeText={onChangeText}
//               onFocus={handleFocus}
//               onBlur={handleBlur}
//             />
//           </Animated.View>

//           <Animated.View
//             style={[{zIndex: -1, position: 'absolute'}, cancelAnimatedStyle]}>
//             <View style={{paddingLeft: 8}}>
//               <TouchableOpacity onPress={handlePress}>
//                 <AppText text={'Cancel'} type="body_m" />
//               </TouchableOpacity>
//             </View>
//           </Animated.View>
//         </Animated.View>
//       </Animated.View>

//       <Animated.View
//         style={[
//           styles.resultSesultContainer,
//           recentSearchContainerAnimatedStyle,
//         ]}>
//         <View
//           style={{
//             flex: 1,
//           }}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="always"
//             contentContainerStyle={{paddingBottom: 220}}>
//             {invoices.map(el => (
//               <BillCard
//                 key={el.invoiceId}
//                 currency="$"
//                 price="2000"
//                 enableSwipe={false}
//               />
//             ))}
//           </ScrollView>
//         </View>
//       </Animated.View>
//     </>
//   );
// };
// export default AnimatedTabHeader;
