import React, {FunctionComponent} from 'react';
import {AppBottomSheet} from '../../../../../components';
import {BaseSheetProps} from '../../../../../types/Sheet';
import {DeleteIcon, EditSquareIcon} from '../../../../../assets/svg';
import {useColors} from '../../../../../hooks/useColors';

const TimesheetFilter: FunctionComponent<
  BaseSheetProps & {onSelect?: (type: 'billed' | 'unbilled') => void}
> = ({closeSheet, sheetRef, onSelect = () => null}) => {
  const colors = useColors();
  const createBtns = [
    {
      name: 'Billed',
      onPress: () => onSelect('billed'),
      Icon: <EditSquareIcon fill={colors.neutral_dark_5} />,
    },

    {
      name: 'Non-Billed',
      onPress: () => onSelect('unbilled'),
      Icon: <DeleteIcon fill={colors.neutral_dark_5} />,
    },
  ];
  return (
    <AppBottomSheet
      title="Filter by"
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      shouldCloseSheetOnItemPressed
      optionsBtns={createBtns}
    />
  );
};

export default TimesheetFilter;
