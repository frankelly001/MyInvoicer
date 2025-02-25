import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import localStorage from '../../utils/helpers/localStorage';
import {API_BASE_URL} from '@env';
import {authEndpoints} from './auth/endpoints';
import {AuthSuccess, RefreshTokenPayload} from '../../types/Authentication';
import {HttpAuthSuccessResponse} from '../../types/ApiResponse';
import {logOut} from '../slices/auth/authSlice';
import {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders(headers) {
    const authPayload = localStorage.get(localStorage.keys.ACCESS_TOKEN);
    if (authPayload?.accessToken) {
      headers.set('Authorization', `Bearer ${authPayload.accessToken}`);
    }
    return headers;
  },
});

export const getRefreshToken = async (
  authPayload: RefreshTokenPayload | null,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  // try to get a new token
  const tokenRefreshResult = (await baseQuery(
    {
      url: authEndpoints.REFRESH_TOKEN,
      body: {refToken: authPayload?.refreshToken},
      method: 'POST',
    },
    api,
    extraOptions,
  )) as QueryReturnValue<
    HttpAuthSuccessResponse<AuthSuccess>,
    FetchBaseQueryError,
    any
  >;

  if (tokenRefreshResult?.data) {
    const accessTokenExpirationTime = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1hr

    const authorizationPayload = {
      accessToken: tokenRefreshResult?.data?.token,
      refreshToken: tokenRefreshResult?.data?.data?.refreshToken,
      expiresAt: accessTokenExpirationTime.getTime(),
    };

    // store the new token
    localStorage.store(localStorage.keys.ACCESS_TOKEN, authorizationPayload);
  }

  return tokenRefreshResult;
};

const initializeApiCall: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

// const abpBaseQuery: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const authPayload: RefreshTokenPayload | null = localStorage.get(
//     localStorage.keys.ACCESS_TOKEN,
//   );

//   const currentDateTime = new Date(Date.now()).getTime();

//   if (authPayload && authPayload?.expiresAt <= currentDateTime) {
//     const tokenRefreshResult = await getRefreshToken(
//       authPayload,
//       api,
//       extraOptions,
//     );

//     logThis(
//       'tokenRefreshResult===',
//       tokenRefreshResult,
//       tokenRefreshResult.meta.response.status,
//     );

//     if (tokenRefreshResult?.data?.data) {
//       return await initializeApiCall(args, api, extraOptions);
//     } else {
//       if (
//         tokenRefreshResult?.meta?.response?.status === 422 ||
//         tokenRefreshResult?.meta?.response?.status === 401 ||
//         tokenRefreshResult?.meta?.response?.status === 403
//       ) {
//         // api.dispatch(logOut());
//         // api.dispatch(baseApi.util.resetApiState());
//         return tokenRefreshResult;
//       }
//     }
//   }

//   return await initializeApiCall(args, api, extraOptions);
// };

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const abpBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const authPayload: RefreshTokenPayload | null = localStorage.get(
    localStorage.keys.ACCESS_TOKEN,
  );

  const currentDateTime = new Date(Date.now()).getTime();

  if (authPayload && authPayload?.expiresAt <= currentDateTime) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({resolve, reject});
      })
        .then(token => {
          if (typeof args !== 'string' && args.headers instanceof Headers) {
            args.headers.set('Authorization', `Bearer ${token}`);
          }
          return baseQuery(args, api, extraOptions);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }

    isRefreshing = true;

    const tokenRefreshResult = await getRefreshToken(
      authPayload,
      api,
      extraOptions,
    );

    if (tokenRefreshResult?.data?.data) {
      isRefreshing = false;
      processQueue(null, tokenRefreshResult?.data?.token);
      return await initializeApiCall(args, api, extraOptions);
    } else {
      if (
        tokenRefreshResult?.meta?.response?.status === 422 ||
        tokenRefreshResult?.meta?.response?.status === 401 ||
        tokenRefreshResult?.meta?.response?.status === 403
      ) {
        isRefreshing = false;
        api.dispatch(logOut());
        api.dispatch(baseApi.util.resetApiState());
        const error = 'Unable to refresh token';
        processQueue(error, null);
        return Promise.reject(error);
      }
    }
  }

  return await initializeApiCall(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: abpBaseQuery,
  tagTypes: [
    'Invoice',
    'Customer',
    'Setting',
    'UserDetails',
    'Countries',
    'States',
    'Estimate',
    'Notification',
    'Business',
    'Item',
    'Receipt',
    'Order',
    'Billings',
    'TimeSheet',
    'Auth',
  ],
  endpoints: () => ({}),
});
