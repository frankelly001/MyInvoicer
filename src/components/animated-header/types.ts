import React, {ReactNode} from 'react';
import {Animated, ListRenderItemInfo} from 'react-native';
import {AppHeaderProps} from '../app-header/type';

export type AnimatedTabHeaderProps<ItemT> = {
  screenTitle?: string;
  translateY?: Animated.AnimatedInterpolation<string | number> | number;
  scrollHeaderContent?: ReactNode;
  screenRightTitle?: string;
  screenRightContent?: ReactNode;
  screenOnPressRight?: () => void;
  search?: {
    searchText?: string;
    onChangeSearchText?: (text: string) => void;
    isSearching: boolean;
    searchResultData?: ArrayLike<ItemT> | null | undefined;
    searchResultKeyExtractor?:
      | ((item: ItemT, index: number) => string)
      | undefined;
    renderSearchResultItem?:
      | ((
          info: ListRenderItemInfo<ItemT>,
          onSeachToggle: React.Dispatch<React.SetStateAction<boolean>>,
        ) => React.ReactElement)
      | null
      | undefined;
  };
} & AppHeaderProps;
