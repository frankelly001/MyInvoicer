import {FunctionComponent} from 'react';
import React, {ActivityIndicator} from 'react-native';
import {useColors} from '../../../hooks/useColors';
import {AppVectorIcons, Icon} from '../../app-icons';
import AppLoadingProgressBar from '../../app-loading-progress-bar';
import AppSelectInput from '../../app-select-input';
import {CustomSelectInputProps} from '../type';

const CustomSelectInput: FunctionComponent<
  {
    loading: boolean;
    data: {label: string; value: string}[];
    refresh: () => void;
    onLoadMore?: () => void;
    isError: boolean;
  } & CustomSelectInputProps
> = ({
  loading,
  data,
  isError,
  refresh,
  onLoadMore,
  ...otherSelectInputProps
}) => {
  const colors = useColors();

  return (
    <AppSelectInput
      data={data ?? []}
      flatListProps={{
        onEndReached: onLoadMore,
        onEndReachedThreshold: 1,
        ListFooterComponent: loading ? <AppLoadingProgressBar /> : undefined,
      }}
      onFocus={() => {
        if (isError && !loading) {
          refresh();
        }
      }}
      onBlur={() => {
        if (isError && !loading) {
          refresh();
        }
      }}
      RightContent={
        loading ? (
          <ActivityIndicator />
        ) : isError ? (
          <Icon
            IconTag={AppVectorIcons.MaterialCommunityIcons}
            name="reload-alert"
            color={colors.support_error_2}
          />
        ) : undefined
      }
      {...otherSelectInputProps}
    />
  );
};

export default CustomSelectInput;
