import {StripeProvider} from '@stripe/stripe-react-native';
import React, {FunctionComponent, ReactNode, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useGetUserDetailsApiQuery} from '../state/services/user-account/api';
import {setUser} from '../state/slices/auth/authSlice';
import {setColorMode} from '../state/slices/colors/colorsSlice';
import localStorage from '../utils/helpers/localStorage';

const AppProvider: FunctionComponent<{children: ReactNode}> = ({children}) => {
  const dispatch = useDispatch();

  const [init, setInit] = useState(false);

  useGetUserDetailsApiQuery();

  useEffect(() => {
    const mode = localStorage.get(localStorage.keys.COLOR_MODE);
    if (mode) {
      dispatch(setColorMode(mode));
    }
    const storedUser = localStorage.get(localStorage.keys.USER);
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
    setInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!init) {
    return <></>;
  }
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51NQ6imErGQbMXNZYrWeBZBzLQba86017VaHn1WdsW2M0A3SgV8DyAXxibuErsU5uoVF6rwIDidKmWn14ChLPRTjD00wDQfdYuH'
      }
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.com.delcarim">
      <>{children}</>
    </StripeProvider>
  );
};
export default AppProvider;
