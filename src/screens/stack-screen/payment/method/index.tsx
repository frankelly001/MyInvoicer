import React, {FunctionComponent, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {ArrowLeftIcon} from '../../../../assets/svg';
import {
  AppButton,
  AppHeader,
  AppLoading,
  AppScreen,
  AppText,
} from '../../../../components';
import {useColors} from '../../../../hooks/useColors';
import {GeneralScreenProps} from '../../../../navigation/types';
import {paymentMethodStyles} from './styles';

const PaymentMethod: FunctionComponent<
  GeneralScreenProps<'PAYMENT_METHOD'>
> = ({navigation}) => {
  const colors = useColors();
  const [selected, setSelected] = useState<string | null>(null);

  const styles = paymentMethodStyles({colors});

  return (
    <AppScreen isScrollable={false}>
      <AppLoading visible={false} />
      <AppHeader
        LeftContent={<ArrowLeftIcon fill={colors.highlight_5} />}
        middleTitle="Account Settings"
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <AppText
                text={'Choose a payment method'}
                type="heading_h3"
                style={styles.mb8}
              />
              <AppText
                text={"You won't be charged until the new month"}
                type="body_s"
                color="neutral_dark_2"
              />
            </View>
            <View
              style={{
                paddingHorizontal: 24,
                paddingTop: 12,
                paddingBottom: 6,
              }}></View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.subBtnContainer}>
        <AppButton text="Save" onPress={() => navigation.goBack()} />
      </View>
    </AppScreen>
  );
};

export default PaymentMethod;
