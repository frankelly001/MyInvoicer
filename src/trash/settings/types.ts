import {IHandles} from 'react-native-modalize/lib/options';

export type AppBottomSheetProps = {
  sheetRef: React.Ref<IHandles>;
  closeSheet: () => void;
};
