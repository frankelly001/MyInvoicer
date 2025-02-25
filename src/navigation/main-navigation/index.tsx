import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routesNames} from '../routes';
import AuthStack from '../auth-stack';
import React from 'react';
import BottomTab from '../bottom-tab';
import {
  AddBusiness,
  CreateCustomer,
  CreateEstimate,
  CreateInvoice,
  CustomerDetails,
  PreviewInvoice,
  PaymentMethod,
  PaymentPlan,
  Notifications,
  CreateSalesReceipt,
  CreatePurchaseOrder,
  PreviewEstimate,
  PreviewPurchaseOrder,
  PreviewSalesReceipt,
  Profile,
  BusinessDetails,
  EditInvoice,
  EditEstimate,
  EditCustomer,
  EditPurchaseOrder,
  EditSalesReceipt,
  EditBusiness,
} from '../../screens';
import {RootStackParamList} from './types';
import {useSelector} from 'react-redux';
import {authState} from '../../state/slices/auth/authSlice';
import {navigationTheme} from '../theme';
import {navigationRef} from '../rootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useColors} from '../../hooks/useColors';
import MyBusiness from '../../screens/bottom-tabs/more-tab/my-business';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  const {user} = useSelector(authState);
  const colors = useColors();

  return (
    <NavigationContainer theme={navigationTheme({colors})} ref={navigationRef}>
      <Navigator screenOptions={{headerShown: false}}>
        {!user?.hasAddedBusiness ? (
          <Screen
            name={routesNames.AUTH_STACK}
            component={AuthStack}
            options={{}}
          />
        ) : (
          <>
            <Screen
              name={routesNames.BOTTOM_TAB}
              component={BottomTab}
              options={{}}
            />
            <Screen
              name={routesNames.CUSTOMER_DETAILS}
              component={CustomerDetails}
              options={{}}
            />
            <Screen
              name={routesNames.BUSINESS_DETAILS}
              component={BusinessDetails}
              options={{}}
            />
            <Screen
              name={routesNames.PROFILE}
              component={Profile}
              options={{}}
            />
            <Screen
              name={routesNames.MY_BUSINESS}
              component={MyBusiness}
              options={{}}
            />
            <Screen
              name={routesNames.CREATE_CUSTOMER}
              component={CreateCustomer}
              options={{}}
            />
            <Screen
              name={routesNames.EDIT_CUSTOMER}
              component={EditCustomer}
              options={{}}
            />
            <Screen
              name={routesNames.CREATE_INVOICE}
              component={CreateInvoice}
              options={{}}
            />
            <Screen
              name={routesNames.EDIT_INVOICE}
              component={EditInvoice}
              options={{}}
            />
            <Screen
              name={routesNames.CREATE_ESTIMATE}
              component={CreateEstimate}
              options={{}}
            />
            <Screen
              name={routesNames.EDIT_ESTIMATE}
              component={EditEstimate}
              options={{}}
            />
            <Screen
              name={routesNames.CREATE_SALES_RECEIPT}
              component={CreateSalesReceipt}
              options={{}}
            />
            <Screen
              name={routesNames.EDIT_SALES_RECEIPT}
              component={EditSalesReceipt}
              options={{}}
            />
            <Screen
              name={routesNames.CREATE_PURCHASE_ORDER}
              component={CreatePurchaseOrder}
              options={{animation: 'slide_from_right'}}
            />
            <Screen
              name={routesNames.EDIT_PURCHASE_ORDER}
              component={EditPurchaseOrder}
              options={{animation: 'slide_from_right'}}
            />
            <Screen
              name={routesNames.PREVIEW_INVOICE}
              component={PreviewInvoice}
              options={{animation: 'slide_from_right'}}
            />
            <Screen
              name={routesNames.PREVIEW_ESTIMATE}
              component={PreviewEstimate}
              options={{}}
            />
            <Screen
              name={routesNames.PREVIEW_PURCHASE_ORDER}
              component={PreviewPurchaseOrder}
              options={{}}
            />
            <Screen
              name={routesNames.PREVIEW_SALES_RECEIPT}
              component={PreviewSalesReceipt}
              options={{}}
            />
            <Screen
              name={routesNames.ADD_BUSINESS}
              component={AddBusiness}
              options={{}}
            />
            <Screen
              name={routesNames.EDIT_BUSINESS}
              component={EditBusiness}
              options={{}}
            />

            <Screen
              name={routesNames.PAYMENT_METHOD}
              component={PaymentMethod}
              options={{}}
            />
            <Screen
              name={routesNames.PAYMENT_PLAN}
              component={PaymentPlan}
              options={{}}
            />
            <Screen
              name={routesNames.NOTIFICATIONS}
              component={Notifications}
              options={{}}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
