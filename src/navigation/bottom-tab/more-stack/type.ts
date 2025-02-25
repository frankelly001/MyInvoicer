import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MoreStackParamList = {
  MORE: undefined;
  ESTIMATE: undefined;
  SALES_RECEIPT: undefined;
  PURCHASE_ORDERS: undefined;
  ITEMS: undefined;
  TIMESHEET: undefined;
  SETTINGS: undefined;
};

export type MoreScreenProps<T extends keyof MoreStackParamList> = {
  navigation: NativeStackNavigationProp<MoreStackParamList, T>;
  route: RouteProp<MoreStackParamList, T>;
};
