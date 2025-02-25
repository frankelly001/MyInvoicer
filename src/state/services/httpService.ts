import axios from 'axios';
import {API_BASE_URL} from '@env';
import localStorage from '../../utils/helpers/localStorage';
import {authEndpoints} from './auth/endpoints';

const createApi = axios.create({baseURL: API_BASE_URL});

export const httpService = () => {
  const {get, keys, remove, store} = localStorage;
  let authPayload = get(keys.ACCESS_TOKEN);

  createApi.defaults.headers.common.authorization = `Bearer ${authPayload.accessToken}`;

  createApi.interceptors.response.use(
    response => {
      return response?.data;
    },
    async error => {
      const originalRequest = error.config;
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Assuming refreshToken is a function that refreshes the token
        const {data: tokenRefreshResult} = await refreshToken(
          authPayload.data.refreshToken,
        );

        if (tokenRefreshResult) {
          const accessTokenExpirationTime = new Date(
            Date.now() + 1 * 60 * 60 * 1000,
          );
          const authorizationPayload = {
            accessToken: tokenRefreshResult.token,
            refreshToken: tokenRefreshResult.data.refreshToken,
            expiresAt: accessTokenExpirationTime.getTime(),
          };
          store(keys.ACCESS_TOKEN, authorizationPayload);

          createApi.defaults.headers.common.authorization = `Bearer ${tokenRefreshResult.token}`;
          originalRequest.headers.authorization = `Bearer ${tokenRefreshResult.token}`;
          return createApi(originalRequest);
        }
      }

      if (error?.response?.status === 403) {
        //TODO: redirect on logout
        remove(keys.ACCESS_TOKEN);
        remove(keys.USER);
      }

      throw error?.response?.data;
    },
  );

  return createApi;
};

const refreshToken = async (refToken: string) => {
  return await createApi.post(authEndpoints.REFRESH_TOKEN, refToken);
};
