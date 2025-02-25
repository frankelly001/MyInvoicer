import React, {FunctionComponent} from 'react';
import {AppBottomSheet} from '../../../../../components';
import {ReceiptStatusTypes} from '../../../../../utils/constants/status';
import {BaseSheetProps} from '../../../../../types/Sheet';
import {
  ColumnsIcon,
  CreditCardIcon,
  DollarIcon,
} from '../../../../../assets/svg';
import {useColors} from '../../../../../hooks/useColors';

const ReceiptChartFilterSheet: FunctionComponent<
  {
    onFilterPress?: (status: ReceiptStatusTypes | null) => void;
  } & BaseSheetProps
> = ({onFilterPress = () => null, closeSheet, sheetRef}) => {
  const colors = useColors();

  const filterOptionsBtns = [
    {
      name: 'Card',
      Icon: (
        <CreditCardIcon width={20} height={20} stroke={colors.neutral_dark_4} />
      ),
      onPress: () => onFilterPress('card'),
    },
    {
      name: 'Cash',
      Icon: <DollarIcon width={20} height={20} fill={colors.neutral_dark_4} />,
      onPress: () => onFilterPress('cash'),
    },
    {
      name: 'Transfer',
      Icon: (
        <ColumnsIcon width={20} height={20} stroke={colors.neutral_dark_4} />
      ),
      onPress: () => onFilterPress('transfer'),
    },
  ];

  return (
    <AppBottomSheet
      title="Filter"
      optionsBtns={filterOptionsBtns}
      closeSheet={closeSheet}
      sheetRef={sheetRef}
    />
  );
};

export default ReceiptChartFilterSheet;
