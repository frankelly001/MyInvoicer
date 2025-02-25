import {COLOR_TYPES} from '../../config/const';

type BtnProps = {
  buttonColor?: COLOR_TYPES;
  borderColor?: COLOR_TYPES;
  textColor?: COLOR_TYPES;
};

export type DeleteNoticeProps = {
  visible?: boolean;
  onYesPress?: () => void;
  onNoPress?: () => void;
  yesTitle?: string;
  noTitle?: string;
  title?: string;
  description?: string;
  yesBtnProps?: BtnProps;
  noBtnProps?: BtnProps;
};
