import React, {FunctionComponent} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {
  ArrowRightIcon,
  BellIcon,
  ClockIcon,
  EstimateIcon,
  FileIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from '../../../../assets/svg';
import {
  AppHeader,
  AppScreen,
  AppTabTitleHeader,
  AppText,
} from '../../../../components';
import AppListButton from '../../../../components/app-list-button';
import {useColors} from '../../../../hooks/useColors';
import {routesNames} from '../../../../navigation/routes';
import {useGetAllNotificationsApiQuery} from '../../../../state/services/notification/api';
import {settingsStyles} from './styles';
import {GeneralScreenProps} from '../../../../navigation/types';

const More: FunctionComponent<GeneralScreenProps<'MORE'>> = ({navigation}) => {
  const colors = useColors();

  const documents = [
    {
      name: 'Estimate',
      Icon: <EstimateIcon stroke={colors.neutral_dark_5} />,
      onPress: () => navigation.navigate(routesNames.ESTIMATE),
    },
    {
      name: 'Sales receipt',
      onPress: () => navigation.navigate(routesNames.SALES_RECEIPT),
      Icon: <FileIcon stroke={colors.neutral_dark_5} />,
    },
    {
      name: 'Purchase Orders',
      onPress: () => navigation.navigate(routesNames.PURCHASE_ORDERS),
      Icon: <ShoppingCartIcon fill={colors.neutral_dark_5} />,
    },
  ];

  const others = [
    {
      name: 'Item',
      Icon: <ShoppingBagIcon fill={colors.neutral_dark_5} />,
      onPress: () => navigation.navigate(routesNames.ITEMS),
    },
    {
      name: 'Timesheet',
      Icon: <ClockIcon stroke={colors.neutral_dark_5} />,
      onPress: () => navigation.navigate(routesNames.TIMESHEET),
    },
  ];

  const {data} = useGetAllNotificationsApiQuery({filter: 'unread'});

  const styles = settingsStyles({colors});

  return (
    <AppScreen isScrollable={false}>
      <AppHeader onPressLeft={() => null} leftTitle="" />
      <AppTabTitleHeader
        screenTitle="More"
        rightContent={
          <View style={styles.headerRight}>
            <Pressable
              onPress={() => navigation.navigate(routesNames.SETTINGS)}>
              <SettingsIcon
                width={24}
                height={24}
                stroke={colors.neutral_dark_4}
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(routesNames.NOTIFICATIONS)}>
              <BellIcon stroke={colors.neutral_dark_4} />
              {data?.totalDataCount ? (
                <View style={styles.notification}>
                  <AppText
                    text={data?.totalDataCount}
                    numberOfLines={1}
                    type="caption_m"
                    color="neutral_light_1"
                    align="center"
                  />
                </View>
              ) : null}
            </Pressable>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.optionsContainer}>
          <AppListButton
            disabled
            title={'DOCUMENTS'}
            titleSize="caption_m"
            titleColor="neutral_dark_2"
          />
          {documents.map((item, i) => {
            return (
              <AppListButton
                onPress={item.onPress}
                key={i}
                title={item.name}
                RightIcon={<ArrowRightIcon fill={colors.neutral_dark_1} />}
                borderType={'Bottom'}
                LeftIcon={item.Icon}
              />
            );
          })}
        </View>
        <View style={[styles.optionsContainer, styles.otherContainer]}>
          <AppListButton
            disabled
            title={'OTHERS'}
            titleSize="caption_m"
            titleColor="neutral_dark_2"
          />
          {others.map((item, i) => {
            return (
              <AppListButton
                onPress={item.onPress}
                key={i}
                title={item.name}
                RightIcon={<ArrowRightIcon fill={colors.neutral_dark_1} />}
                borderType={'Bottom'}
                LeftIcon={item.Icon}
              />
            );
          })}
        </View>
      </ScrollView>
    </AppScreen>
  );
};

export default More;
