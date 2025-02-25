import {ViewStyle} from 'react-native';

export type paymentPlanProps = {
  title: string;
  subTitle?: string;
  price: string;
  frequency: string;
  isRecommended?: boolean;
};

export type PayPlanCardProps = {
  onPress?: () => void;
  style?: ViewStyle;
  selected?: boolean;
} & paymentPlanProps;

export type payplansProps = Array<
  {
    id: string;
    offers: string[];
  } & paymentPlanProps
>;
