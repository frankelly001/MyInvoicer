import {Ref} from 'react';
import {Modalize} from 'react-native-modalize';
import {IHandles} from 'react-native-modalize/lib/options';

export type ModalizeSheetRef = Ref<Modalize>;

export type BaseSheetProps = {
  sheetRef?: React.RefObject<IHandles>;
  closeSheet?: () => void;
  openSheet?: () => void;
};
