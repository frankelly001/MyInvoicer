import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {Item} from '../../../types/Item';
import {Notification} from '../../../types/Notifications';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {providesList} from '../../../utils/helpers';
import {baseApi as api} from '../baseApi';
import {generalEndpoints} from '../general/endpoints';
import {
  GeneralSearchRecordArg,
  GetAllRecordsByOldestOrNewestPayloadApiArg,
} from '../general/type';
import {notificationEndpoints} from './endpoints';
import {
  CommonNotificationPayloadApiArg,
  DeleteMultipleNotificationPayloadApiArg,
  GetAllNotificationPayloadApiArg,
} from './type';
import {store} from '../../slices/store';

const type = 'notification';

const notificationAdapter = createEntityAdapter({
  selectId: (item: Notification) => item.id,
});

const notificationSelector = notificationAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    searchNotificationApi: build.query<Notification[], GeneralSearchRecordArg>({
      query: queryArg => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {type, ...queryArg},
      }),
      transformResponse: (response: HttpSuccessResponse<Notification[]>) =>
        response.data,
    }),
    getAllNotificationsApi: build.query<
      RtkSuccessResponse<EntityState<Notification>>,
      GetAllNotificationPayloadApiArg
    >({
      query: (queryArg = {page: 1}) => ({
        url: notificationEndpoints.GET_ALL_NOTIFICATIONS,
        params: queryArg,
      }),
      providesTags: [{type: 'Notification', id: 'LIST'}],
      transformResponse: (response: RtkSuccessResponse<Notification[]>) => {
        const data = notificationAdapter.addMany(
          notificationAdapter.getInitialState(),
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
        return `${endpointName}-${queryArgs.filter}`;
      },
      merge: (currentState, incomingState) => {
        notificationAdapter.addMany(
          currentState.data,
          notificationSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    markNotificationAsReadOrUnReadApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonNotificationPayloadApiArg & {type: 'read' | 'unread'}
    >({
      query: queryArg => ({
        url: notificationEndpoints.MARK_AS_READ_OR_UNREAD,
        method: REQUEST_METHODS.POST,
        body: queryArg,
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Notification', id: queryArg.notificationId},
        {type: 'Notification', id: 'LIST'},
      ],
      onQueryStarted(arg, {queryFulfilled, dispatch}) {
        const {notificationApiListParams} =
          store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllNotificationsApi',
              notificationApiListParams,
              draft => {
                notificationAdapter.updateOne(draft.data, {
                  id: arg.notificationId,
                  changes: {isRead: arg.type === 'read' ? true : false},
                });
              },
            ),
          );
        });
      },
    }),
    markAllNotificationsAsReadApi: build.mutation<
      HttpSuccessResponse<void>,
      void
    >({
      query: () => ({
        url: notificationEndpoints.MARK_ALL_AS_READ,
        method: REQUEST_METHODS.POST,
      }),
      invalidatesTags: ['Notification'],
      onQueryStarted(_, {queryFulfilled, dispatch}) {
        const {notificationApiListParams} =
          store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllNotificationsApi',
              notificationApiListParams,
              draft => {
                notificationAdapter.updateMany(
                  draft.data,
                  draft.data.ids.map(id => ({
                    id,
                    changes: {isRead: true},
                  })),
                );
              },
            ),
          );
        });
      },
    }),
    deleteNotificationApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonNotificationPayloadApiArg
    >({
      query: queryArg => ({
        url: notificationEndpoints.DELETE_NOTIFICATION,
        method: REQUEST_METHODS.DELETE,
        body: queryArg,
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Notification', id: queryArg.notificationId},
      ],
      onQueryStarted: async ({notificationId}, {dispatch, queryFulfilled}) => {
        const {notificationApiListParams} =
          store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllNotificationsApi',
              notificationApiListParams,
              draft => {
                notificationAdapter.removeOne(draft.data, notificationId);
              },
            ),
          );
        });
      },
    }),
    deleteMultipleNotificationApi: build.mutation<
      HttpSuccessResponse<void>,
      DeleteMultipleNotificationPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_MULTIPLE,
        method: REQUEST_METHODS.DELETE,
        body: {arrayOfIds: queryArg.arrayOfNotificationId, type},
      }),
      invalidatesTags: (_, _error, queryArg) =>
        queryArg.arrayOfNotificationId.map(itemId => ({
          type: 'Notification',
          id: itemId,
        })),
      onQueryStarted: ({arrayOfNotificationId}, {dispatch, queryFulfilled}) => {
        const {notificationApiListParams} =
          store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllNotificationsApi',
              notificationApiListParams,
              draft => {
                notificationAdapter.removeMany(
                  draft.data,
                  arrayOfNotificationId,
                );
              },
            ),
          );
        });
      },
    }),
    getNotificationByOldestOrNewestApi: build.query<
      RtkSuccessResponse<Item[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: notificationEndpoints.GET_ALL_NOTIFICATIONS,
        params: queryArg,
      }),
      transformResponse: (response: RtkSuccessResponse<Item[]>) => response,
      providesTags: result => providesList(result?.data, 'Item'),
    }),
  }),
});
export {injectedRtkApi as notificatioApi};
export {notificationAdapter, notificationSelector};
export const {
  useDeleteMultipleNotificationApiMutation,
  useDeleteNotificationApiMutation,
  useGetAllNotificationsApiQuery,
  useGetNotificationByOldestOrNewestApiQuery,
  useMarkAllNotificationsAsReadApiMutation,
  useMarkNotificationAsReadOrUnReadApiMutation,
  useSearchNotificationApiQuery,
} = injectedRtkApi;
