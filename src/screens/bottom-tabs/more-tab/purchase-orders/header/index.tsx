import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent, ReactNode, useState} from 'react';
import {Animated} from 'react-native';
import {
  AnimatedTabHeader,
  AppTabSwitcher,
  BillCard,
} from '../../../../../components';
import AnimatedHeaderContent from '../../../../../components/animated-header/animated-header-content';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {useSearchOrderApiQuery} from '../../../../../state/services/order/api';
import {billTabs} from '../../../../../utils/constants/tabs';
import {convertToReadableDate} from '../../../../../utils/helpers';
import {convertToReadableTime} from '../../../../../utils/helpers/convertDate';

const PurchaseOrderHeader: FunctionComponent<{
  onChangeTab: ((index: number) => void) | undefined;
  onPressLeft: () => void;
  leftTitle: string;
  LeftContent: ReactNode;
  translateY: Animated.AnimatedInterpolation<string | number> | undefined;
  current: number;
  RightContent?: React.ReactNode;
}> = ({
  onPressLeft,
  onChangeTab,
  leftTitle,
  translateY,
  current,
  RightContent,
  LeftContent,
}) => {
  const [searchText, setSearchText] = useState('');
  const {currentData = [], isFetching: isSearching} = useSearchOrderApiQuery(
    {
      searchTerm: searchText,
    },
    {skip: searchText.length < 3},
  );
  const navigation = useNavigation<GeneralNavProp>();

  return (
    <AnimatedTabHeader
      translateY={translateY}
      screenTitle={'Purchase Orders'}
      leftTitle={leftTitle}
      LeftContent={LeftContent}
      onPressLeft={onPressLeft}
      MiddleContent={
        <AppTabSwitcher
          tabs={billTabs}
          tabLabelType={'action_m'}
          selectedIndex={current}
          onChangeTab={onChangeTab}
          width={153}
        />
      }
      RightContent={
        <AnimatedHeaderContent translateY={translateY} alignItems="flex-end">
          {RightContent}
        </AnimatedHeaderContent>
      }
      screenRightContent={RightContent}
      search={{
        isSearching,
        searchText,
        onChangeSearchText: setSearchText,
        searchResultData: currentData,
        searchResultKeyExtractor: item => item.id,
        renderSearchResultItem: ({item}, onSearchToggle) => (
          <BillCard
            dateTime={`${convertToReadableDate(
              item?.createdAt,
              'YYYY-MM-DD',
            )}, ${convertToReadableTime(item?.createdAt)}`}
            fullname={item?.customerData?.name}
            price={`${item?.grandTotal}`}
            invoiceId={item?.orderNumber}
            status={item?.orderStatus}
            currency={item?.currency}
            onPress={() => {
              navigation.navigate(routesNames.PREVIEW_ESTIMATE, {
                estimateId: item.id,
              });
              onSearchToggle(false);
              setSearchText('');
            }}
          />
        ),
      }}
    />
  );
};

export default PurchaseOrderHeader;
