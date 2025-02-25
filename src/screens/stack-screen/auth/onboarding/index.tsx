import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {OnBoardIcon} from '../../../../assets/svg';
import {AppButton, AppScreen, AppText} from '../../../../components';
import {useColors} from '../../../../hooks/useColors';
import {routesNames} from '../../../../navigation/routes';
import {GeneralScreenProps} from '../../../../navigation/types';
import {oboardingStyles} from './styles';

const Onboarding: FunctionComponent<GeneralScreenProps<'ONBOARDING'>> = ({
  navigation,
}) => {
  const colors = useColors();
  return (
    <AppScreen
      statusBarBackgroundColor="highlight_1"
      isScrollable={false}
      disableSafeArea>
      <View style={oboardingStyles({colors}).onBoard}>
        <OnBoardIcon />
      </View>
      <View style={oboardingStyles().subContainer}>
        <View style={oboardingStyles().description}>
          <AppText
            text={'All your invoices, estimates and customers in one place'}
            type="heading_h1"
            align="center"
          />
          <AppText
            text={
              'Streamline Your Finances with Our Invoice Management System | Boost Cash Flow'
            }
            type="body_m"
            color="neutral_dark_2"
            align="center"
            style={oboardingStyles().subText}
          />
        </View>

        <AppButton
          text="Next"
          onPress={() => navigation.navigate(routesNames.SIGNIN)}
        />
      </View>
    </AppScreen>
  );
};

export default Onboarding;
