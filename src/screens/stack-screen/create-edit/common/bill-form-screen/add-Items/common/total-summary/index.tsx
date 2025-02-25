import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {createInvoicestyles} from '../../../styles';
import {AppText} from '../../../../../../../../components';

const TotalSummary: FunctionComponent<{total: string}> = ({total}) => {
  const styles = createInvoicestyles();
  return (
    <View style={styles.priceSum}>
      <AppText type="body_m" text="Total" color="neutral_dark_2" />
      <AppText type="heading_h3" text={total} color="neutral_dark_5" />
    </View>
  );
};

export default TotalSummary;
