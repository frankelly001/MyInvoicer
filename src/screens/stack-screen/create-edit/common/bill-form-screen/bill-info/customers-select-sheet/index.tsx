/* eslint-disable react/no-unstable-nested-components */
import React, {FunctionComponent, useState} from 'react';
import {Control, useController} from 'react-hook-form';
import {
  AppSearchInput,
  AppSeperator,
  AppSheetList,
} from '../../../../../../../components';
import AppListButton from '../../../../../../../components/app-list-button';
import {showToast} from '../../../../../../../components/app-toast';
import {
  customerAdapter,
  customerSelector,
  useSearchCustomerPaginatedApiQuery,
} from '../../../../../../../state/services/customer/api';
import {BaseSheetProps} from '../../../../../../../types/Sheet';
import {EMPTY_STRING} from '../../../../../../../utils/constants/fieldDefaultValues';
import {GeneralBillFormSchemaType} from '../../schema';
import {customerSelectSheetStyles} from './styles';

const CustomerSelectSheet: FunctionComponent<
  {control: Control<GeneralBillFormSchemaType>} & BaseSheetProps
> = ({closeSheet = () => null, sheetRef, control}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const {data: customersData, isFetching} = useSearchCustomerPaginatedApiQuery(
    {
      page,
      searchTerm,
      documentCount: 20,
    },
    {
      selectFromResult: ({data, ...otherParams}) => ({
        data: {
          ...data,
          data: customerSelector.selectAll(
            data?.data ?? customerAdapter.getInitialState(),
          ),
        },
        ...otherParams,
      }),
    },
  );
  const styles = customerSelectSheetStyles;

  const {
    field: {onChange: onChangeFullname},
  } = useController({control, name: 'fullname'});
  const {
    field: {onChange: onChangeEmail},
  } = useController({control, name: 'email'});
  const {
    field: {onChange: onChangePhone},
  } = useController({control, name: 'phone'});
  const {
    field: {onChange: onChangeAddress},
  } = useController({control, name: 'address'});

  const resetFields = () => {
    onChangeFullname(EMPTY_STRING);
    onChangeEmail(EMPTY_STRING);
    onChangePhone(EMPTY_STRING);
    onChangeAddress(EMPTY_STRING);
  };
  return (
    <AppSheetList
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      onClose={() => setSearchTerm('')}
      title="Select Customers"
      panGestureEnabled={false}
      adjustToContentHeight={false}
      AdditionalHeaderContent={
        <AppSearchInput
          placeholder="Search invoices"
          containerStyle={styles.searchContainer}
          onChangeText={text => {
            setSearchTerm(text);
            setPage(1);
          }}
          value={searchTerm}
        />
      }
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (
          !isFetching &&
          customersData?.nextPage &&
          customersData.data.length
        ) {
          setPage(customersData.nextPage);
          showToast('INFO', {message: 'i dy update ooo', title: 'yess'});
        }
      }}
      data={customersData?.data ?? []}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <AppSeperator paddingHorizontal={16} />}
      renderItem={({item}) => (
        <AppListButton
          title={item.name}
          titleSize={'heading_h5'}
          onPress={() => {
            resetFields();
            onChangeFullname(item.name);
            onChangeEmail(item.email);
            onChangePhone(item.phone);
            onChangeAddress(item.address);
            closeSheet();
          }}
        />
      )}
    />
  );
};

export default CustomerSelectSheet;
