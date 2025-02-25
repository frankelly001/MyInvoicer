import React, {FunctionComponent} from 'react';
import {ScrollView, View} from 'react-native';
import {AppText, BillPreviewLoader} from '../../../../components';
import {useColors} from '../../../../hooks/useColors';
import {billMetricsCarouselStyles} from './styles';
import {COLOR_TYPES} from '../../../../config/const';
import {useGetDashBoardBillingsApiQuery} from '../../../../state/services/customer/api';
import {getCurrencySymbol} from '../../../../utils/helpers';

const BillingMetricsCarousel: FunctionComponent<{businessId: string}> = ({
  businessId,
}) => {
  const colors = useColors();
  const styles = billMetricsCarouselStyles({colors});

  const {data, isLoading} = useGetDashBoardBillingsApiQuery({
    businessId,
  });

  const metrics: {label: string; value: string; color: COLOR_TYPES}[] = [
    {
      label: 'Overdue',
      value: `${getCurrencySymbol(data?.currency)}${data?.totalOverdueAmount}`,
      color: 'support_error_3',
    },
    {
      label: 'Pending',
      value: `${getCurrencySymbol(data?.currency)}${data?.totalPendingAmount}`,
      color: 'support_warning_3',
    },
    {
      label: 'Paid',
      value: `${getCurrencySymbol(data?.currency)}${data?.totalPaidAmount}`,
      color: 'support_sucess_3',
    },
  ];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}>
        {metrics.map(item =>
          isLoading ? (
            <BillPreviewLoader
              key={item.label}
              style={[styles.card, styles.loader]}
            />
          ) : (
            <View key={item.label} style={styles.card}>
              <AppText text={item.label} type="body_s" color="neutral_dark_2" />
              <AppText text={item.value} type="heading_h3" color={item.color} />
            </View>
          ),
        )}
      </ScrollView>
    </View>
  );
};

export default BillingMetricsCarousel;
