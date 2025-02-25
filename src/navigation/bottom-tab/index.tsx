/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {Fragment} from 'react';
import {Pressable, View} from 'react-native';
import {
  CreateIcon,
  CustomersIcon,
  DashBoardIcon,
  InvoiceIcon,
  MoreIcon,
} from '../../assets/svg';
import {typography} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import {useSheet} from '../../hooks/useSheet';
import {CreateSheet, Customers, DashBoard, Invoice} from '../../screens';
import {routesNames} from '../routes';
import MoreStack from './more-stack';
import {bottomTabStyles} from './styles';
import {BottomTabParamList} from './type';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const colors = useColors();

  const {
    sheetRef: createSheetRef,
    openSheet: openCreateSheet,
    closeSheet: closeCreateSheet,
  } = useSheet();

  const styles = bottomTabStyles({colors});

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarLabelStyle: {marginBottom: 3, ...typography.body_xs},
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.neutral_light_1,
            bottom: 5,
            shadowColor: 'transparent',
            borderTopWidth: 0.5,
            borderTopColor: colors.neutral_light_4,
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.highlight_5,
          tabBarInactiveTintColor: colors.neutral_dark_4,
        }}>
        <Tab.Screen
          name={routesNames.DASHBOARD}
          component={DashBoard}
          options={{
            title: 'Dashboard',
            tabBarIcon: ({color}) => <DashBoardIcon fill={color} />,
          }}
        />
        <Tab.Screen
          name={routesNames.INVOICE}
          component={Invoice}
          options={{
            title: 'Invoice',
            tabBarIcon: ({color}) => <InvoiceIcon fill={color} />,
          }}
        />
        <Tab.Screen
          name={routesNames.CREATE}
          component={Fragment}
          options={{
            tabBarButton: () => (
              <Pressable
                onPress={openCreateSheet}
                style={styles.tabBtnContainer}>
                <View style={styles.createTabBtn}>
                  <CreateIcon />
                </View>
              </Pressable>
            ),
          }}
        />
        <Tab.Screen
          name={routesNames.CUSTOMERS}
          component={Customers}
          options={{
            title: 'Customers',
            tabBarIcon: ({color}) => <CustomersIcon stroke={color} />,
          }}
        />
        <Tab.Screen
          name={routesNames.MORE_STACK}
          component={MoreStack}
          options={{
            title: 'More',
            tabBarIcon: ({color}) => <MoreIcon fill={color} />,
          }}
        />
      </Tab.Navigator>

      <CreateSheet sheetRef={createSheetRef} closeSheet={closeCreateSheet} />
    </>
  );
};

export default BottomTab;
