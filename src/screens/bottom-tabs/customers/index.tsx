import React, {FunctionComponent, useState} from 'react';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {BarChartIcon} from '../../../assets/svg';
import {AppDeleteSheet, AppFlashList, AppScreen} from '../../../components';
import {showToast} from '../../../components/app-toast';
import {HEADER_SEARCH_HEIGHT, HEADER_TITLE_HEIGHT} from '../../../config/const';
import {useColors} from '../../../hooks/useColors';
import {useSheet} from '../../../hooks/useSheet';
import {useStickyHeaderAnimation} from '../../../hooks/useStickyHeaderAnimation';
import {GeneralNavProp, GeneralScreenProps} from '../../../navigation/types';
import {
  customerAdapter,
  customerSelector,
  useDeleteCustomerApiMutation,
  useDeleteMultipleCustomerApiMutation,
  useGetAllCustomersApiQuery,
} from '../../../state/services/customer/api';
import {
  apiListParamsState,
  setCustomerApiListParams,
} from '../../../state/slices/api-list-params/apiListParamsSlice';
import {useAppSelector} from '../../../state/slices/store';
import {getErrorMessage} from '../../../utils/helpers';
import CustomerChartFilter from './chart-filter-sheet';
import CustomerHeader from './header';
import RenderCustomerItem from './render-customer-item';
import {useNavigation} from '@react-navigation/native';
import {routesNames} from '../../../navigation/routes';

const Customers: FunctionComponent<GeneralScreenProps<'CUSTOMERS'>> = () => {
  const colors = useColors();
  const navigation = useNavigation<GeneralNavProp>();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {customerApiListParams} = useAppSelector(apiListParamsState);
  const dispatch = useDispatch();

  const {
    closeSheet: closeFilterSheet,
    openSheet: openFilterSheet,
    sheetRef: filterSheetRef,
  } = useSheet();
  const {
    closeSheet: closeDeleteSheet,
    openSheet: openDeleteSheet,
    sheetRef: deleteSheetRef,
  } = useSheet();

  const {
    data: customersData,
    isFetching,
    isLoading,
  } = useGetAllCustomersApiQuery(customerApiListParams, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: customerSelector.selectAll(
          data?.data ?? customerAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const [deleteCustomer] = useDeleteCustomerApiMutation();
  const [deleteMultipleCustomer] = useDeleteMultipleCustomerApiMutation();

  const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

  const {onScroll, translateY} = useStickyHeaderAnimation(CONTAINER_HEIGHT);

  const _handleDelete = async (invId: string) => {
    try {
      const response = await deleteCustomer({
        customerId: invId,
      }).unwrap();

      showToast('SUCCESS', {
        title: 'Customer deleted successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  const _handleMultipleDelete = async () => {
    if (selectedIds.length) {
      try {
        const response = await deleteMultipleCustomer({
          arrayOfCustomerId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Customer deleted successfully',
          message: response.message,
        });
      } catch (error) {
        showToast('ERROR', {
          title: 'Error Encountered!',
          message: getErrorMessage(error),
        });
      }
    }
  };

  const handleSelect = (itemId: string) => {
    if (!isSelecting) {
      setSelectedIds([itemId]);
      setIsSelecting(true);
      openDeleteSheet();
    } else {
      const isChecked = selectedIds.includes(itemId);
      setSelectedIds(
        !isChecked
          ? [...selectedIds.filter(el => el !== itemId), itemId]
          : selectedIds.filter(el => el !== itemId),
      );
    }
  };

  return (
    <AppScreen
      isScrollable={false}
      ScreenHeader={
        <>
          <CustomerHeader
            leftTitle={isSelecting ? 'Cancel' : ''}
            translateY={translateY}
            RightContent={
              <Pressable onPress={openFilterSheet}>
                <BarChartIcon fill={colors.neutral_dark_4} />
              </Pressable>
            }
            onPressLeft={() => {
              if (isSelecting) {
                setSelectedIds([]);
                closeDeleteSheet();
              }
              setIsSelecting(false);
            }}
          />
        </>
      }>
      <AppFlashList
        data={customersData.data}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        isLoading={isLoading}
        isFetchingMore={isFetching}
        emptyListAlert={{
          description: 'Add a new customer',
          buttonText: 'Add customer',
          onPress: () => navigation.navigate(routesNames.CREATE_CUSTOMER),
        }}
        contentContainerPaddingTop={CONTAINER_HEIGHT}
        extraData={[isSelecting]}
        onEndReached={() => {
          if (
            !isFetching &&
            customersData.nextPage &&
            customersData.data.length
          ) {
            dispatch(
              setCustomerApiListParams({
                page: customersData.nextPage,
              }),
            );
          }
        }}
        keyExtractor={item => item.id}
        renderItem={renderedItem => (
          <RenderCustomerItem
            renderedItem={renderedItem}
            isSelecting={isSelecting}
            shouldCloseSlide={isSelecting}
            selected={selectedIds.includes(renderedItem.item.id)}
            onDelete={() => _handleDelete(renderedItem.item.id)}
            onSelect={() => handleSelect(renderedItem.item.id)}
          />
        )}
      />

      <AppDeleteSheet
        onClose={() => {
          setSelectedIds([]);
          setIsSelecting(false);
        }}
        shouldCloseSheetWhenItemPressed={!!selectedIds.length}
        sheetRef={deleteSheetRef}
        closeSheet={closeDeleteSheet}
        onPressDelete={_handleMultipleDelete}
      />
      <CustomerChartFilter
        closeSheet={closeFilterSheet}
        sheetRef={filterSheetRef}
      />
    </AppScreen>
  );
};

export default Customers;
