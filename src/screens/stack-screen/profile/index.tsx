import React, {FunctionComponent, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ArrowRightIcon, EditIcon, LogoutIcon} from '../../../assets/svg';

import {useDispatch, useSelector} from 'react-redux';
import {
  AppBackButton,
  AppConfirm,
  AppDisplayImage,
  AppHeader,
  AppScreen,
  AppTabTitleHeader,
  AppText,
} from '../../../components';
import AppListButton from '../../../components/app-list-button';
import {useColors} from '../../../hooks/useColors';
import {GeneralScreenProps} from '../../../navigation/types';
import {baseApi} from '../../../state/services/baseApi';
import {authState, logOut} from '../../../state/slices/auth/authSlice';
import {settingsStyles} from './styles';

const Profile: FunctionComponent<GeneralScreenProps<'PROFILE'>> = () => {
  const colors = useColors();

  const [showNotice, setShowNotice] = useState(false);
  const dispatch = useDispatch();

  const {user} = useSelector(authState);

  const options = [
    {
      name: 'Support',
      onPress: () => null,
    },
    {
      name: 'Terms of service ',
      onPress: () => null,
    },
    {
      name: 'Privacy policy',
      onPress: () => null,
    },
  ];

  const styles = settingsStyles({colors});

  return (
    <AppScreen isScrollable={false}>
      <AppHeader
        onPressLeft={() => null}
        LeftContent={<AppBackButton title="More" />}
      />
      <AppTabTitleHeader screenTitle="Profile" />
      <View style={styles.profileContainer}>
        <View>
          <AppDisplayImage
            uri="https://wallpapercave.com/wp/wp12164362.jpg"
            size={90}
            borderColor="neutral_light_4"
            borderWidth={3}
            isCircular
          />
          <TouchableOpacity style={styles.profileIcon}>
            <EditIcon fill={colors.neutral_light_1} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetailsContainer}>
          <AppText text={user?.fullName} type="heading_h3" align="center" />
          <AppText
            text={user?.email}
            type="body_s"
            color="neutral_dark_2"
            align="center"
            style={styles.email}
          />
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((item, i) => {
          return (
            <AppListButton
              key={i}
              title={item.name}
              RightIcon={<ArrowRightIcon fill={colors.neutral_dark_1} />}
              borderType={'Bottom'}
            />
          );
        })}
        <AppListButton
          title={'Log out'}
          titleColor="support_error_3"
          RightIcon={<LogoutIcon stroke={colors.support_error_3} />}
          onPress={() => setShowNotice(true)}
        />
      </View>

      <AppConfirm
        title="Log out"
        description={
          "Are you sure you want to log out? You'll need to login again to use the app."
        }
        visible={showNotice}
        yesTitle={'Log out'}
        onNoPress={() => setShowNotice(false)}
        onYesPress={() => {
          dispatch(logOut());
          dispatch(baseApi.util.resetApiState());
        }}
      />
    </AppScreen>
  );
};

export default Profile;
