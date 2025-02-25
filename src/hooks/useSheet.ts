import {useRef} from 'react';
import {Modalize} from 'react-native-modalize';

export const useSheet = () => {
  const sheetRef = useRef<Modalize>(null);
  const openSheet = () => sheetRef.current?.open();
  const closeSheet = () => sheetRef.current?.close();

  return {
    sheetRef,
    openSheet,
    closeSheet,
  };
};
