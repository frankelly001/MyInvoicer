// import {apiSlice} from '../store/rtkQuery/slices/apiSlice';
import {baseApi as api} from '../baseApi';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {Country, CountryStates} from '../../../types/Country';
import {countriesEndpoints} from './endpoints';

export const extendedApiSlice = api.injectEndpoints({
  endpoints: builder => ({
    getCountriesApi: builder.query<Country[], void>({
      query: () => countriesEndpoints.GET_COUNTRIES,
      providesTags: ['Countries'],
    }),
    getStatesApi: builder.mutation({
      query: (country: string) => ({
        url: countriesEndpoints.GET_COUNTRY_STATE,
        method: REQUEST_METHODS.POST,
        body: {
          country,
        },
      }),
      transformResponse: (response: {data: CountryStates}) => response,
      invalidatesTags: ['States'],
    }),
  }),
});

export const {useGetCountriesApiQuery, useGetStatesApiMutation} =
  extendedApiSlice;
