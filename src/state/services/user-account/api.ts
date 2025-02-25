import {showToast} from '../../../components/app-toast';
import {HttpSuccessResponse} from '../../../types/ApiResponse';
import {AuthSuccess} from '../../../types/Authentication';
import {localStorage, logThis} from '../../../utils/helpers';
import {setUser} from '../../slices/auth/authSlice';
import {baseApi as api} from '../baseApi';
import {userDetailsEndpoints} from './endpoints';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getUserDetailsApi: build.query<
      Omit<HttpSuccessResponse<AuthSuccess>, 'token'>,
      void
    >({
      query: () => userDetailsEndpoints.GET_USER_DETAILS,
      providesTags: ['UserDetails'],
      onQueryStarted: (_, {dispatch, queryFulfilled}) => {
        queryFulfilled.then(({data}) => {
          const user = localStorage.get(localStorage.keys.USER);
          dispatch(setUser({...user, ...data.data}));
          localStorage.store(localStorage.keys.USER, {...user, ...data.data});
          showToast('INFO', {
            message: 'USER DON UPDATE OOO',
            title: 'Good job',
          });
          logThis('USER DON UPDATE OOO!!!', user?.token);
        });
      },
    }),
    deleteUserAccountApi: build.mutation<
      HttpSuccessResponse<AuthSuccess>,
      undefined
    >({
      query: () => ({
        url: userDetailsEndpoints.DELETE_USER_DETAILS,
        method: 'DELETE',
      }),
    }),
  }),
});
export {injectedRtkApi as userAccountApi};
export const {useGetUserDetailsApiQuery, useDeleteUserAccountApiMutation} =
  injectedRtkApi;
