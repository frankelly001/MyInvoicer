/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {
  RadioBtnEmptyIcon,
  RadioBtnIcon,
  RecommendedIcon,
  StarIcon,
} from '../../../../assets/svg';
import {
  AppBackButton,
  AppButton,
  AppHeader,
  AppLoading,
  AppScreen,
  AppText,
} from '../../../../components';
import {useColors} from '../../../../hooks/useColors';
import {routesNames} from '../../../../navigation/routes';
import {payPlanCardStyles, paymentPlanStyles} from './styles';
import {PayPlanCardProps} from './types';
import {GeneralScreenProps} from '../../../../navigation/types';
import {useGetPaymentPlansQuery} from '../../../../state/services/payment/api';
import {PlanNames} from '../../../../types/Payment';

const PaymentPlan: FunctionComponent<GeneralScreenProps<'PAYMENT_PLAN'>> = ({
  navigation,
}) => {
  const colors = useColors();

  const {data: paymentPlans} = useGetPaymentPlansQuery();
  const [selected, setSelected] = useState<PlanNames | null>(null);

  const styles = paymentPlanStyles({colors});

  useEffect(() => {
    if (paymentPlans?.currentPlan) {
      setSelected(paymentPlans?.currentPlan);
    }
  }, [paymentPlans?.currentPlan]);

  return (
    <AppScreen
      isScrollable={false}
      ScreenHeader={
        <AppHeader LeftContent={<AppBackButton title="Settings" />} />
      }>
      <AppLoading visible={false} />

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <AppText text={'Payment Plan'} type="heading_h1" />
              <AppText
                text={
                  'Choose a plan that best suits your business. You can cancel anytime.'
                }
                type="body_s"
                color="neutral_dark_2"
                style={styles.description}
              />
            </View>
            <View style={styles.payPlansContainer}>
              {paymentPlans?.plans
                .map(item => (
                  <PayPlanCard
                    key={item.name}
                    title={item.name}
                    // subTitle={item.}
                    price={`${item.currency} ${item.amountPerMonth}`}
                    frequency={`Per ${item.periodPerMonth}`}
                    isRecommended={item.name === 'pro'}
                    style={styles.mv6}
                    selected={item.name === selected}
                    onPress={() => setSelected(item.name)}
                  />
                ))
                .reverse()}

              {selected && (
                <View style={styles.offers}>
                  <AppText
                    text={
                      paymentPlans?.plans.find(el => el.name === selected)
                        ?.description
                    }
                    type="heading_h3"
                    style={styles.mb16}
                  />
                  <View style={{gap: 16}}>
                    {paymentPlans?.plans
                      .find(el => el.name === selected)
                      ?.benefits.map(item => (
                        <View key={item} style={[styles.payOffer]}>
                          <StarIcon fill={colors.highlight_5} />
                          <AppText
                            text={item}
                            type="body_s"
                            style={styles.offerTitle}
                          />
                        </View>
                      ))}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.subBtnContainer}>
        <AppButton
          text="Subscribe"
          disabled={selected === paymentPlans?.currentPlan}
          onPress={() => navigation.navigate(routesNames.PAYMENT_METHOD)}
        />
      </View>
    </AppScreen>
  );
};

export default PaymentPlan;

const PayPlanCard: FunctionComponent<PayPlanCardProps> = ({
  frequency,
  onPress,
  price,
  isRecommended,
  subTitle,
  title,
  style,
  selected,
}) => {
  const colors = useColors();
  const styles = payPlanCardStyles({colors, selected});
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {selected ? <RadioBtnIcon /> : <RadioBtnEmptyIcon />}
      <View style={styles.titleContainer}>
        <AppText text={title} textTransform="capitalize" type="heading_h4" />
        {subTitle && (
          <AppText
            text={subTitle}
            type="body_xs"
            color="highlight_5"
            style={styles.mt4}
          />
        )}
      </View>
      <View style={styles.h100}>
        <View style={styles.priceContainer}>
          <AppText text={price} type="heading_h3" />
          <AppText text={frequency} type="body_xs" />
        </View>
      </View>
      {isRecommended && (
        <View style={styles.recommendedIcon}>
          <RecommendedIcon />
        </View>
      )}
    </TouchableOpacity>
  );
};
