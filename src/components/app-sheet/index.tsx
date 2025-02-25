import React, {FunctionComponent} from 'react';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {appSheetstyles} from './styles';
import {SheetTypes} from './type';

const AppSheet: FunctionComponent<SheetTypes> = (_props: any) => {
  const {
    enableSlideToClose = true,
    disableBackDrop,
    sheetRef,
    onBackPress,
    modalStyle,
    snapHeight = 0,
    children,
    portal = true,
    ...otherProps
  } = _props;
  const Container = portal ? Portal : React.Fragment;
  return (
    <Container>
      <Modalize
        panGestureEnabled={enableSlideToClose}
        closeOnOverlayTap={disableBackDrop}
        overlayStyle={appSheetstyles.overLay}
        keyboardAvoidingOffset={30}
        alwaysOpen={snapHeight}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
          showsVerticalScrollIndicator: false,
        }}
        ref={sheetRef}
        onBackButtonPress={onBackPress}
        modalStyle={modalStyle}
        {...otherProps}>
        {children}
      </Modalize>
    </Container>
  );
};

export default AppSheet;
