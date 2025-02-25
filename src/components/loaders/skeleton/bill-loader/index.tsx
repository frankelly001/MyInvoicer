import React, {FunctionComponent} from 'react';
import {Animated, ScrollViewProps, View, ViewStyle} from 'react-native';
import SkeletonLoaderView from '../loader-view';
import {billListCardStyles, billListStyles} from './styles';
import {wp} from '../../../../config/const';

const SkeletonBillListloader: FunctionComponent<{
  listLength?: number;
  contentContainerStyle?: ViewStyle;
  scrollViewProps?: ScrollViewProps;
  contentContainerPaddingTop?: number;
}> = ({
  listLength = 10,
  contentContainerStyle,
  scrollViewProps,
  contentContainerPaddingTop = 0,
}) => {
  const list = Array.from({length: listLength}, (_, i) => ({
    id: `sample-${i + 1}`,
  }));
  const styles = billListStyles;

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: wp(contentContainerPaddingTop + 16),
          paddingBottom: wp(16),
        },
        contentContainerStyle,
      ]}
      {...scrollViewProps}>
      {list.map(el => (
        <BillListCard key={el.id} />
      ))}
    </Animated.ScrollView>
  );
};

const BillListCard: FunctionComponent = () => {
  const styles = billListCardStyles;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer1}>
        <SkeletonLoaderView style={styles.listContent} />
        <SkeletonLoaderView style={styles.listContent} />
      </View>

      <View style={styles.flex1} />
      <View style={styles.subContainer2}>
        <SkeletonLoaderView style={styles.listContent} />
        <SkeletonLoaderView style={styles.listContent} />
      </View>
    </View>
  );
};

export default SkeletonBillListloader;
