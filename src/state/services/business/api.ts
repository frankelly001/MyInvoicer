import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {Business} from '../../../types/Business';
import {baseApi as api} from '../baseApi';
import {businessEndpoints} from './endpoints';
import {
  CreateBusinessPayloadApiArg,
  DeactivateBusinessPayloadApiArg,
  GetAllBusinessByIdPayloadApiArg,
  GetAllBusinessesPayloadApiArg,
  UpdateBusinessPayloadApiArg,
} from './type';
import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {store} from '../../slices/store';

const businessAdapter = createEntityAdapter({
  selectId: (item: Business) => item.id,
});

const businessSelector = businessAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    createBusinessApi: build.mutation<
      HttpSuccessResponse<Business>,
      CreateBusinessPayloadApiArg
    >({
      query: queryArg => ({
        url: businessEndpoints.CREATE_BUSINESS,
        method: REQUEST_METHODS.POST,
        body: queryArg.createBusiness,
      }),
      invalidatesTags: ['Business'],
      onQueryStarted: (_, {dispatch, queryFulfilled}) => {
        const {businessApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllBusinessesApi',
              businessApiListParams,
              draft => {
                const state = {
                  entities: {...draft.data.entities, [data.data.id]: data.data},
                  ids: [data.data.id, ...draft.data.ids],
                } as EntityState<Business>;
                businessAdapter.setAll(
                  draft.data,
                  businessSelector.selectAll(state),
                );
              },
            ),
          );
        });
      },
    }),
    updateBusinessApi: build.mutation<
      HttpSuccessResponse<null>,
      UpdateBusinessPayloadApiArg
    >({
      query: queryArg => ({
        url: businessEndpoints.UPDATE_BUSINESS,
        method: REQUEST_METHODS.PATCH,
        body: queryArg.updateBusiness ?? queryArg?.updateBusinessSettings,
      }),
      invalidatesTags: ['Business'],
      onQueryStarted: (
        {updateBusiness, updateBusinessSettings},
        {queryFulfilled, dispatch},
      ) => {
        const {businessApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllBusinessesApi',
              businessApiListParams,
              draft => {
                if (updateBusiness) {
                  businessAdapter.updateOne(draft.data, {
                    id: updateBusiness?.businessId,
                    changes: updateBusiness,
                  });
                }
                if (updateBusinessSettings) {
                  businessAdapter.updateOne(draft.data, {
                    id: updateBusinessSettings?.businessId,
                    changes: updateBusinessSettings,
                  });
                }
              },
            ),
          );
        });
      },
    }),
    getAllBusinessesApi: build.query<
      RtkSuccessResponse<EntityState<Business>>,
      GetAllBusinessesPayloadApiArg
    >({
      query: (queryArg = {page: 1}) => ({
        url: businessEndpoints.GET_ALL_BUSINESSES,
        params: queryArg,
      }),
      transformResponse: (response: RtkSuccessResponse<Business[]>) => {
        const data = businessAdapter.addMany(
          businessAdapter.getInitialState(),
          response.data,
        );
        return {
          ...response,
          data,
        };
      },
      forceRefetch: ({currentArg, previousArg}) => {
        return (currentArg?.page ?? 1) !== (previousArg?.page ?? 1);
      },
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentState, incomingState) => {
        businessAdapter.addMany(
          currentState.data,
          businessSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    getAllBusinessByIdApi: build.query<
      Business,
      GetAllBusinessByIdPayloadApiArg
    >({
      query: queryArg => ({
        url: businessEndpoints.GET_BUSINESS_BY_ID,
        params: {
          businessId: queryArg.businessId,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Business>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Business', id: queryArg.businessId},
      ],
    }),
    deactivateBusinessApi: build.mutation<
      HttpSuccessResponse<null>,
      DeactivateBusinessPayloadApiArg
    >({
      query: queryArg => ({
        url: businessEndpoints.DEACTIVATE_BUSINESS,
        method: REQUEST_METHODS.POST,
        body: queryArg.deactivateBusiness,
      }),
      invalidatesTags: ['Business'],
      onQueryStarted: async (
        {deactivateBusiness},
        {dispatch, queryFulfilled},
      ) => {
        const {businessApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllBusinessesApi',
              businessApiListParams,
              draft => {
                businessAdapter.removeOne(
                  draft.data,
                  deactivateBusiness.businessId,
                );
              },
            ),
          );
        });
      },
    }),
  }),
});
export {injectedRtkApi as businessApi};
export {businessAdapter, businessSelector};
export const {
  useCreateBusinessApiMutation,
  useGetAllBusinessesApiQuery,
  useGetAllBusinessByIdApiQuery,
  useDeactivateBusinessApiMutation,
  useUpdateBusinessApiMutation,
} = injectedRtkApi;
