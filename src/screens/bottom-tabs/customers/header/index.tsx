import React, {FunctionComponent, useState} from 'react';
import {Animated} from 'react-native';
import {AnimatedTabHeader, AppText, CustomerCard} from '../../../../components';
import AnimatedHeaderContent from '../../../../components/animated-header/animated-header-content';
import {useNavigation} from '@react-navigation/native';
import {GeneralNavProp} from '../../../../navigation/types';
import {useSearchCustomerApiQuery} from '../../../../state/services/customer/api';
import {routesNames} from '../../../../navigation/routes';

const CustomerHeader: FunctionComponent<{
  onPressLeft: () => void;
  leftTitle: string;
  translateY: Animated.AnimatedInterpolation<string | number> | undefined;
  RightContent?: React.ReactNode;
}> = ({onPressLeft, leftTitle, translateY, RightContent}) => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<GeneralNavProp>();
  const {currentData = [], isFetching: isSearching} = useSearchCustomerApiQuery(
    {
      searchTerm: searchText,
    },
    {skip: searchText.length < 3},
  );

  return (
    <AnimatedTabHeader
      translateY={translateY}
      screenTitle={'Customers'}
      MiddleContent={
        <AnimatedHeaderContent translateY={translateY}>
          <AppText
            color={'neutral_dark_5'}
            text={'Customers'}
            align="center"
            textTransform="capitalize"
            type={'heading_h4'}
          />
        </AnimatedHeaderContent>
      }
      leftTitle={leftTitle}
      screenRightContent={RightContent}
      RightContent={
        <AnimatedHeaderContent alignItems="flex-end" translateY={translateY}>
          {RightContent}
        </AnimatedHeaderContent>
      }
      onPressLeft={onPressLeft}
      search={{
        isSearching,
        searchText,
        onChangeSearchText: setSearchText,
        searchResultData: currentData,
        searchResultKeyExtractor: item => item.id,
        renderSearchResultItem: ({item, index}, onSearchToggle) => (
          <CustomerCard
            listNum={index + 1}
            email={item?.email}
            fullname={item?.name}
            enableSwipe={false}
            phone={item?.phone}
            onPress={() => {
              navigation.navigate(routesNames.CUSTOMER_DETAILS, {
                customerId: item.id,
                customerName: item.name,
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

export default CustomerHeader;
