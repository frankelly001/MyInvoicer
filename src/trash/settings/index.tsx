/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, ReactNode, Ref, useState} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  AddFilledIcon,
  ArrowRightIcon,
  CheckIcon,
  CustomMoonIcon,
  DarkMoonIcon,
  LightMoonIcon,
} from '../../../../assets/svg';
import {
  AppAlert,
  AppHeader,
  AppScreen,
  AppSheet,
  AppText,
  AppScreenSheet,
  AppButton,
  AppTabTitleHeader,
  ProfileCard,
  AppBackButton,
} from '../../../../components';
import AppListButton from '../../../../components/app-list-button';
import {
  COLOR_MODE_TYPES,
  HEADER_TITLE_HEIGHT,
  MAIN_HEADER_HEIGHT,
} from '../../../../config/const';
import {routesNames} from '../../../../navigation/routes';
import localStorage from '../../../../utils/helpers/localStorage';
import {useColorMode, useColors} from '../../../../hooks/useColors';
import {useSheet} from '../../../../hooks/useSheet';
import {setColorMode} from '../../../../state/slices/colors/colorsSlice';
import {useAppDispatch} from '../../../../state/slices/store';
import {bottomSheetStyle, importSheetStyles, settingsStyles} from './styles';
import {AppBottomSheetProps} from './types';
import {authState} from '../../../../state/slices/auth/authSlice';
import {useSelector} from 'react-redux';
import {useGetAllBusinessesApiQuery} from '../../../../state/services/business/api';
import {GeneralScreenProps} from '../../../../navigation/types';
import {useStickyHeaderAnimation} from '../../../../hooks/useStickyHeaderAnimation';
import AnimatedHeaderContent from '../../../../components/animated-header/animated-header-content';

const AccountDetailsSheet: FunctionComponent<AppBottomSheetProps> = ({
  sheetRef,
  closeSheet,
}) => {
  const colors = useColors();
  const styles = bottomSheetStyle({colors});

  const bankDetails = [
    {label: 'Name', value: 'Dominic Ovo'},
    {label: 'Account Number', value: '47466632235'},
    {label: 'Bank', value: 'UBA Bank'},
  ];
  const personalDetails = [
    {label: 'Location', value: 'Califonia USA'},
    {label: 'Phone', value: '08132213689'},
    {label: 'Email', value: 'dominicovo@gmail.com'},
  ];

  return (
    <AppSheet
      sheetRef={sheetRef}
      disableBackDrop={true}
      enableSlideToClose={true}
      onPressButton={closeSheet}
      onBackPress={closeSheet}
      portal
      modalStyle={styles.profileModal}
      adjustToContentHeight
      handlePosition="inside"
      handleStyle={styles.contentContainer}>
      <View style={styles.profileModalContainer}>
        <ProfileCard isVerified disable removeChatBtn />
        {bankDetails.map(item => (
          <View key={item.label} style={styles.bankCard}>
            <AppText
              text={item.value}
              type="heading_h5"
              align="center"
              style={styles.mb8}
            />
            <AppText
              text={item.label}
              type="body_xs"
              align="center"
              color="neutral_dark_4"
            />
          </View>
        ))}
        {personalDetails.map(item => (
          <View key={item.label} style={styles.detailCard}>
            <AppText text={item.label} type="body_s" color="neutral_dark_2" />
            <AppText text={item.value} type="heading_h5" />
          </View>
        ))}
      </View>
    </AppSheet>
  );
};

const AppearanceSheet: FunctionComponent<{
  sheetRef: Ref<Modalize>;
  closeSheet: () => void;
}> = ({sheetRef, closeSheet}) => {
  const colors = useColors();
  const dispatch: any = useAppDispatch();

  const {mode} = useColorMode();

  const [selected, setSelected] = useState<COLOR_MODE_TYPES>(mode);

  const createBtns: {
    name: COLOR_MODE_TYPES;
    Icon: ReactNode;
  }[] = [
    {
      name: 'light',
      Icon: <LightMoonIcon fill={colors.neutral_dark_4} />,
    },
    {
      name: 'dark',
      Icon: <DarkMoonIcon fill={colors.neutral_dark_4} />,
    },
    {
      name: 'custom',
      Icon: <CustomMoonIcon fill={colors.neutral_dark_4} />,
    },
  ];

  const styles = importSheetStyles({colors});

  return (
    <AppScreenSheet
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      title="Appearance">
      <>
        <AppListButton
          disabled
          title="Select an appearance"
          titleSize="caption_m"
          textTranform="uppercase"
          titleColor="neutral_dark_2"
        />
        <View style={styles.createItemBtnContainer}>
          {createBtns.map(({Icon, name}) => (
            <TouchableOpacity
              onPress={() => setSelected(name)}
              key={name}
              style={[
                styles.createItem,
                styles.createItemBtn,
                name === selected ? styles.createItemSelected : null,
              ]}>
              {Icon}
              <AppText
                text={name}
                type="body_m"
                textTransform="capitalize"
                color="neutral_dark_5"
                style={styles.itemTitle}
              />
              {name === selected && <CheckIcon />}
            </TouchableOpacity>
          ))}
        </View>
        <AppButton
          text="Done"
          disabled={mode === selected}
          onPress={() => {
            if (selected) {
              dispatch(setColorMode(selected));
            }
            closeSheet();
            localStorage.store(localStorage.keys.COLOR_MODE, selected);
          }}
        />
      </>
    </AppScreenSheet>
  );
};

const Settings: FunctionComponent<GeneralScreenProps<'SETTINGS'>> = ({
  navigation,
}) => {
  const colors = useColors();

  const [showNotice, setShowNotice] = useState(false);

  const {user} = useSelector(authState);

  const {
    sheetRef: acctDetailsSheetRef,
    // openSheet: acctDetailsOpenSheet,
    closeSheet: acctDetailsCloseSheet,
  } = useSheet();
  const {
    sheetRef: appearanceSheetRef,
    openSheet: openAppearanceSheet,
    closeSheet: closeAppearanceSheet,
  } = useSheet();

  const {data: bussinessData} = useGetAllBusinessesApiQuery({page: 1});

  const others = [
    {
      name: 'Payment Plan',
      onPress: () => navigation.navigate(routesNames.PAYMENT_PLAN),
    },
    {
      name: 'Tax info',
      onPress: () => null,
    },
    {
      name: 'Appearance',
      onPress: openAppearanceSheet,
    },
  ];

  const styles = settingsStyles({colors});

  const {onScroll, translateY} = useStickyHeaderAnimation(
    MAIN_HEADER_HEIGHT + HEADER_TITLE_HEIGHT,
  );

  return (
    <AppScreen
      onScroll={onScroll}
      scrollEventThrottle={1}
      ScreenHeader={
        <>
          <AppHeader
            onPressLeft={() => null}
            middleContent={
              <AnimatedHeaderContent
                containerStyle={{
                  top: -(MAIN_HEADER_HEIGHT + HEADER_TITLE_HEIGHT),
                }}
                translateY={translateY}>
                <AppText
                  color={'neutral_dark_5'}
                  text={'Settings'}
                  align="center"
                  textTransform="capitalize"
                  type={'heading_h4'}
                />
              </AnimatedHeaderContent>
            }
            leftContent={<AppBackButton title="More" />}
          />
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: 0,
                right: 0,
                top: MAIN_HEADER_HEIGHT,
                zIndex: -1,
                transform: [
                  {
                    translateY: Animated.multiply(translateY, 1),
                  },
                ],
              },
            ]}>
            <AppTabTitleHeader screenTitle="Settings" />
          </Animated.View>
        </>
      }>
      <AppAlert
        title="Log out"
        description={
          "Are you sure you want to log out? You'll need to login again to use the app."
        }
        visible={showNotice}
        yesTitle={'Log out'}
        onNoPress={() => setShowNotice(false)}
        onYesPress={() => setShowNotice(false)}
      />

      <View style={styles.profileLabelContainer}>
        <AppListButton
          disabled
          title={'PROFILE'}
          titleSize="caption_m"
          titleColor="neutral_dark_2"
        />
      </View>
      <ProfileCard
        isVerified
        onPress={() => navigation.navigate(routesNames.PROFILE)}
        containerStyle={styles.profileCard}
        fullname={user?.fullName}
        email={user?.email}
      />

      <View style={styles.optionsContainer}>
        <AppListButton
          disabled
          title={'MY BUSINESS'}
          titleSize="caption_m"
          titleColor="neutral_dark_2"
          RightIcon={
            <TouchableOpacity
              onPress={() => navigation.navigate(routesNames.ADD_BUSINESS)}>
              <AddFilledIcon />
            </TouchableOpacity>
          }
        />
        {bussinessData?.data.map((item, i) => {
          return (
            <AppListButton
              onPress={() =>
                navigation.navigate(routesNames.BUSINESS_DETAILS, {
                  business: {id: item.id, name: item.businessName},
                })
              }
              key={i}
              title={item.businessName}
              RightIcon={<ArrowRightIcon fill={colors.neutral_dark_1} />}
              borderType={'Bottom'}
            />
          );
        })}
      </View>
      <View style={[styles.optionsContainer, styles.othersContainer]}>
        <AppListButton
          disabled
          title={'OTHERS'}
          titleSize="caption_m"
          titleColor="neutral_dark_2"
        />
        {others.map((item, i) => {
          return (
            <AppListButton
              onPress={item.onPress}
              key={i}
              title={item.name}
              RightIcon={<ArrowRightIcon fill={colors.neutral_dark_1} />}
              borderType={'Bottom'}
            />
          );
        })}
      </View>
      <AccountDetailsSheet
        sheetRef={acctDetailsSheetRef}
        closeSheet={acctDetailsCloseSheet}
      />
      <AppearanceSheet
        sheetRef={appearanceSheetRef}
        closeSheet={closeAppearanceSheet}
      />
    </AppScreen>
  );
};

export default Settings;
