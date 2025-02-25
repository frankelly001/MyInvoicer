import {BaseSheetProps} from '../../types/Sheet';

export type AppChartFilterSheetProps = {
  filterOptionsBtns: {
    label?: string;
    value?: string;
    onPress?: () => void;
  }[];
} & BaseSheetProps;
