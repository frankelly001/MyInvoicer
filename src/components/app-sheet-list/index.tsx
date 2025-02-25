import React from 'react';
import AppSeperator from '../app-seperator';
import {TouchableOpacity, View} from 'react-native';
import {useColors} from '../../hooks/useColors';
import {appSheetListStyle} from './styles';
import {AppSheetListProps} from './type';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AppText from '../app-text';

const AppSheetList = <ItemT,>({
  sheetRef,
  closeSheet = () => null,
  title,
  onClose = () => null,
  removeHeader,
  AdditionalHeaderContent,
  onOpen = () => null,
  HeaderComponent,
  FooterComponent,
  adjustToContentHeight = true,
  panGestureEnabled,
  closeOnOverlayTap,
  ...flatlistProps
}: AppSheetListProps<ItemT>) => {
  const colors = useColors();

  const styles = appSheetListStyle({colors});

  return (
    <Portal>
      <Modalize
        panGestureEnabled={panGestureEnabled}
        closeOnOverlayTap={closeOnOverlayTap}
        overlayStyle={styles.overLay}
        keyboardAvoidingOffset={30}
        ref={sheetRef}
        onClose={onClose}
        onBackButtonPress={() => {
          closeSheet();
          return true;
        }}
        onOpen={onOpen}
        withHandle={false}
        modalStyle={styles.modal}
        adjustToContentHeight={adjustToContentHeight}
        HeaderComponent={
          !removeHeader ? (
            <>
              {HeaderComponent ? (
                HeaderComponent
              ) : (
                <View style={styles.headerContainer}>
                  <View style={styles.modalHeader}>
                    <AppText text={title} type="heading_h4" />
                    <TouchableOpacity onPress={closeSheet}>
                      <AppText
                        text={'Cancel'}
                        type="action_m"
                        color="highlight_5"
                      />
                    </TouchableOpacity>
                  </View>
                  {AdditionalHeaderContent}
                  <AppSeperator paddingHorizontal={0} />
                </View>
              )}
            </>
          ) : undefined
        }
        FooterComponent={
          FooterComponent ? FooterComponent : <View style={styles.footer} />
        }
        flatListProps={flatlistProps}
      />
    </Portal>
  );
};

export default AppSheetList;
