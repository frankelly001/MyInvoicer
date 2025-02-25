import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent, useState} from 'react';
import {Animated} from 'react-native';
import {
  AnimatedTabHeader,
  AppText,
  NotificationCard,
} from '../../../../../components';
import AnimatedHeaderContent from '../../../../../components/animated-header/animated-header-content';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {useSearchNotificationApiQuery} from '../../../../../state/services/notification/api';
import {convertToReadableDate} from '../../../../../utils/helpers';

const NotificationHeader: FunctionComponent<{
  onPressRight: () => void;
  onPressLeft: () => void;
  leftTitle: string;
  translateY: Animated.AnimatedInterpolation<string | number> | undefined;
  LeftContent?: React.ReactNode;
  onMarkAsRead: (notificationId: string) => void;
}> = ({
  onPressRight,
  onPressLeft,
  leftTitle,
  translateY,
  LeftContent,
  onMarkAsRead,
}) => {
  const [searchText, setSearchText] = useState('');
  const {currentData = [], isFetching: isSearching} =
    useSearchNotificationApiQuery(
      {
        searchTerm: searchText,
      },
      {skip: searchText.length < 3},
    );
  const navigation = useNavigation<GeneralNavProp>();

  const navigationTypes = {
    estimate: (estimateId: string) =>
      navigation.navigate(routesNames.PREVIEW_ESTIMATE, {estimateId}),
    invoice: (invoiceId: string) =>
      navigation.navigate(routesNames.PREVIEW_INVOICE, {invoiceId}),
    order: (orderId: string) =>
      navigation.navigate(routesNames.PREVIEW_PURCHASE_ORDER, {orderId}),
    receipt: (receiptId: string) =>
      navigation.navigate(routesNames.PREVIEW_SALES_RECEIPT, {receiptId}),
    timesheet: () => null,
    customer: () => null,
  };

  return (
    <AnimatedTabHeader
      translateY={translateY}
      screenTitle={'Notifications'}
      leftTitle={leftTitle}
      rightTitle={'Read all'}
      LeftContent={LeftContent}
      onPressLeft={onPressLeft}
      onPressRight={onPressRight}
      MiddleContent={
        <AnimatedHeaderContent translateY={translateY}>
          <AppText
            color={'neutral_dark_5'}
            text={'Notifications'}
            align="center"
            textTransform="capitalize"
            type={'heading_h4'}
          />
        </AnimatedHeaderContent>
      }
      search={{
        isSearching,
        searchText,
        onChangeSearchText: setSearchText,
        searchResultData: currentData,
        searchResultKeyExtractor: item => item.id,
        renderSearchResultItem: ({item}, onSearchToggle) => (
          <NotificationCard
            duration={convertToReadableDate(item.createdAt)}
            title={item.title}
            subTitle={item.message}
            isRead={item.isRead}
            onPress={() => {
              onMarkAsRead(item.id);
              onSearchToggle(false);
              setSearchText('');
              return navigationTypes?.[item.type](item.id) ?? null;
            }}
          />
        ),
      }}
    />
  );
};

export default NotificationHeader;
