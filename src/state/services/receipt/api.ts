import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {Receipt} from '../../../types/Receipts';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {ReceiptStatusTypes} from '../../../utils/constants/status';
import {providesList} from '../../../utils/helpers';
import {store} from '../../slices/store';
import {baseApi as api} from '../baseApi';
import {generalEndpoints} from '../general/endpoints';
import {
  GeneralSearchRecordArg,
  GetAllRecordsByOldestOrNewestPayloadApiArg,
  GetAllRecordsPayloadApiArg,
} from '../general/type';
import {receiptEndpoints} from './endpoints';
import {
  CommonReceiptPayloadApiArg,
  CreateReceiptPayloadApiArg,
  DeleteMultipleReceiptPayloadApiArg,
  GetReceiptByStatusPayloadApiArg,
  UpdateReceiptPayloadApiArg,
} from './type';

const type = 'receipt';

const receiptAdapter = createEntityAdapter({
  selectId: (item: Receipt) => item.id,
});

const receiptSelector = receiptAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    searchReceiptApi: build.query<Receipt[], GeneralSearchRecordArg>({
      query: queryArg => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {type, ...queryArg},
      }),
      transformResponse: (response: HttpSuccessResponse<Receipt[]>) =>
        response.data,
    }),
    createReceiptApi: build.mutation<
      HttpSuccessResponse<Receipt>,
      CreateReceiptPayloadApiArg
    >({
      query: queryArg => ({
        url: receiptEndpoints.CREATE_RECEIPT,
        method: REQUEST_METHODS.POST,
        body: queryArg.createReceipt,
      }),
      invalidatesTags: ['Receipt'],
      onQueryStarted: (_, {dispatch, queryFulfilled}) => {
        const {receiptApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllReceiptsApi',
              receiptApiListParams.sent,
              draft => {
                const state = {
                  entities: {...draft.data.entities, [data.data.id]: data.data},
                  ids: [data.data.id, ...draft.data.ids],
                } as EntityState<Receipt>;
                receiptAdapter.setAll(
                  draft.data,
                  receiptSelector.selectAll(state),
                );
              },
            ),
          );
        });
      },
    }),
    updateReceiptApi: build.mutation<
      HttpSuccessResponse<Receipt>,
      UpdateReceiptPayloadApiArg
    >({
      query: queryArg => ({
        url: receiptEndpoints.UPDATE_RECEIPT,
        method: REQUEST_METHODS.PATCH,
        body: queryArg.updateReceipt,
      }),
      invalidatesTags: (_, _error, arg) => [
        {type: 'Receipt', id: arg?.updateReceipt.receiptId},
      ],
      onQueryStarted({updateReceipt}, {queryFulfilled, dispatch}) {
        const {receiptApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllReceiptsApi',
              receiptApiListParams.sent,
              draft => {
                receiptAdapter.updateOne(draft.data, {
                  id: updateReceipt.receiptId,
                  changes: data.data,
                });
              },
            ),
          );
        });
      },
    }),
    getAllReceiptsApi: build.query<
      RtkSuccessResponse<EntityState<Receipt>>,
      GetAllRecordsPayloadApiArg<ReceiptStatusTypes>
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          page: queryArg.page,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Receipt[]>) => {
        const data = receiptAdapter.addMany(
          receiptAdapter.getInitialState(),
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
        receiptAdapter.addMany(
          currentState.data,
          receiptSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    getReceiptByIdApi: build.query<Receipt, CommonReceiptPayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_BY_ID,
        params: {
          recordId: queryArg.receiptId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Receipt>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Receipt', id: queryArg.receiptId},
      ],
    }),

    sendReceiptApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonReceiptPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.SEND_RECORD,
        method: REQUEST_METHODS.POST,
        body: {recordId: queryArg.receiptId, type},
      }),
    }),

    deleteReceiptApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonReceiptPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_RECORD,
        method: REQUEST_METHODS.DELETE,
        body: {recordId: queryArg.receiptId, type},
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Receipt', id: queryArg.receiptId},
        {type: 'Receipt', id: 'LIST'},
      ],
      onQueryStarted: async ({receiptId}, {dispatch, queryFulfilled}) => {
        const {receiptApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllReceiptsApi',
              receiptApiListParams.sent,
              draft => {
                receiptAdapter.removeOne(draft.data, receiptId);
              },
            ),
          );
        });
      },
    }),
    deleteMultipleReceiptApi: build.mutation<
      HttpSuccessResponse<void>,
      DeleteMultipleReceiptPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_MULTIPLE,
        method: REQUEST_METHODS.DELETE,
        body: {arrayOfIds: queryArg.arrayOfReceiptId, type},
      }),
      invalidatesTags: (_, _error, queryArg) =>
        providesList(
          queryArg.arrayOfReceiptId.map(el => ({id: el})),
          'Receipt',
        ),

      onQueryStarted: ({arrayOfReceiptId}, {dispatch, queryFulfilled}) => {
        const {receiptApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllReceiptsApi',
              receiptApiListParams.sent,
              draft => {
                receiptAdapter.removeMany(draft.data, arrayOfReceiptId);
              },
            ),
          );
        });
      },
    }),
    getReceiptByStatusApi: build.query<
      RtkSuccessResponse<Receipt[]>,
      GetReceiptByStatusPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Receipt[]>) => response,
      providesTags: result => providesList(result?.data, 'Receipt'),
    }),
    getReceiptsByOldestOrNewestApi: build.query<
      RtkSuccessResponse<Receipt[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Receipt[]>) => response,
      providesTags: result => providesList(result?.data, 'Receipt'),
    }),
    getAllRecievedReceiptsApi: build.query<
      RtkSuccessResponse<EntityState<Receipt>>,
      GetAllRecordsPayloadApiArg<ReceiptStatusTypes>
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
      transformResponse: (response: RtkSuccessResponse<Receipt[]>) => {
        const data = receiptAdapter.addMany(
          receiptAdapter.getInitialState(),
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
        receiptAdapter.addMany(
          currentState.data,
          receiptSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    viewRecievedReceiptApi: build.query<Receipt, CommonReceiptPayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECEIVED_RECORD_BY_ID,
        params: {
          recordId: queryArg.receiptId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Receipt>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Receipt', id: queryArg.receiptId},
      ],
    }),
    generateReceiptLinkToShareApi: build.query<
      Receipt,
      CommonReceiptPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GENERATE_LINK_TO_SHARE,
        params: {
          recordId: queryArg.receiptId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Receipt>) =>
        response.data,
    }),
    sendReceiptReminderApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonReceiptPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.SEND_REMINDER,
        method: REQUEST_METHODS.POST,
        body: {recordId: queryArg.receiptId, type},
      }),
    }),
    getReceiptToDuplicateApi: build.query<
      HttpSuccessResponse<Receipt>,
      CommonReceiptPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_TO_DUPLICATE,
        params: {recordId: queryArg.receiptId, type},
      }),
    }),
  }),
});

export {injectedRtkApi as receiptApi};
export {receiptAdapter, receiptSelector};
export const {
  useCreateReceiptApiMutation,
  useDeleteMultipleReceiptApiMutation,
  useDeleteReceiptApiMutation,
  useGenerateReceiptLinkToShareApiQuery,
  useGetAllReceiptsApiQuery,
  useGetAllRecievedReceiptsApiQuery,
  useGetReceiptsByOldestOrNewestApiQuery,
  useGetReceiptByIdApiQuery,
  useGetReceiptByStatusApiQuery,
  useGetReceiptToDuplicateApiQuery,
  useSendReceiptApiMutation,
  useSendReceiptReminderApiMutation,
  useUpdateReceiptApiMutation,
  useViewRecievedReceiptApiQuery,
  useSearchReceiptApiQuery,
} = injectedRtkApi;
