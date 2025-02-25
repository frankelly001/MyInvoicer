import React, {FunctionComponent} from 'react';
import {Image, View} from 'react-native';
import {useColors} from '../../hooks/useColors';
import {displayImageStyles} from './styles';
import {AppDisplayImageProps} from './type';

const AppDisplayImage: FunctionComponent<AppDisplayImageProps> = ({
  uri,
  size = 60,
  style,
  isCircular,
  borderColor,
  borderWidth,
}) => {
  const colors = useColors();
  const styles = displayImageStyles({
    colors,
    size,
    isCircular,
    borderColor,
    borderWidth,
  });
  return (
    <View style={[styles.imgContainer, style]}>
      {uri && (
        <Image
          source={{
            uri,
            cache: 'force-cache',
          }}
          style={styles.img}
        />
      )}
    </View>
  );
};

export default AppDisplayImage;
