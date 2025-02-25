import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {Item, PaginatedItemSearchSearch} from '../../../types/Item';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {providesList} from '../../../utils/helpers';
import {store} from '../../slices/store';
import {baseApi as api} from '../baseApi';
import {generalEndpoints} from '../general/endpoints';
import {
  GetAllRecordsByOldestOrNewestPayloadApiArg,
  GetAllRecordsPayloadApiArg,
} from '../general/type';
import {itemEndpoints} from './endpoints';
import {
  CommonItemPayloadApiArg,
  CreateItemPayloadApiArg,
  DeleteMultipleItemPayloadApiArg,
  SearchItemRecordArg,
  UpdateItemPayloadApiArg,
} from './type';

const type = 'item';

const itemAdapter = createEntityAdapter({
  selectId: (item: Item) => item.id,
});

const itemSelector = itemAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    searchItemApi: build.query<
      Item[],
      Pick<SearchItemRecordArg, 'searchTerm' | 'currency'>
    >({
      query: queryArg => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {type, ...queryArg},
      }),
      transformResponse: (response: HttpSuccessResponse<Item[]>) =>
        response.data,
    }),
    searchItemsPaginatedApi: build.query<
      RtkSuccessResponse<EntityState<Item>>,
      SearchItemRecordArg
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (
        response: HttpSuccessResponse<PaginatedItemSearchSearch>,
      ) => {
        const itemData = response.data;
        const data = itemAdapter.addMany(
          itemAdapter.getInitialState(),
          response.data.itemsData,
        );
        return {
          data,
          DataPerPage: itemData?.pageCount,
          nextPage: itemData?.nextPage,
          prevPage: itemData?.prevPage,
          totalDataCount: itemData?.totalRecords,
          message: response?.message,
          status: response?.status,
        } as RtkSuccessResponse<EntityState<Item>>;
      },
      forceRefetch: ({currentArg, previousArg}) => {
        return (currentArg?.page ?? 1) !== (previousArg?.page ?? 1);
      },
      serializeQueryArgs: ({endpointName, queryArgs}) => {
        return `${endpointName}-${queryArgs.currency}-${queryArgs.searchTerm}`;
      },
      merge: (currentState, incomingState) => {
        itemAdapter.addMany(
          currentState.data,
          itemSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    createItemApi: build.mutation<
      HttpSuccessResponse<Item>,
      CreateItemPayloadApiArg
    >({
      query: queryArg => ({
        url: itemEndpoints.CREATE_ITEM,
        method: REQUEST_METHODS.POST,
        body: queryArg.createItem,
      }),
      invalidatesTags: ['Item'],
      onQueryStarted: (_, {dispatch, queryFulfilled}) => {
        const {itemApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllItemsApi',
              itemApiListParams,
              draft => {
                const state = {
                  entities: {...draft.data.entities, [data.data.id]: data.data},
                  ids: [data.data.id, ...draft.data.ids],
                } as EntityState<Item>;
                itemAdapter.setAll(draft.data, itemSelector.selectAll(state));
              },
            ),
          );
        });
      },
    }),
    updateItemApi: build.mutation<
      HttpSuccessResponse<Item>,
      UpdateItemPayloadApiArg
    >({
      query: queryArg => ({
        url: itemEndpoints.UPDATE_ITEM,
        method: REQUEST_METHODS.PATCH,
        body: queryArg.updateItem,
      }),
      invalidatesTags: (_, _error, arg) => [
        {type: 'Item', id: arg?.updateItem.itemId},
      ],
      onQueryStarted({updateItem}, {queryFulfilled, dispatch}) {
        const {itemApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllItemsApi',
              itemApiListParams,
              draft => {
                itemAdapter.updateOne(draft.data, {
                  id: updateItem.itemId,
                  changes: updateItem,
                });
              },
            ),
          );
        });
      },
    }),
    getItemByIdApi: build.query<Item, CommonItemPayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_BY_ID,
        params: {
          recordId: queryArg.itemId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<Item>) => response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'Item', id: queryArg.itemId},
      ],
    }),
    getAllItemsApi: build.query<
      RtkSuccessResponse<EntityState<Item>>,
      GetAllRecordsPayloadApiArg<never> & {currency?: string}
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Item[]>) => {
        const data = itemAdapter.addMany(
          itemAdapter.getInitialState(),
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
        itemAdapter.addMany(
          currentState.data,
          itemSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    deleteItemApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonItemPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_RECORD,
        method: REQUEST_METHODS.DELETE,
        body: {recordId: queryArg.itemId, type},
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'Item', id: queryArg.itemId},
      ],
      onQueryStarted: async ({itemId}, {dispatch, queryFulfilled}) => {
        const {itemApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllItemsApi',
              itemApiListParams,
              draft => {
                itemAdapter.removeOne(draft.data, itemId);
              },
            ),
          );
        });
      },
    }),
    deleteMultipleItemApi: build.mutation<
      HttpSuccessResponse<void>,
      DeleteMultipleItemPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_MULTIPLE,
        method: REQUEST_METHODS.DELETE,
        body: {arrayOfIds: queryArg.arrayOfItemId, type},
      }),
      invalidatesTags: (_, _error, queryArg) =>
        queryArg.arrayOfItemId.map(itemId => ({
          type: 'Item',
          id: itemId,
        })),

      onQueryStarted: ({arrayOfItemId}, {dispatch, queryFulfilled}) => {
        const {itemApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllItemsApi',
              itemApiListParams,
              draft => {
                itemAdapter.removeMany(draft.data, arrayOfItemId);
              },
            ),
          );
        });
      },
    }),
    getItemsByOldestOrNewestApi: build.query<
      RtkSuccessResponse<Item[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<Item[]>) => response,
      providesTags: result => providesList(result?.data, 'Item'),
    }),
  }),
});
export {itemAdapter, injectedRtkApi as itemApi, itemSelector};
export const {
  useCreateItemApiMutation,
  useDeleteItemApiMutation,
  useDeleteMultipleItemApiMutation,
  useGetAllItemsApiQuery,
  useGetItemByIdApiQuery,
  useGetItemsByOldestOrNewestApiQuery,
  useUpdateItemApiMutation,
  useSearchItemApiQuery,
  useSearchItemsPaginatedApiQuery,
} = injectedRtkApi;
