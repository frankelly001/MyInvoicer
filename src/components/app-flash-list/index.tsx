import {AnimatedFlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useColors} from '../../hooks/useColors';
import AppLoadingProgressBar from '../app-loading-progress-bar';
import AppSeperator from '../app-seperator';
import {appFlashListStyles} from './styles';
import {AppFlatListProps} from './types';
import AppAlert from '../app-alert';
import SkeletonBillListloader from '../loaders/skeleton/bill-loader';

const AppFlashList = <T,>({
  isLoading,
  isFetchingMore,
  ItemSeparatorComponent = AppSeperator,
  contentContainerPaddingTop,
  onRefresh,
  listRef,
  emptyListAlert,
  ...listProps
}: AppFlatListProps<T>) => {
  const colors = useColors();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const styles = appFlashListStyles({contentContainerPaddingTop});

  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 5000);
    }
  }, [isRefreshing]);

  return (
    <AnimatedFlashList
      ref={listRef}
      estimatedItemSize={150}
      scrollEventThrottle={16}
      ListEmptyComponent={
        <>
          {isLoading ? (
            <SkeletonBillListloader
              scrollViewProps={{onScroll: listProps.onScroll}}
            />
          ) : (
            emptyListAlert && <AppAlert {...emptyListAlert} />
          )}
        </>
      }
      ListFooterComponent={
        isFetchingMore ? <AppLoadingProgressBar /> : undefined
      }
      onEndReachedThreshold={1}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={styles.contentContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={colors.neutral_light_1} // Adnroid
          colors={[colors.highlight_2, colors.highlight_4, colors.highlight_5]} // Android
          tintColor={colors.highlight_5} // IOS
          refreshing={isRefreshing}
          progressViewOffset={contentContainerPaddingTop}
          onRefresh={() => {
            setIsRefreshing(true);
            if (onRefresh) {
              onRefresh();
            }
          }}
        />
      }
      {...listProps}
    />
  );
};

export default AppFlashList;
