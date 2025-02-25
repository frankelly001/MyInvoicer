import React, {FunctionComponent} from 'react';
import {View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {billPreviewLoaderStyles} from './styles';
import {useColors} from '../../../../hooks/useColors';

const SkeletonLoaderView: FunctionComponent<{
  style?: ViewStyle | ViewStyle[];
}> = ({style}) => {
  const colors = useColors();
  return (
    <View style={[billPreviewLoaderStyles.container, style]}>
      <SkeletonPlaceholder
        backgroundColor={colors.highlight_1}
        highlightColor={colors.highlight_2}>
        <SkeletonPlaceholder.Item width={'100%'} height={'100%'} />
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonLoaderView;
