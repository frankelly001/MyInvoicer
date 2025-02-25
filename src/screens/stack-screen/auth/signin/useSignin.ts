import {useDispatch} from 'react-redux';
import {showToast} from '../../../../components/app-toast';
import {useResponseHandler} from '../../../../hooks/useRequestHandler';
import {routesNames} from '../../../../navigation/routes';
import {useLoginApiMutation} from '../../../../state/services/auth/api';
import {setUser} from '../../../../state/slices/auth/authSlice';
import {getErrorMessage, localStorage} from '../../../../utils/helpers';
import {SigninSchemaType} from './schema';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../../../navigation/auth-stack/type';

export const useSignin = () => {
  const [login, {isError, isLoading, isSuccess, reset, data, error}] =
    useLoginApiMutation();

  const dispatch = useDispatch();
  const navigation = useNavigation<AuthNavigationProps<'SIGNIN'>>();

  useResponseHandler({
    success: {
      value: isSuccess,
      trigger: () => {
        showToast('SUCCESS', {
          title: 'Login success',
          message: data?.message,
        });
        if (!data?.token && data?.data?.id) {
          navigation.replace(routesNames.VERIFY, {
            accountID: data?.data?.id,
            email: data?.data?.email,
          });
        }
      },
    },
    error: {
      value: isError,
      trigger: () => {
        showToast('ERROR', {
          title: 'Error encounted!',
          message: getErrorMessage(error),
        });
      },
    },
    reset,
  });

  const submit = async (values: SigninSchemaType) => {
    const response = await login({
      login: values,
    }).unwrap();

    if (response?.token && response?.data?.refreshToken) {
      const accessTokenExpirationTime = new Date(
        Date.now() + 1 * 60 * 60 * 1000,
      ); // expires in 1hr
      const authorizationPayload = {
        accessToken: response.token,
        refreshToken: response.data.refreshToken,
        expiresAt: accessTokenExpirationTime.getTime(),
      };
      const userInfo = {
        ...response?.data,
        token: response.token,
      };

      localStorage.store(localStorage.keys.ACCESS_TOKEN, authorizationPayload);
      localStorage.store(localStorage.keys.USER, userInfo);
      dispatch(setUser(userInfo));
    }
  };

  return {submit, isLoading};
};
