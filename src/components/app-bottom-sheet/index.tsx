import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppListButton from '../app-list-button';
import AppSheet from '../app-sheet';
import AppText from '../app-text';
import {bottomSheetStyle} from './styles';
import {AppBottomSheetProps} from './types';
import AppSeperator from '../app-seperator';

const AppBottomSheet: FunctionComponent<AppBottomSheetProps> = ({
  sheetRef,
  closeSheet = () => null,
  title,
  children,
  optionsBtns = [],
  onClose,
  onOpen,
  removeHeader,
  removeCancel,
  AdditionalHeaderContent,
  shouldCloseSheetOnItemPressed,
  FooterComponent,
  withHandle = false,
  handleStyle,
  adjustToContentHeight = true,
}) => {
  const colors = useColors();
  const styles = bottomSheetStyle({colors});

  return (
    <AppSheet
      sheetRef={sheetRef}
      disableBackDrop={true}
      enableSlideToClose={true}
      FooterComponent={FooterComponent}
      onPressButton={closeSheet}
      onBackPress={closeSheet}
      onOpen={onOpen}
      onClose={onClose}
      portal
      modalStyle={styles.modal}
      adjustToContentHeight={adjustToContentHeight}
      withHandle={withHandle}
      handleStyle={handleStyle}
      handlePosition="inside"
      HeaderComponent={
        <View style={styles.header}>
          {!removeHeader && (
            <>
              <View style={styles.modalHeader}>
                <AppText text={title} type="heading_h4" />
                {!removeCancel && (
                  <TouchableOpacity onPress={closeSheet}>
                    <AppText
                      text={'Cancel'}
                      type="action_m"
                      color="highlight_5"
                    />
                  </TouchableOpacity>
                )}
              </View>
              {AdditionalHeaderContent}
              <AppSeperator paddingHorizontal={0} />
            </>
          )}
        </View>
      }>
      <View style={styles.modalContainer}>
        {children ? (
          children
        ) : (
          <>
            <View style={styles.optionsContainer}>
              {optionsBtns.map(({Icon, name, onPress}) => (
                <AppListButton
                  key={name}
                  LeftIcon={Icon}
                  title={name}
                  onPress={() => {
                    if (onPress) {
                      onPress();
                    }
                    if (shouldCloseSheetOnItemPressed) {
                      closeSheet();
                    }
                  }}
                />
              ))}
            </View>
          </>
        )}
      </View>
    </AppSheet>
  );
};

export default AppBottomSheet;
