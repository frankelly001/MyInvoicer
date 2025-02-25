import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './main-navigation/types';
import {AuthStackParamList} from './auth-stack/type';
import {MoreStackParamList} from './bottom-tab/more-stack/type';
import {BottomTabParamList} from './bottom-tab/type';

export type RootNavProp = NativeStackNavigationProp<RootStackParamList>;

export type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;

export type MoreNavProp = NativeStackNavigationProp<MoreStackParamList>;

export type BottomTabNavProp = NativeStackNavigationProp<BottomTabParamList>;

export type GeneralNavProp = NavigationProp<ReactNavigation.RootParamList>;

export type GeneralScreenProps<T extends keyof ReactNavigation.RootParamList> =
  {
    navigation: NavigationProp<ReactNavigation.RootParamList, T>;
    route: RouteProp<Omit<ReactNavigation.RootParamList, ''>, T>;
  };

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends BottomTabParamList,
        RootStackParamList,
        AuthStackParamList,
        MoreStackParamList {}
  }
}
