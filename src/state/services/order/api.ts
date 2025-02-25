import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {Order, OrderMetrics} from '../../../types/Orders';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {OrderStatusTypes} from '../../../utils/constants/status';
import {providesList} from '../../../utils/helpers';
import {store} from '../../slices/store';
import {baseApi as api} from '../baseApi';
import {generalEndpoints} from '../general/endpoints';
import {
  GeneralSearchRecordArg,
  GetAllRecordsByOldestOrNewestPayloadApiArg,
  GetAllRecordsPayloadApiArg,
} from '../general/type';
import {orderEndpoints} from './endpoints';
import {
  CommonOrderPayloadApiArg,
  CreateOrderPayloadApiArg,
  DeleteMultipleOrderPayloadApiArg,
  GetOrderByStatusPayloadApiArg,
  UpdateOrderPayloadApiArg,
} from './type';

const type = 'order';

const orderAdapter = createEntityAdapter({
  selectId: (item: Order) => item.id,
});

const orderSelector = orderAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    searchOrderApi: build.query<Order[], GeneralSearchRecordArg>({
      query: queryArg => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {type, ...queryArg},
      }),
      transformResponse: (response: HttpSuccessResponse<Order[]>) =>
        response.data,
    }),
    createOrderApi: build.mutation<
      HttpSuccessResponse<Order>,
      CreateOrderPayloadApiArg
    >({
      query: queryArg => ({
        url: orderEndpoints.CREATE_ORDER,
        method: REQUEST_METHODS.POST,
        body: queryArg.createOrder,
      }),
      invalidatesTags: ['Order'],
      onQueryStarted: (_, {dispatch, queryFulfilled}) => {
        const {orderApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllOrdersApi',
              orderApiListParams.sent,
              draft => {
                const state = {
                  entities: {...draft.data.entities, [data.data.id]: data.data},
                  ids: [data.data.id, ...draft.data.ids],
                } as EntityState<Order>;
                orderAdapter.setAll(draft.data, orderSelector.selectAll(state));
              },
            ),
          );
        });
      },
    }),
    updateOrderApi: build.mutation<
      HttpSuccessResponse<Order>,
      UpdateOrderPayloadApiArg
    >({
      query: queryArg => ({
        url: orderEndpoints.UPDATE_ORDER,
        method: REQUEST_METHODS.PATCH,
        body: queryArg.updateOrder,
      }),
      invalidatesTags: (_, _error, arg) => [
        {type: 'Order', id: arg?.updateOrder.orderId},
      ],
      onQueryStarted({updateOrder}, {queryFulfilled, dispatch}) {
        const {orderApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllOrdersApi',
              orderApiListParams.sent,
              draft => {
                orderAdapter.updateOne(draft.data, {
                  id: updateOrder.orderId,
                  changes: data.data,
                });
              },
            ),
          );
        });
      },
    }),
    getAllOrdersApi: build.query<
      RtkSuccessResponse<EntityState<Order>>,
      GetAllRecordsPayloadApiArg<OrderStatusTypes>
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          page: queryArg.page,
          type,
        },
      }),

      transformResponse: (response: RtkSuccessResponse<Order[]>) => {
        const data = orderAdapter.addMany(
          orderAdapter.getInitialState(),
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
        orderAdapter.addMany(
          currentState.data,
          orderSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    getOrderByIdApi: build.query<Order, CommonOrderPayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_BY_ID,
        params: {
          recordId: queryArg.orderId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Order>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Order', id: queryArg.orderId},
      ],
    }),

    getAllOrderMetricsApi: build.query<OrderMetrics, void>({
      query: () => ({
        url: generalEndpoints.GET_ALL_METRICS,
        params: {
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<OrderMetrics>) =>
        response.data,
      providesTags: [{type: 'Order', id: 'LIST'}],
    }),
    sendOrderApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonOrderPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.SEND_RECORD,
        method: REQUEST_METHODS.POST,
        body: {recordId: queryArg.orderId, type},
      }),
    }),

    deleteOrderApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonOrderPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_RECORD,
        method: REQUEST_METHODS.DELETE,
        body: {recordId: queryArg.orderId, type},
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Order', id: queryArg.orderId},
        {type: 'Order', id: 'LIST'},
      ],
      onQueryStarted: async ({orderId}, {dispatch, queryFulfilled}) => {
        const {orderApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllOrdersApi',
              orderApiListParams.sent,
              draft => {
                orderAdapter.removeOne(draft.data, orderId);
              },
            ),
          );
        });
      },
    }),
    deleteMultipleOrderApi: build.mutation<
      HttpSuccessResponse<void>,
      DeleteMultipleOrderPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_MULTIPLE,
        method: REQUEST_METHODS.DELETE,
        body: {arrayOfIds: queryArg.arrayOfOrderId, type},
      }),
      invalidatesTags: (_, _error, queryArg) =>
        providesList(
          queryArg.arrayOfOrderId.map(el => ({id: el})),
          'Order',
        ),
      onQueryStarted: ({arrayOfOrderId}, {dispatch, queryFulfilled}) => {
        const {orderApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllOrdersApi',
              orderApiListParams.sent,
              draft => {
                orderAdapter.removeMany(draft.data, arrayOfOrderId);
              },
            ),
          );
        });
      },
    }),
    getOrderByStatusApi: build.query<
      RtkSuccessResponse<Order[]>,
      GetOrderByStatusPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Order[]>) => response,
      providesTags: result => providesList(result?.data, 'Order'),
    }),
    getOrdersByOldestOrNewestApi: build.query<
      RtkSuccessResponse<Order[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Order[]>) => response,
      providesTags: result => providesList(result?.data, 'Order'),
    }),
    getAllRecievedOrdersApi: build.query<
      RtkSuccessResponse<EntityState<Order>>,
      GetAllRecordsPayloadApiArg<OrderStatusTypes>
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
      transformResponse: (response: RtkSuccessResponse<Order[]>) => {
        const data = orderAdapter.addMany(
          orderAdapter.getInitialState(),
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
        orderAdapter.addMany(
          currentState.data,
          orderSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    viewRecievedOrderApi: build.query<Order, CommonOrderPayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECEIVED_RECORD_BY_ID,
        params: {
          recordId: queryArg.orderId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Order>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Order', id: queryArg.orderId},
      ],
    }),
    generateOrderLinkToShareApi: build.query<Order, CommonOrderPayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GENERATE_LINK_TO_SHARE,
        params: {
          recordId: queryArg.orderId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Order>) =>
        response.data,
    }),
    sendOrderReminderApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonOrderPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.SEND_REMINDER,
        method: REQUEST_METHODS.POST,
        body: {recordId: queryArg.orderId, type},
      }),
    }),
    getOrderToDuplicateApi: build.query<
      HttpSuccessResponse<Order>,
      CommonOrderPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_TO_DUPLICATE,
        params: {recordId: queryArg.orderId, type},
      }),
    }),
  }),
});

export {injectedRtkApi as orderApi};
export {orderAdapter, orderSelector};
export const {
  useCreateOrderApiMutation,
  useDeleteMultipleOrderApiMutation,
  useDeleteOrderApiMutation,
  useGenerateOrderLinkToShareApiQuery,
  useGetAllOrderMetricsApiQuery,
  useGetAllOrdersApiQuery,
  useGetAllRecievedOrdersApiQuery,
  useGetOrderByIdApiQuery,
  useGetOrderByStatusApiQuery,
  useGetOrderToDuplicateApiQuery,
  useGetOrdersByOldestOrNewestApiQuery,
  useSendOrderApiMutation,
  useSendOrderReminderApiMutation,
  useUpdateOrderApiMutation,
  useViewRecievedOrderApiQuery,
  useSearchOrderApiQuery,
} = injectedRtkApi;
