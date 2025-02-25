import React, {FunctionComponent} from 'react';
import {AppText} from '../../../../../components';
import {fontSz, generateFontFamily} from '../../../../../config/const';
import {useColors} from '../../../../../hooks/useColors';
import {formatTime} from '../../../../../utils/helpers';
import {timeSheetFormStyles} from '../styles';
import useTimer from '../../../../../hooks/useTimer';

const FormattedTextTimer: FunctionComponent = () => {
  const colors = useColors();
  const styles = timeSheetFormStyles({colors});
  const {elapsedTime} = useTimer();

  return (
    <AppText
      text={formatTime(elapsedTime)}
      align="center"
      color="neutral_dark_5"
      style={[
        styles.pv8,
        {
          fontFamily: generateFontFamily('Inter', 'Light'),
          color: colors.neutral_dark_5,
          fontSize: fontSz(67.57),
        },
      ]}
    />
  );
};
export default FormattedTextTimer;
