/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import AppToast from './src/components/app-toast';
import MainNavigation from './src/navigation/main-navigation';
import {AppProvider} from './src/providers';
import {TimerProvider} from './src/providers/timer';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AppProvider>
        <TimerProvider>
          <Host>
            <MainNavigation />
          </Host>
        </TimerProvider>
        <AppToast />
      </AppProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({container: {flex: 1}});

export default App;
