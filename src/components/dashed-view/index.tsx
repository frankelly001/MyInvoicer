import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {dashedViewstyles} from './styles';
import {DashedViewProps} from './type';

const DashedView: FunctionComponent<DashedViewProps> = ({
  label,
  value,
  style,
  labelColor = 'neutral_dark_2',
  valueColor,
}) => {
  const colors = useColors();
  const styles = dashedViewstyles({colors});

  return (
    <View style={[styles.billCard, style]}>
      <AppText
        text={value}
        type={'heading_h3'}
        color={valueColor}
        style={styles.price}
      />
      <AppText text={label} type={'body_s'} color={labelColor} />
    </View>
  );
};

export default DashedView;
