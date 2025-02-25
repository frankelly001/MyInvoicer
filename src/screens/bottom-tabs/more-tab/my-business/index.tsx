import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ArrowRightIcon} from '../../../../assets/svg';
import {
  AppBackButton,
  AppButton,
  AppFlashList,
  AppHeader,
  AppScreen,
  AppTabTitleHeader,
} from '../../../../components';
import AppListButton from '../../../../components/app-list-button';
import {showToast} from '../../../../components/app-toast';
import {useColors} from '../../../../hooks/useColors';
import {routesNames} from '../../../../navigation/routes';
import {GeneralScreenProps} from '../../../../navigation/types';
import {
  businessAdapter,
  businessSelector,
  useGetAllBusinessesApiQuery,
} from '../../../../state/services/business/api';
import {
  apiListParamsState,
  setBusinessApiListParams,
} from '../../../../state/slices/api-list-params/apiListParamsSlice';
import {useAppSelector} from '../../../../state/slices/store';
import {myBusinessstyles} from './styles';

const MyBusiness: FunctionComponent<GeneralScreenProps<'MY_BUSINESS'>> = ({
  navigation,
}) => {
  const {businessApiListParams} = useAppSelector(apiListParamsState);
  const dispatch = useDispatch();
  const {
    data: bussinessData,
    isFetching: isBusinessFetching,
    isLoading: isBusinessLoading,
  } = useGetAllBusinessesApiQuery(businessApiListParams, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: businessSelector.selectAll(
          data?.data ?? businessAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });
  const colors = useColors();
  const styles = myBusinessstyles;

  return (
    <AppScreen
      isScrollable={false}
      contentContainerStyle={styles.contentContainer}
      ScreenHeader={
        <View style={styles.header}>
          <AppHeader
            onPressLeft={() => null}
            LeftContent={<AppBackButton title="Settings" />}
          />
          <AppTabTitleHeader screenTitle="My Business" />
        </View>
      }>
      <AppFlashList
        data={bussinessData?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        isLoading={isBusinessLoading}
        isFetchingMore={isBusinessFetching}
        onEndReached={() => {
          if (
            !isBusinessFetching &&
            bussinessData?.nextPage &&
            bussinessData.data.length
          ) {
            dispatch(
              setBusinessApiListParams({
                page: bussinessData.nextPage,
              }),
            );
            showToast('INFO', {message: 'i dy update ooo', title: 'yess'});
          }
        }}
        renderItem={({item}) => (
          <AppListButton
            onPress={() =>
              navigation.navigate(routesNames.BUSINESS_DETAILS, {
                business: {id: item.id, name: item.businessName},
              })
            }
            title={item.businessName}
            RightIcon={<ArrowRightIcon fill={colors.neutral_dark_1} />}
            borderType={'Bottom'}
          />
        )}
      />
      <View style={styles.addBusinessBtnContainer}>
        <AppButton
          text="Add a business"
          onPress={() => navigation.navigate(routesNames.ADD_BUSINESS)}
        />
      </View>
    </AppScreen>
  );
};

export default MyBusiness;
