/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routesNames} from '../../routes';
import {
  Estimate,
  Items,
  More,
  PurchaseOrders,
  SalesReceipt,
  Settings,
  TimeSheet,
} from '../../../screens';
import {MoreStackParamList} from './type';

const {Navigator, Screen} = createNativeStackNavigator<MoreStackParamList>();

const MoreStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={routesNames.MORE} component={More} options={{}} />
      <Screen name={routesNames.ESTIMATE} component={Estimate} options={{}} />
      <Screen
        name={routesNames.SALES_RECEIPT}
        component={SalesReceipt}
        options={{}}
      />
      <Screen
        name={routesNames.PURCHASE_ORDERS}
        component={PurchaseOrders}
        options={{}}
      />
      <Screen name={routesNames.ITEMS} component={Items} options={{}} />
      <Screen name={routesNames.TIMESHEET} component={TimeSheet} options={{}} />
      <Screen name={routesNames.SETTINGS} component={Settings} options={{}} />
    </Navigator>
  );
};

export default MoreStack;
