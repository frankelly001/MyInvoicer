import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppButton from '../app-button';
import AppModalOverlay from '../app-modal-overlay';
import AppText from '../app-text';
import {appConfirmStyles} from './styles';
import {DeleteNoticeProps} from './types';

const AppConfirm: FunctionComponent<DeleteNoticeProps> = ({
  visible,
  onYesPress,
  onNoPress,
  description = 'Are you sure, you want to Delete item?',
  title = 'Title',
  noTitle: cancelBtnText = 'Cancel',
  yesTitle: deleteBtnText = 'Yes',
  noBtnProps,
  yesBtnProps,
}) => {
  const colors = useColors();
  const styles = appConfirmStyles({colors});

  return (
    <AppModalOverlay visible={visible}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <AppText
            text={title}
            type={'heading_h3'}
            align="center"
            color="neutral_dark_5"
          />
          <AppText
            text={description}
            type={'body_s'}
            align="center"
            color="neutral_dark_2"
            style={styles.noticeDesc}
          />
        </View>

        <View style={styles.btnContainer}>
          <AppButton
            text={cancelBtnText}
            buttonColor="neutral_light_1"
            borderColor="highlight_5"
            textColor="highlight_5"
            borderWidth={1.5}
            style={styles.btn}
            onPress={onNoPress}
            {...noBtnProps}
          />
          <AppButton
            text={deleteBtnText}
            buttonColor="highlight_5"
            borderColor="highlight_5"
            textColor="neutral_light_1"
            borderWidth={1.5}
            style={styles.btn}
            onPress={onYesPress}
            {...yesBtnProps}
          />
        </View>
      </View>
    </AppModalOverlay>
  );
};

export default AppConfirm;
