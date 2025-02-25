import {HttpSuccessResponse} from '../../../types/ApiResponse';
import {baseApi as api} from '../baseApi';
import {generalEndpoints} from '../general/endpoints';
import {ChartData} from './type';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getDashboardChartApi: build.query<
      ChartData[],
      {startDate: string; endDate: string}
    >({
      query: queryArg => ({
        url: generalEndpoints.GET_CHART_DATA,
        params: queryArg,
      }),
      transformResponse: (response: HttpSuccessResponse<ChartData[]>) =>
        response.data,
    }),
  }),
});
export {injectedRtkApi as dashboardChartApi};
export const {useGetDashboardChartApiQuery} = injectedRtkApi;
