import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {Billing, BillingMetrics, CustomerBilling} from '../../../types/Billing';
import {
  CreateCustomer,
  Customer,
  CustomerMetrics,
  PaginatedCustomerSearchSearch,
} from '../../../types/Customers';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {providesList} from '../../../utils/helpers';
import {store} from '../../slices/store';
import {baseApi as api} from '../baseApi';
import {generalEndpoints} from '../general/endpoints';
import {
  CommonCustomerPayloadApiArg,
  DeleteMultipleCustomersPayloadApiArg,
  GeneralSearchRecordArg,
  GetAllRecordsByOldestOrNewestPayloadApiArg,
  GetAllRecordsPayloadApiArg,
  GetDashBoardBillingsPayloadApiArg,
} from '../general/type';
import {customerEndpoints} from './endpoints';
import {
  CreateBulkCustomerPayloadApiArg,
  CreateCustomerPayloadApiArg,
  SearchCustomerRecordPaginatedArg,
  UpdateCustomerPayloadApiArg,
} from './type';

const type = 'customer';

const customerAdapter = createEntityAdapter({
  selectId: (item: Customer) => item.id,
});

const customerSelector = customerAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    searchCustomerApi: build.query<Customer[], GeneralSearchRecordArg>({
      query: queryArg => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {type, ...queryArg},
      }),
      transformResponse: (response: HttpSuccessResponse<Customer[]>) =>
        response.data,
    }),
    searchCustomerPaginatedApi: build.query<
      RtkSuccessResponse<EntityState<Customer>>,
      SearchCustomerRecordPaginatedArg
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (
        response: HttpSuccessResponse<PaginatedCustomerSearchSearch>,
      ) => {
        const itemData = response.data;
        const data = customerAdapter.addMany(
          customerAdapter.getInitialState(),
          response.data.allRecordData,
        );
        return {
          data,
          DataPerPage: itemData?.pageCount,
          nextPage: itemData?.nextPage,
          prevPage: itemData?.prevPage,
          totalDataCount: itemData?.totalRecords,
          message: response?.message,
          status: response?.status,
        } as RtkSuccessResponse<EntityState<Customer>>;
      },
      forceRefetch: ({currentArg, previousArg}) => {
        return (currentArg?.page ?? 1) !== (previousArg?.page ?? 1);
      },
      serializeQueryArgs: ({endpointName, queryArgs}) => {
        return `${endpointName}-${queryArgs.searchTerm}`;
      },
      merge: (currentState, incomingState) => {
        customerAdapter.addMany(
          currentState.data,
          customerSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    createCustomerApi: build.mutation<
      HttpSuccessResponse<Customer>,
      CreateCustomerPayloadApiArg
    >({
      query: queryArg => ({
        url: customerEndpoints.CREATE_CUSTOMER,
        method: REQUEST_METHODS.POST,
        body: queryArg.createCustomer,
      }),
      invalidatesTags: ['Customer'],
      onQueryStarted: (_, {dispatch, queryFulfilled}) => {
        const {customerApiListParams: customer} =
          store.getState().apiListParamsReducer;

        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllCustomersApi',
              customer,
              draft => {
                const state = {
                  entities: {...draft.data.entities, [data.data.id]: data.data},
                  ids: [data.data.id, ...draft.data.ids],
                } as EntityState<Customer>;
                customerAdapter.setAll(
                  draft.data,
                  customerSelector.selectAll(state),
                );
              },
            ),
          );
        });
      },
    }),
    updateCustomerApi: build.mutation<
      HttpSuccessResponse<void>,
      UpdateCustomerPayloadApiArg
    >({
      query: queryArg => ({
        url: customerEndpoints.UPDATE_CUSTOMER,
        method: REQUEST_METHODS.PATCH,
        body: queryArg.updateCustomer,
      }),
      invalidatesTags: (_, _error, arg) => [
        {type: 'Customer', id: arg?.updateCustomer.customerId},
      ],
      onQueryStarted({updateCustomer}, {queryFulfilled, dispatch}) {
        const {customerApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllCustomersApi',
              customerApiListParams,
              draft => {
                customerAdapter.updateOne(draft.data, {
                  id: updateCustomer.customerId,
                  changes: updateCustomer,
                });
              },
            ),
          );
        });
      },
    }),
    getAllCustomersApi: build.query<
      RtkSuccessResponse<EntityState<Customer>>,
      GetAllRecordsPayloadApiArg<never>
    >({
      query: (queryArg = {page: 1, documentCount: 10}) => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          page: queryArg.page,
          documentCount: queryArg.documentCount,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Customer[]>) => {
        const data = customerAdapter.addMany(
          customerAdapter.getInitialState(),
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
        customerAdapter.addMany(
          currentState.data,
          customerSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),

    getRecentlyAddedCustomersApi: build.query<
      RtkSuccessResponse<Customer[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Customer[]>) => response,
      providesTags: result => providesList(result?.data, 'Customer'),
    }),
    getCustmerByIdApi: build.query<Customer, CommonCustomerPayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_BY_ID,
        params: {
          recordId: queryArg.customerId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Customer>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Customer', id: queryArg.customerId},
      ],
    }),
    getAllCustomerMetricsApi: build.query<CustomerMetrics, void>({
      query: () => ({
        url: generalEndpoints.GET_ALL_METRICS,
        params: {
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<CustomerMetrics>) =>
        response.data,
      providesTags: ['Customer'],
    }),
    deleteCustomerApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonCustomerPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_RECORD,
        method: REQUEST_METHODS.DELETE,
        body: {recordId: queryArg.customerId, type},
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Customer', id: queryArg.customerId},
      ],
      onQueryStarted: async ({customerId}, {dispatch, queryFulfilled}) => {
        const {customerApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllCustomersApi',
              customerApiListParams,
              draft => {
                customerAdapter.removeOne(draft.data, customerId);
              },
            ),
          );
        });
      },
    }),
    deleteMultipleCustomerApi: build.mutation<
      HttpSuccessResponse<void>,
      DeleteMultipleCustomersPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_MULTIPLE,
        method: REQUEST_METHODS.DELETE,
        body: {arrayOfIds: queryArg.arrayOfCustomerId, type},
      }),
      invalidatesTags: (_, _error, queryArg) =>
        queryArg.arrayOfCustomerId.map(customerId => ({
          type: 'Customer',
          id: customerId,
        })),
      onQueryStarted: ({arrayOfCustomerId}, {dispatch, queryFulfilled}) => {
        const {customerApiListParams: customer} =
          store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllCustomersApi',
              customer,
              draft => {
                customerAdapter.removeMany(draft.data, arrayOfCustomerId);
              },
            ),
          );
        });
      },
    }),

    getCustomerBillingsApi: build.query<
      RtkSuccessResponse<CustomerBilling<Billing[]>>,
      GetAllRecordsPayloadApiArg<never> & CommonCustomerPayloadApiArg
    >({
      query: queryArg => ({
        url: customerEndpoints.GET_CUSTOMER_BILLINGS,
        params: queryArg,
      }),
      transformResponse: (
        response: RtkSuccessResponse<CustomerBilling<Billing[]>>,
      ) => response,
      // providesTags: result => providesList(result?.data.billings, 'Billings'),
    }),
    getAllBillingsApi: build.query<
      RtkSuccessResponse<Billing[]>,
      Pick<GetAllRecordsPayloadApiArg<never>, 'page' | 'documentCount'>
    >({
      query: (queryArg = {page: 1}) => ({
        url: customerEndpoints.GET_ALL_BILLINGS,
        params: {
          ...queryArg,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Billing[]>) => response,
      // providesTags: result => providesList(result?.data, 'Billings'),
    }),
    getAllRecievedBillingsApi: build.query<
      RtkSuccessResponse<Billing[]>,
      Pick<GetAllRecordsPayloadApiArg<never>, 'page' | 'documentCount'>
    >({
      query: (queryArg = {page: 1}) => ({
        url: customerEndpoints.GET_ALL_RECEIVED_BILLINGS,
        params: {
          ...queryArg,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Billing[]>) => response,
      // providesTags: result => providesList(result?.data, 'Billings'),
    }),
    createBulkCustomerApi: build.mutation<
      HttpSuccessResponse<HttpSuccessResponse<CreateCustomer[]>>,
      CreateBulkCustomerPayloadApiArg
    >({
      query: queryArg => ({
        url: customerEndpoints.CREATE_BULK_CUSTOMER,
        method: REQUEST_METHODS.POST,
        body: queryArg.createBulkCustomer,
      }),
      invalidatesTags: ['Customer'],
    }),
    getDashBoardBillingsApi: build.query<
      BillingMetrics,
      GetDashBoardBillingsPayloadApiArg
    >({
      query: queryArg => ({
        url: customerEndpoints.GET_DASHBORD_BILLINGS,
        params: queryArg,
      }),
      transformResponse: (response: HttpSuccessResponse<BillingMetrics>) =>
        response.data,
      providesTags: ['Customer', 'Billings'],
    }),
  }),
});
export {injectedRtkApi as customerApi};
export const {
  useCreateBulkCustomerApiMutation,
  useCreateCustomerApiMutation,
  useDeleteCustomerApiMutation,
  useDeleteMultipleCustomerApiMutation,
  useGetAllBillingsApiQuery,
  useGetAllCustomerMetricsApiQuery,
  useGetAllCustomersApiQuery,
  useGetAllRecievedBillingsApiQuery,
  useGetCustmerByIdApiQuery,
  useGetCustomerBillingsApiQuery,
  useGetDashBoardBillingsApiQuery,
  useGetRecentlyAddedCustomersApiQuery,
  useUpdateCustomerApiMutation,
  useSearchCustomerApiQuery,
  useSearchCustomerPaginatedApiQuery,
} = injectedRtkApi;

export {customerSelector, customerAdapter};
