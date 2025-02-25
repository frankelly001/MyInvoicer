export type AppNumberTabProps = {
  selectedIndex?: number;
  tabs?: {name: string}[];
  onChangeTab?: (index: number) => void;
  tabErrorIndex?: number[];
  // disabled?: boolean;
};
