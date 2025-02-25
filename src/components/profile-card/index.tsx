import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ArrowRightIcon, SuccessIcon} from '../../assets/svg';
import {useColors} from '../../hooks/useColors';
import AppDisplayImage from '../app-display-image';
import AppText from '../app-text';
import {profileCardStyles} from './styles';
import {ProfileCardProps} from './type';

const ProfileCard: FunctionComponent<ProfileCardProps> = ({
  onPress,
  removeChatBtn,
  email,
  fullname,
  image = 'https://wallpapercave.com/wp/wp12164362.jpg',
  IconContent,
  disable,
  containerStyle,
  imageSize,
  isVerified,
  backgroundColor = 'highlight_1',
}) => {
  const colors = useColors();
  const styles = profileCardStyles({colors, backgroundColor});

  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[styles.profileCardContainer, containerStyle]}>
      {IconContent ? (
        IconContent
      ) : (
        <View>
          <AppDisplayImage
            uri={image}
            size={imageSize}
            isCircular
            borderWidth={2}
            borderColor="neutral_light_4"
          />
          {isVerified && (
            <View style={styles.verifiedIcon}>
              <SuccessIcon width={13} height={13} />
            </View>
          )}
        </View>
      )}
      <View style={styles.profileDetails}>
        <AppText text={fullname} type="action_l" style={styles.name} />
        <AppText text={email} type="body_s" color="neutral_dark_2" />
      </View>
      {!removeChatBtn && (
        <TouchableOpacity>
          <ArrowRightIcon fill={colors.highlight_5} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ProfileCard;
