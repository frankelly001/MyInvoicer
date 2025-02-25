import {TEXT_SIZES} from '../../config/const';

export type AppTabSwitcherProps = {
  selectedIndex?: number;
  tabs?: {name: string}[];
  onChangeTab?: (index: number) => void;
  disabled?: boolean;
  tabLabelType?: TEXT_SIZES;
  width?: number;
};
