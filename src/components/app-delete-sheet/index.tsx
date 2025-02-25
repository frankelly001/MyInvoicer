import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {FunctionComponent, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {DeleteIcon} from '../../assets/svg';
import {useColors} from '../../hooks/useColors';
import AppSheet from '../app-sheet';
import AppText from '../app-text';
import {appDeleteSheetStyles} from './styles';
import {AppDeleteSheetProps} from './type';

const AppDeleteSheet: FunctionComponent<AppDeleteSheetProps> = ({
  closeSheet = () => null,
  onClose,
  onOpen,
  onPressDelete = () => null,
  withOverlay = false,
  sheetRef,
  shouldCloseSheetWhenItemPressed = true,
}) => {
  const colors = useColors();
  const route = useRoute();

  const styles = appDeleteSheetStyles({colors});

  useFocusEffect(
    useCallback(() => {
      return () => {
        closeSheet();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.name]),
  );

  return (
    <AppSheet
      sheetRef={sheetRef}
      adjustToContentHeight
      withHandle={false}
      disableBackDrop
      onPressButton={closeSheet}
      onBackPress={closeSheet}
      onClose={onClose}
      onOpen={onOpen}
      enableSlideToClose={false}
      overlayStyle={styles.overlay}
      withOverlay={withOverlay}
      modalStyle={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            onPressDelete();
            if (shouldCloseSheetWhenItemPressed) {
              closeSheet();
            }
          }}
          style={styles.btnContainer}>
          <DeleteIcon fill={colors.support_error_3} />
          <AppText
            text={'Delete selected'}
            type={'body_xs'}
            color={'support_error_3'}
          />
        </TouchableOpacity>
      </View>
    </AppSheet>
  );
};

export default AppDeleteSheet;
