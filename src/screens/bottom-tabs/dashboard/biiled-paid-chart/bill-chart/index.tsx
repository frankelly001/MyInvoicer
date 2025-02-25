import React, {FunctionComponent} from 'react';
import {Dimensions, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';
import {useColors} from '../../../../../hooks/useColors';
import {useGetDashboardChartApiQuery} from '../../../../../state/services/dashboard-chart/api';
import {wp} from '../../../../../config/const';
import {BillPreviewLoader} from '../../../../../components';
import {logThis} from '../../../../../utils/helpers';

const screenWidth = Dimensions.get('window').width;

const BillChart: FunctionComponent<{startDate: string; endDate: string}> = ({
  endDate,
  startDate,
}) => {
  const colors = useColors();

  const {data: dashboardChart, isLoading} = useGetDashboardChartApiQuery({
    startDate,
    endDate,
  });

  logThis('dashboardChart...', dashboardChart);

  const data: ChartData = {
    labels: ['15th', '21st', '22nd'],
    datasets: [
      {
        data: [400, 650, 300],
        colors: [
          () => colors.support_warning_2,
          () => colors.support_sucess_2,
          () => colors.support_warning_2,
        ],
        strokeDashArray: [0],
      },
    ],
  };
  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: colors.neutral_light_1,
    backgroundGradientTo: colors.neutral_light_1,

    color: () => colors.neutral_dark_2,
    labelColor: () => colors.neutral_dark_5,
    // formatTopBarValue: () => 5,
    strokeWidth: 10,
    barPercentage: 1,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    // paddingRight: 32,
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines with no dashes
      strokeWidth: 1,
      stroke: colors.neutral_light_3, // use a color that matches the background or grid
      marginRight: 50,
    },
    barRadius: 5,
  };
  return isLoading ? (
    <View style={{height: wp(188.07)}}>
      <BillPreviewLoader />
    </View>
  ) : (
    <BarChart
      data={data}
      width={screenWidth - 32}
      height={wp(188.07)}
      yAxisLabel="$"
      yAxisSuffix=""
      chartConfig={chartConfig}
      // showValuesOnTopOfBars
      showBarTops={false}
      withCustomBarColorFromData
      // withInnerLines={false}
      flatColor
      // segments={8}

      // hidePointsAtIndex={[1]}
    />
  );
};

export default BillChart;
