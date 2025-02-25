import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import {AppSelectInput, AppText} from '../../../../components';
import {
  PeriodOptions,
  periodHandler,
} from '../../../../utils/helpers/periodHandler';
import {styles} from '../styles';
import BillChart from './bill-chart';

const BilledPaidChart: FunctionComponent = () => {
  const [peroid, setPeroid] = useState<{
    value: PeriodOptions;
    startDate: string;
    endDate: string;
  }>({
    value: 'this month',
    ...periodHandler('this month'),
  });

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <AppText
          text="Billed/Paid"
          type="heading_h3"
          color="neutral_dark_5"
          style={styles.flex1_5}
        />

        <AppSelectInput
          data={[
            {value: 'today', label: 'Today'},
            {value: 'this week', label: 'This Week'},
            {value: 'this month', label: 'This Month'},
            {value: 'this year', label: 'This Year'},
          ]}
          value={peroid?.value}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.input}
          onChange={item => {
            const selectedPeroid = periodHandler(item.value as PeriodOptions);
            setPeroid({
              value: item.value as PeriodOptions,
              ...selectedPeroid,
            });
          }}
        />
      </View>

      <View style={styles.chartContainer}>
        <BillChart endDate={peroid.endDate} startDate={peroid.startDate} />
      </View>
    </View>
  );
};

export default BilledPaidChart;
