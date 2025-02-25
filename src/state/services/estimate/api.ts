import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {baseApi as api} from '../baseApi';
import {estimateEndpoints} from './endpoints';
import {providesList} from '../../../utils/helpers';
import {generalEndpoints} from '../general/endpoints';
import {
  AcceptOrDeclineEstimate,
  Estimate,
  EstimateMetrics,
} from '../../../types/Estimates';
import {
  CommonEstimatePayloadApiArg,
  CreateEstimatePayloadApiArg,
  DeleteMultipleEstimatePayloadApiArg,
  GetEstimateByStatusPayloadApiArg,
  UpdateEstimatePayloadApiArg,
} from './type';
import {
  GeneralSearchRecordArg,
  GetAllRecordsByOldestOrNewestPayloadApiArg,
  GetAllRecordsPayloadApiArg,
} from '../general/type';
import {EstimateStatusTypes} from '../../../utils/constants/status';
import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {store} from '../../slices/store';

const type = 'estimate';

const estimateAdapter = createEntityAdapter({
  selectId: (item: Estimate) => item.id,
});

const estimateSelector = estimateAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    searchEstimateApi: build.query<Estimate[], GeneralSearchRecordArg>({
      query: queryArg => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {type, ...queryArg},
      }),
      transformResponse: (response: HttpSuccessResponse<Estimate[]>) =>
        response.data,
    }),
    createEstimateApi: build.mutation<
      HttpSuccessResponse<Estimate>,
      CreateEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: estimateEndpoints.CREATE_ESTIMATE,
        method: REQUEST_METHODS.POST,
        body: queryArg.createEstimate,
      }),
      invalidatesTags: ['Estimate'],
      onQueryStarted: (_, {dispatch, queryFulfilled}) => {
        const {estimateApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllEstimatesApi',
              estimateApiListParams.sent,
              draft => {
                const state = {
                  entities: {...draft.data.entities, [data.data.id]: data.data},
                  ids: [data.data.id, ...draft.data.ids],
                } as EntityState<Estimate>;
                estimateAdapter.setAll(
                  draft.data,
                  estimateSelector.selectAll(state),
                );
              },
            ),
          );
        });
      },
    }),
    updateEstimateApi: build.mutation<
      HttpSuccessResponse<Estimate>,
      UpdateEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: estimateEndpoints.UPDATE_ESTIMATE,
        method: REQUEST_METHODS.PATCH,
        body: queryArg.updateEstimate,
      }),
      invalidatesTags: (_, _error, arg) => [
        {type: 'Estimate', id: arg?.updateEstimate.estimateId},
      ],
      onQueryStarted({updateEstimate}, {queryFulfilled, dispatch}) {
        const {estimateApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllEstimatesApi',
              estimateApiListParams.sent,
              draft => {
                estimateAdapter.updateOne(draft.data, {
                  id: updateEstimate.estimateId,
                  changes: data.data,
                });
              },
            ),
          );
        });
      },
    }),
    convertAcceptedEstimateToInvoiceApi: build.mutation<
      HttpSuccessResponse<Estimate>,
      CommonEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: estimateEndpoints.CONVERT_ACCEPTED_ESTIMATE_TO_INVOICE,
        method: REQUEST_METHODS.POST,
        body: queryArg,
      }),
      onQueryStarted({estimateId}, {queryFulfilled, dispatch}) {
        const {estimateApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllEstimatesApi',
              estimateApiListParams.sent,
              draft => {
                estimateAdapter.updateOne(draft.data, {
                  id: estimateId,
                  changes: data.data,
                });
              },
            ),
          );
        });
      },
    }),
    acceptOrDeclineEstimateApi: build.mutation<
      HttpSuccessResponse<Estimate>,
      AcceptOrDeclineEstimate
    >({
      query: queryArg => ({
        url: estimateEndpoints.ACCEPTED_OR_DECLINE_ESTIMATE,
        method: REQUEST_METHODS.POST,
        body: queryArg,
      }),
      onQueryStarted({estimateId}, {queryFulfilled, dispatch}) {
        const {estimateApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllEstimatesApi',
              estimateApiListParams.sent,
              draft => {
                estimateAdapter.updateOne(draft.data, {
                  id: estimateId,
                  changes: data.data,
                });
              },
            ),
          );
        });
      },
    }),
    getAllEstimatesApi: build.query<
      RtkSuccessResponse<EntityState<Estimate>>,
      GetAllRecordsPayloadApiArg<EstimateStatusTypes>
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          page: queryArg.page,
          type,
          ...(queryArg.recordStatus && {recordStatus: queryArg.recordStatus}),
          ...(queryArg.filter && {filter: queryArg.filter}),
        },
      }),

      transformResponse: (response: RtkSuccessResponse<Estimate[]>) => {
        const data = estimateAdapter.addMany(
          estimateAdapter.getInitialState(),
          response.data,
        );
        return {
          ...response,
          data,
        };
      },
      forceRefetch: ({currentArg, previousArg}) => {
        return (currentArg?.page ?? 1) > (previousArg?.page ?? 1);
      },
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentState, incomingState) => {
        estimateAdapter.addMany(
          currentState.data,
          estimateSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    getEstimateByIdApi: build.query<Estimate, CommonEstimatePayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_BY_ID,
        params: {
          recordId: queryArg.estimateId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Estimate>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Estimate', id: queryArg.estimateId},
      ],
    }),
    getAllEstimateMetricsApi: build.query<EstimateMetrics, void>({
      query: () => ({
        url: generalEndpoints.GET_ALL_METRICS,
        params: {
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<EstimateMetrics>) =>
        response.data,
      providesTags: [{type: 'Estimate', id: 'LIST'}],
    }),
    sendEstimateApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.SEND_RECORD,
        method: REQUEST_METHODS.POST,
        body: {recordId: queryArg.estimateId, type},
      }),
    }),
    deleteEstimateApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_RECORD,
        method: REQUEST_METHODS.DELETE,
        body: {recordId: queryArg.estimateId, type},
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Estimate', id: queryArg.estimateId},
        {type: 'Estimate', id: 'LIST'},
      ],
      onQueryStarted: async ({estimateId}, {dispatch, queryFulfilled}) => {
        const {estimateApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllEstimatesApi',
              estimateApiListParams.sent,
              draft => {
                estimateAdapter.removeOne(draft.data, estimateId);
              },
            ),
          );
        });
      },
    }),
    deleteMultipleEstimateApi: build.mutation<
      HttpSuccessResponse<void>,
      DeleteMultipleEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_MULTIPLE,
        method: REQUEST_METHODS.DELETE,
        body: {arrayOfIds: queryArg.arrayOfEstimateId, type},
      }),
      invalidatesTags: (_, _error, queryArg) =>
        providesList(
          queryArg.arrayOfEstimateId.map(el => ({id: el})),
          'Estimate',
        ),

      onQueryStarted: ({arrayOfEstimateId}, {dispatch, queryFulfilled}) => {
        const {estimateApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllEstimatesApi',
              estimateApiListParams.sent,
              draft => {
                estimateAdapter.removeMany(draft.data, arrayOfEstimateId);
              },
            ),
          );
        });
      },
    }),
    getEstimatesByStatusApi: build.query<
      RtkSuccessResponse<Estimate[]>,
      GetEstimateByStatusPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Estimate[]>) => response,
      providesTags: result => providesList(result?.data, 'Estimate'),
    }),
    getEstimatesByOldestOrNewestApi: build.query<
      RtkSuccessResponse<Estimate[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Estimate[]>) => response,
      providesTags: result => providesList(result?.data, 'Estimate'),
    }),
    getAllRecievedEstimatesApi: build.query<
      RtkSuccessResponse<EntityState<Estimate>>,
      GetAllRecordsPayloadApiArg<EstimateStatusTypes>
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.GET_ALL_RECEIVED_RECORDS,
        params: {
          page: queryArg.page,
          type,
          ...(queryArg.recordStatus && {recordStatus: queryArg.recordStatus}),
          ...(queryArg.filter && {filter: queryArg.filter}),
        },
      }),
      // transformResponse: (response: RtkSuccessResponse<Estimate[]>) => response,
      // providesTags: result => providesList(result?.data, 'Estimate'),
      transformResponse: (response: RtkSuccessResponse<Estimate[]>) => {
        const data = estimateAdapter.addMany(
          estimateAdapter.getInitialState(),
          response.data,
        );
        return {
          ...response,
          data,
        };
      },
      forceRefetch: ({currentArg, previousArg}) => {
        return (currentArg?.page ?? 1) > (previousArg?.page ?? 1);
      },
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentState, incomingState) => {
        estimateAdapter.addMany(
          currentState.data,
          estimateSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    viewRecievedEstimateApi: build.query<Estimate, CommonEstimatePayloadApiArg>(
      {
        query: queryArg => ({
          url: generalEndpoints.GET_RECEIVED_RECORD_BY_ID,
          params: {
            recordId: queryArg.estimateId,
            type,
          },
        }),
        transformResponse: (response: HttpSuccessResponse<Estimate>) =>
          response.data,
        providesTags: (_, _error, queryArg) => [
          {type: 'Estimate', id: queryArg.estimateId},
        ],
      },
    ),
    generateEstimateLinkToShareApi: build.query<
      Estimate,
      CommonEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GENERATE_LINK_TO_SHARE,
        params: {
          recordId: queryArg.estimateId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Estimate>) =>
        response.data,
    }),
    sendEstimateReminderApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.SEND_REMINDER,
        method: REQUEST_METHODS.POST,
        body: {recordId: queryArg.estimateId, type},
      }),
    }),
    getEstimateToDuplicateApi: build.query<
      HttpSuccessResponse<Estimate>,
      CommonEstimatePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_TO_DUPLICATE,
        params: {recordId: queryArg.estimateId, type},
      }),
    }),
  }),
});
export {injectedRtkApi as estimateApi};
export {estimateAdapter, estimateSelector};
export const {
  useAcceptOrDeclineEstimateApiMutation,
  useConvertAcceptedEstimateToInvoiceApiMutation,
  useCreateEstimateApiMutation,
  useDeleteEstimateApiMutation,
  useDeleteMultipleEstimateApiMutation,
  useGenerateEstimateLinkToShareApiQuery,
  useGetAllEstimateMetricsApiQuery,
  useGetAllEstimatesApiQuery,
  useGetAllRecievedEstimatesApiQuery,
  useGetEstimateByIdApiQuery,
  useGetEstimateToDuplicateApiQuery,
  useGetEstimatesByOldestOrNewestApiQuery,
  useGetEstimatesByStatusApiQuery,
  useSendEstimateApiMutation,
  useSendEstimateReminderApiMutation,
  useUpdateEstimateApiMutation,
  useViewRecievedEstimateApiQuery,
  useSearchEstimateApiQuery,
} = injectedRtkApi;
