import React, {FunctionComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {detectTouch} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {imageInputStyles} from './styles';
import {ImageInputProps} from './types';
import {uploadImage} from '../../utils/helpers/uploadImage';
import AppDisplayImage from '../app-display-image';

const AppImageInput: FunctionComponent<ImageInputProps> = ({
  label = 'Upload your business logo',
  placeholder = '(up to 12 Mb)',
  style,
  onChange = () => null,
  value,
}) => {
  const colors = useColors();
  const styles = imageInputStyles({colors});
  const uploadFromGallery = async () => {
    const res = await uploadImage({
      from: 'openPicker',
      crop: {shouldCrop: true, height: 100, width: 100},
    });
    if (res) {
      onChange(res);
    }
  };

  return (
    <TouchableOpacity
      hitSlop={detectTouch}
      style={[styles.container, style]}
      onPress={uploadFromGallery}>
      {!value ? (
        <>
          <AppText
            text={label}
            type="action_m"
            color="neutral_dark_2"
            style={styles.label}
          />
          <AppText text={placeholder} type="body_xs" color="neutral_dark_2" />
        </>
      ) : (
        <AppDisplayImage size={60} uri={value} />
      )}
    </TouchableOpacity>
  );
};

export default AppImageInput;
