/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routesNames} from '../routes';
import {
  BusinessInfo,
  ForgotPassword,
  Onboarding,
  Signin,
  Signup,
  Verify,
} from '../../screens';
import {AuthStackParamList} from './type';
import {useSelector} from 'react-redux';
import {authState} from '../../state/slices/auth/authSlice';

const {Navigator, Screen} = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const {user} = useSelector(authState);
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {user && !user?.hasAddedBusiness ? (
        <Screen name={routesNames.BUSINESS_INFO_REG} component={BusinessInfo} />
      ) : (
        <>
          <Screen name={routesNames.ONBOARDING} component={Onboarding} />
          <Screen name={routesNames.SIGNIN} component={Signin} />
          <Screen name={routesNames.SIGNUP} component={Signup} />
          <Screen name={routesNames.VERIFY} component={Verify} />
          <Screen
            name={routesNames.FORGOT_PASSWORD}
            component={ForgotPassword}
          />
        </>
      )}
    </Navigator>
  );
};

export default AuthStack;
