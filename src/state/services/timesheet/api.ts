import {EntityState, createEntityAdapter} from '@reduxjs/toolkit';
import {
  HttpSuccessResponse,
  RtkSuccessResponse,
} from '../../../types/ApiResponse';
import {
  BillToCustomerData,
  CreateTimeSheet,
  TimeSheet,
  TimeSheetStatus,
} from '../../../types/TimeSheet';
import {REQUEST_METHODS} from '../../../utils/constants/reqMethods';
import {providesList} from '../../../utils/helpers';
import {store} from '../../slices/store';
import {baseApi as api} from '../baseApi';
import {generalEndpoints} from '../general/endpoints';
import {
  GeneralSearchRecordArg,
  GetAllRecordsByOldestOrNewestPayloadApiArg,
  GetAllRecordsPayloadApiArg,
} from '../general/type';
import {timesheetEndpoints} from './endpoints';
import {
  CommonTimeSheetPayloadApiArg,
  CreateTimesheetPayloadApiArg,
  DeleteMultipleTimeSheetPayloadApiArg,
  GetTimeSheetByStatusPayloadApiArg,
  UpdateTimeSheetPayloadApiArg,
} from './type';

const type = 'timesheet';

const timesheetAdapter = createEntityAdapter({
  selectId: (item: TimeSheet) => item.id,
});

const timesheetSelector = timesheetAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    searchTimeSheetApi: build.query<TimeSheet[], GeneralSearchRecordArg>({
      query: queryArg => ({
        url: generalEndpoints.SEARCH_RECORDS,
        params: {type, ...queryArg},
      }),
      transformResponse: (response: HttpSuccessResponse<TimeSheet[]>) =>
        response.data,
    }),
    createTimeSheetApi: build.mutation<
      HttpSuccessResponse<TimeSheet & {customerData: BillToCustomerData}>,
      CreateTimesheetPayloadApiArg
    >({
      query: queryArg => ({
        url: timesheetEndpoints.CREATE_TIMESHEET,
        method: REQUEST_METHODS.POST,
        body: queryArg.createTimesheet,
      }),
      onQueryStarted: (_, {dispatch, queryFulfilled}) => {
        const {timesheetApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllTimeSheetsApi',
              timesheetApiListParams,
              draft => {
                const {customerData, ...otherTimesheetData} = data.data;
                const state = {
                  entities: {
                    ...draft.data.entities,
                    [data.data.id]: {
                      ...otherTimesheetData,
                      billTo: customerData,
                    },
                  },
                  ids: [data.data.id, ...draft.data.ids],
                } as EntityState<TimeSheet>;
                timesheetAdapter.setAll(
                  draft.data,
                  timesheetSelector.selectAll(state),
                );
              },
            ),
          );
        });
      },
    }),
    updateTimeSheetApi: build.mutation<
      HttpSuccessResponse<TimeSheet & {customerData: BillToCustomerData}>,
      UpdateTimeSheetPayloadApiArg
    >({
      query: queryArg => ({
        url: timesheetEndpoints.UPDATE_TIMESHEET,
        method: REQUEST_METHODS.PATCH,
        body: queryArg.updateTimeSheet,
      }),
      invalidatesTags: (_, _error, arg) => [
        {type: 'TimeSheet', id: arg?.updateTimeSheet.timesheetId},
      ],
      onQueryStarted: ({updateTimeSheet}, {queryFulfilled, dispatch}) => {
        const {timesheetApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(({data}) => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllTimeSheetsApi',
              timesheetApiListParams,
              draft => {
                const {customerData, ...otherTimesheetData} = data.data;
                timesheetAdapter.updateOne(draft.data, {
                  id: updateTimeSheet?.timesheetId,
                  changes: {...otherTimesheetData, billTo: customerData},
                });
              },
            ),
          );
        });
      },
    }),
    addTimeSheetToBillApi: build.mutation<
      HttpSuccessResponse<CreateTimeSheet>,
      CommonTimeSheetPayloadApiArg
    >({
      query: queryArg => ({
        url: timesheetEndpoints.ADD_TIMESHEET_TO_BILL,
        method: REQUEST_METHODS.POST,
        body: queryArg,
      }),
      invalidatesTags: (_, _error, arg) => [
        {type: 'TimeSheet', id: arg?.timeSheetId},
      ],
      onQueryStarted: ({timeSheetId}, {queryFulfilled, dispatch}) => {
        const {timesheetApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllTimeSheetsApi',
              timesheetApiListParams,
              draft => {
                timesheetAdapter.updateOne(draft.data, {
                  id: timeSheetId,
                  changes: {timesheetStatus: 'billed'},
                });
              },
            ),
          );
        });
      },
    }),
    getAllTimeSheetsApi: build.query<
      RtkSuccessResponse<EntityState<TimeSheet>>,
      GetAllRecordsPayloadApiArg<TimeSheetStatus>
    >({
      query: (queryArg = {page: 1}) => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      providesTags: ['TimeSheet'],
      transformResponse: (response: RtkSuccessResponse<TimeSheet[]>) => {
        const data = timesheetAdapter.addMany(
          timesheetAdapter.getInitialState(),
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
        timesheetAdapter.addMany(
          currentState.data,
          timesheetSelector.selectAll(incomingState.data),
        );
        currentState.nextPage = incomingState.nextPage;
        currentState.currentPage = incomingState.currentPage;
        currentState.prevPage = incomingState.prevPage;
        currentState.totalDataCount = incomingState.totalDataCount;
        currentState.DataPerPage = incomingState.DataPerPage;
      },
    }),
    getTimeSheetByIdApi: build.query<TimeSheet, CommonTimeSheetPayloadApiArg>({
      query: queryArg => ({
        url: generalEndpoints.GET_RECORD_BY_ID,
        params: {
          recordId: queryArg.timeSheetId,
          type,
        },
      }),
      transformResponse: (response: HttpSuccessResponse<TimeSheet>) =>
        response.data,
      providesTags: (_, _error, queryArg) => [
        {type: 'TimeSheet', id: queryArg.timeSheetId},
      ],
    }),

    deleteTimeSheetApi: build.mutation<
      HttpSuccessResponse<void>,
      CommonTimeSheetPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_RECORD,
        method: REQUEST_METHODS.DELETE,
        body: {recordId: queryArg.timeSheetId, type},
      }),
      invalidatesTags: (_, _error, queryArg) => [
        {type: 'TimeSheet', id: queryArg.timeSheetId},
        {type: 'TimeSheet', id: 'LIST'},
      ],
      onQueryStarted: async ({timeSheetId}, {dispatch, queryFulfilled}) => {
        const {customerApiListParams} = store.getState().apiListParamsReducer;

        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllTimeSheetsApi',
              customerApiListParams,
              draft => {
                timesheetAdapter.removeOne(draft.data, timeSheetId);
              },
            ),
          );
        });
      },
    }),
    deleteMultipleTimeSheetApi: build.mutation<
      HttpSuccessResponse<void>,
      DeleteMultipleTimeSheetPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.DELETE_MULTIPLE,
        method: REQUEST_METHODS.DELETE,
        body: {arrayOfIds: queryArg.arrayOfTimeSheetId, type},
      }),
      invalidatesTags: (_, _error, queryArg) =>
        providesList(
          queryArg.arrayOfTimeSheetId.map(el => ({id: el})),
          'TimeSheet',
        ),
      onQueryStarted: ({arrayOfTimeSheetId}, {dispatch, queryFulfilled}) => {
        const {timesheetApiListParams} = store.getState().apiListParamsReducer;
        queryFulfilled.then(() => {
          dispatch(
            injectedRtkApi.util.updateQueryData(
              'getAllTimeSheetsApi',
              timesheetApiListParams,
              draft => {
                timesheetAdapter.removeMany(draft.data, arrayOfTimeSheetId);
              },
            ),
          );
        });
      },
    }),
    getTimeSheetByStatusApi: build.query<
      RtkSuccessResponse<TimeSheet[]>,
      GetTimeSheetByStatusPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<TimeSheet[]>) =>
        response,
      providesTags: result => providesList(result?.data, 'TimeSheet'),
    }),
    getTimeSheetsByOldestOrNewestApi: build.query<
      RtkSuccessResponse<TimeSheet[]>,
      GetAllRecordsByOldestOrNewestPayloadApiArg
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_ALL_RECORDS,
        params: {
          ...queryArg,
          type,
        },
      }),
      transformResponse: (response: RtkSuccessResponse<TimeSheet[]>) =>
        response,
      providesTags: result => providesList(result?.data, 'TimeSheet'),
    }),
  }),
});

export {injectedRtkApi as timeSheetApi, timesheetAdapter, timesheetSelector};
export const {
  useCreateTimeSheetApiMutation,
  useUpdateTimeSheetApiMutation,
  useAddTimeSheetToBillApiMutation,
  useDeleteTimeSheetApiMutation,
  useDeleteMultipleTimeSheetApiMutation,
  useGetAllTimeSheetsApiQuery,
  useGetTimeSheetByIdApiQuery,
  useGetTimeSheetByStatusApiQuery,
  useGetTimeSheetsByOldestOrNewestApiQuery,
  useSearchTimeSheetApiQuery,
} = injectedRtkApi;
