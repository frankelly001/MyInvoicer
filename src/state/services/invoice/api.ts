import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {Invoice, InvoiceMetrics} from '../../../types/Invoices';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {InvoiceStatusTypes} from '../../../utils/constants/status';
import {providesList} from '../../../utils/helpers';
import {store} from '../../slices/store';
import {baseApi as api} from '../baseApi';
import {generalEndpoints} from '../general/endpoints';
import {
  GeneralSearchRecordArg,
  GetAllRecordsByOldestOrNewestPayloadApiArg,
  GetAllRecordsPayloadApiArg,
} from '../general/type';
import {invoiceEndpoints} from './endpoints';
import {
  CommonInvoicePayloadApiArg,
  CompleteDraftedInvoicePayloadApiArg,
  CreateInvoicePayloadApiArg,
  DeleteMultipleInvoicePayloadApiArg,
  GetInvoiceByStatusPayloadApiArg,
  SaveInvoiceAsDraftPayloadApiArg,
} from './type';

const type = 'invoice';

const invoiceAdapter = createEntityAdapter({
  selectId: (item: Invoice) => item.id,
});
const invoiceSelector = invoiceAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    searchInvoiceApi: build.query<Invoice[], GeneralSearchRecordArg>({
      query: queryArg => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {type, ...queryArg},
      }),
      transformResponse: (response: HttpSuccessResponse<Invoice[]>) =>
        response.data,
    }),
    getAllInvoicesApi: build.query<
      RtkSuccessResponse<EntityState<Invoice>>,
      GetAllRecordsPayloadApiArg<InvoiceStatusTypes>
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          page: queryArg.page,
          type,
          documentCount: queryArg.documentCount,
          ...(queryArg.recordStatus && {recordStatus: queryArg.recordStatus}),
          ...(queryArg.filter && {filter: queryArg.filter}),
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Invoice[]>) => {
        const data = invoiceAdapter.addMany(
          invoiceAdapter.getInitialState(),
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
      serializeQueryArgs: ({endpointName, queryArgs}) => {
        return `${endpointName}-${queryArgs.recordStatus}`;
      },
      merge: (currentState, incomingState) => {
        invoiceAdapter.addMany(
          currentState.data,
          invoiceSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    getAllRecievedInvoicesApi: build.query<
      RtkSuccessResponse<EntityState<Invoice>>,
      GetAllRecordsPayloadApiArg<InvoiceStatusTypes>
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
      transformResponse: (response: RtkSuccessResponse<Invoice[]>) => {
        const data = invoiceAdapter.addMany(
          invoiceAdapter.getInitialState(),
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
        invoiceAdapter.addMany(
          currentState.data,
          invoiceSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    // TODO(i will take it out since its implement in getallInvoice)
    getInvoicesByOldestOrNewestApi: build.query<
      RtkSuccessResponse<Invoice[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Invoice[]>) => response,
      providesTags: result => providesList(result?.data, 'Invoice'),
    }),
    // TODO(i will take it out since its implement in getallInvoice)
    getRecievedInvoicesByOldestOrNewestApi: build.query<
      RtkSuccessResponse<Invoice[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECEIVED_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Invoice[]>) => response,
      providesTags: result => providesList(result?.data, 'Invoice'),
    }),
    // TODO(i will take it out since its implement in getallInvoice)
    getInvoicesByStatusApi: build.query<
      RtkSuccessResponse<Invoice[]>,
      GetInvoiceByStatusPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Invoice[]>) => response,
      providesTags: result => providesList(result?.data, 'Invoice'),
    }),
    // TODO(i will take it out since its implement in getallInvoice)
    getRecievedInvoicesByStatusApi: build.query<
      RtkSuccessResponse<Invoice[]>,
      GetInvoiceByStatusPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECEIVED_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Invoice[]>) => response,
      providesTags: result => providesList(result?.data, 'Invoice'),
    }),
    getAllInvoiceMetricsApi: build.query<InvoiceMetrics, void>({
      query: () => ({
        url: generalEndpoints.GET_ALL_METRICS,
        params: {
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<InvoiceMetrics>) =>
        response.data,
      providesTags: [{type: 'Invoice', id: 'LIST'}],
    }),
    getInvoiceByIdApi: build.query<Invoice, CommonInvoicePayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_BY_ID,
        params: {
          recordId: queryArg.invoiceId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Invoice>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Invoice', id: queryArg.invoiceId},
      ],
    }),
    viewRecievedInvoiceApi: build.query<Invoice, CommonInvoicePayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECEIVED_RECORD_BY_ID,
        params: {
          recordId: queryArg.invoiceId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Invoice>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Invoice', id: queryArg.invoiceId},
      ],
    }),
    generateInvoiceLinkToShareApi: build.query<
      Invoice,
      CommonInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GENERATE_LINK_TO_SHARE,
        params: {
          recordId: queryArg.invoiceId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Invoice>) =>
        response.data,
    }),
    createInvoiceApi: build.mutation<
      HttpSuccessResponse<Invoice>,
      CreateInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: invoiceEndpoints.CREATE_INVOICE,
        method: REQUEST_METHODS.POST,
        body: queryArg.createInvoice,
      }),
      onQueryStarted: (arg, {dispatch, queryFulfilled}) => {
        const {invoiceApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllInvoicesApi',
              invoiceApiListParams.sent,
              draft => {
                const state = {
                  entities: {...draft.data.entities, [data.data.id]: data.data},
                  ids: [data.data.id, ...draft.data.ids],
                } as EntityState<Invoice>;
                invoiceAdapter.setAll(
                  draft.data,
                  invoiceSelector.selectAll(state),
                );
              },
            ),
          );
        });
      },
    }),
    sendInvoiceReminderApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.SEND_REMINDER,
        method: REQUEST_METHODS.POST,
        body: {recordId: queryArg.invoiceId, type},
      }),
    }),
    getInvoiceToDuplicateApi: build.query<
      HttpSuccessResponse<Invoice>,
      CommonInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_TO_DUPLICATE,

        params: {recordId: queryArg.invoiceId, type},
      }),
    }),
    sendInvoiceApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.SEND_RECORD,
        method: REQUEST_METHODS.POST,
        body: {recordId: queryArg.invoiceId, type},
      }),
    }),
    deleteInvoiceApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_RECORD,
        method: REQUEST_METHODS.DELETE,
        body: {recordId: queryArg.invoiceId, type},
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Invoice', id: queryArg.invoiceId},
        {type: 'Invoice', id: 'LIST'},
      ],
      onQueryStarted: async ({invoiceId}, {dispatch, queryFulfilled}) => {
        const {invoiceApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllInvoicesApi',
              invoiceApiListParams.sent,
              draft => {
                invoiceAdapter.removeOne(draft.data, invoiceId);
              },
            ),
          );
        });
      },
    }),
    deleteMultipleInvoiceApi: build.mutation<
      HttpSuccessResponse<void>,
      DeleteMultipleInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_MULTIPLE,
        method: REQUEST_METHODS.DELETE,
        body: {arrayOfIds: queryArg.arrayOfInvoiceId, type},
      }),
      invalidatesTags: (_, _error, queryArg) =>
        providesList(
          queryArg.arrayOfInvoiceId.map(el => ({id: el})),
          'Invoice',
        ),
      onQueryStarted: ({arrayOfInvoiceId}, {dispatch, queryFulfilled}) => {
        const {invoiceApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllInvoicesApi',
              invoiceApiListParams.sent,
              draft => {
                invoiceAdapter.removeMany(draft.data, arrayOfInvoiceId);
              },
            ),
          );
        });
      },
    }),
    saveInvoiceAsDraftApi: build.mutation<
      HttpSuccessResponse<void>,
      SaveInvoiceAsDraftPayloadApiArg
    >({
      query: queryArg => ({
        url: invoiceEndpoints.SAVE_INVOICE_AS_DRAFT,
        method: REQUEST_METHODS.POST,
        body: queryArg.saveInvoiceAsDraft,
      }),
    }),
    completeDraftedInvoiceApi: build.mutation<
      HttpSuccessResponse<Invoice>,
      CompleteDraftedInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: invoiceEndpoints.COMPLETE_DRAFTED_INVOICE,
        method: REQUEST_METHODS.PATCH,
        body: queryArg.completeDraftedInvoice,
      }),
      invalidatesTags: (_, _error, arg) => [
        {type: 'Invoice', id: arg?.completeDraftedInvoice.invoiceId},
      ],
      onQueryStarted({completeDraftedInvoice}, {queryFulfilled, dispatch}) {
        const {invoiceApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllInvoicesApi',
              invoiceApiListParams.sent,
              draft => {
                invoiceAdapter.updateOne(draft.data, {
                  id: completeDraftedInvoice.invoiceId,
                  changes: data.data,
                });
              },
            ),
          );
        });
      },
    }),
    markInvoiceAsPaidApi: build.mutation<
      HttpSuccessResponse<Invoice>,
      CommonInvoicePayloadApiArg
    >({
      query: queryArg => ({
        url: invoiceEndpoints.MARK_INVOICE_AS_PAID,
        method: REQUEST_METHODS.PATCH,
        body: queryArg,
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Invoice', id: queryArg.invoiceId},
        {type: 'Invoice', id: 'LIST'},
      ],
      onQueryStarted({invoiceId}, {queryFulfilled, dispatch}) {
        const {invoiceApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllInvoicesApi',
              invoiceApiListParams.sent,
              draft => {
                invoiceAdapter.updateOne(draft.data, {
                  id: invoiceId,
                  changes: data.data,
                });
              },
            ),
          );
        });
      },
    }),
  }),
});
export {invoiceAdapter, injectedRtkApi as invoiceApi, invoiceSelector};
export const {
  useCreateInvoiceApiMutation,
  useMarkInvoiceAsPaidApiMutation,
  useSaveInvoiceAsDraftApiMutation,
  useCompleteDraftedInvoiceApiMutation,
  useDeleteInvoiceApiMutation,
  useDeleteMultipleInvoiceApiMutation,
  useGenerateInvoiceLinkToShareApiQuery,
  useGetAllInvoiceMetricsApiQuery,
  useGetAllInvoicesApiQuery,
  useGetAllRecievedInvoicesApiQuery,
  useGetInvoiceByIdApiQuery,
  useGetInvoiceToDuplicateApiQuery,
  useGetInvoicesByOldestOrNewestApiQuery,
  useGetInvoicesByStatusApiQuery,
  useGetRecievedInvoicesByOldestOrNewestApiQuery,
  useGetRecievedInvoicesByStatusApiQuery,
  useSendInvoiceApiMutation,
  useSendInvoiceReminderApiMutation,
  useViewRecievedInvoiceApiQuery,
  useSearchInvoiceApiQuery,
} = injectedRtkApi;
