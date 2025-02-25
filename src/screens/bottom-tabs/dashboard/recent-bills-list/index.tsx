import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import {AppSelectInput, AppText} from '../../../../components';
import {styles} from '../styles';
import RecentSentBillsList from './sent';
import RecentReceivedBillsList from './received';

const RecentBillsList: FunctionComponent = () => {
  const [billType, setBillType] = useState<'sent' | 'received'>('sent');

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <AppText
          text="Recent bills"
          type="heading_h3"
          color="neutral_dark_5"
          style={styles.flex1_5}
        />

        <AppSelectInput
          data={[
            {value: 'sent', label: 'Sent'},
            {value: 'received', label: 'Received'},
          ]}
          value={billType}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.input}
          onChange={value => setBillType(value.value as typeof billType)}
        />
      </View>

      {billType === 'sent' ? (
        <RecentSentBillsList />
      ) : (
        <RecentReceivedBillsList />
      )}
    </View>
  );
};

export default RecentBillsList;
