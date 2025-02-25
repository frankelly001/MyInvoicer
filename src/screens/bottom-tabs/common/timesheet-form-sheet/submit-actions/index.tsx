import React, {FunctionComponent} from 'react';
import {AppButton} from '../../../../../components';
import {timeSheetFormStyles} from '../styles';

const SubmitActions: FunctionComponent<{
  onDiscard: () => void;
  onSave: () => void;
}> = ({onDiscard, onSave}) => {
  const styles = timeSheetFormStyles();
  return (
    <>
      <AppButton
        text={'Discard'}
        borderWidth={1.5}
        borderColor="support_error_3"
        buttonColor="neutral_light_1"
        textColor="support_error_3"
        style={styles.addItemSubmit}
        onPress={onDiscard}
      />
      <AppButton
        text={'Save'}
        borderWidth={1.5}
        borderColor="highlight_5"
        style={styles.addItemSubmit}
        onPress={onSave}
      />
    </>
  );
};

export default SubmitActions;
