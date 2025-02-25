import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {
  ClockIcon,
  CustomersIcon,
  EstimateIcon,
  FileIcon,
  InvoiceIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from '../../../assets/svg';
import {AppScreenSheet} from '../../../components';
import AppListButton from '../../../components/app-list-button';
import {useColors} from '../../../hooks/useColors';
import {useSheet} from '../../../hooks/useSheet';
import {routesNames} from '../../../navigation/routes';
import {BaseSheetProps} from '../../../types/Sheet';
import AddNewItemSheet from './add-item';
import AddTimesheetSheet from './add-timesheet';
import {GeneralNavProp} from '../../../navigation/types';

const CreateSheet: FunctionComponent<BaseSheetProps> = ({
  sheetRef,
  closeSheet = () => null,
}) => {
  const colors = useColors();
  const navigation = useNavigation<GeneralNavProp>();
  const {
    sheetRef: createItemSheetRef,
    openSheet: openCreateItemSheet,
    closeSheet: closeCreateItemSheet,
  } = useSheet();
  const {
    sheetRef: createTimeSheetRef,
    openSheet: openCreateTimeSheet,
    closeSheet: closeCreateTimeSheet,
  } = useSheet();

  const customerCreate = [
    {
      name: 'Customer',
      Icon: <CustomersIcon stroke={colors.neutral_dark_5} />,
      onPress: () => navigation.navigate(routesNames.CREATE_CUSTOMER),
    },
  ];
  const billCreate = [
    {
      name: 'Invoice',
      Icon: <InvoiceIcon fill={colors.neutral_dark_5} />,
      onPress: () => navigation.navigate(routesNames.CREATE_INVOICE),
    },
    {
      name: 'Estimate',
      Icon: <EstimateIcon stroke={colors.neutral_dark_5} />,
      onPress: () => navigation.navigate(routesNames.CREATE_ESTIMATE),
    },
    {
      name: 'Sales receipt',
      Icon: <FileIcon stroke={colors.neutral_dark_5} />,
      onPress: () => navigation.navigate(routesNames.CREATE_SALES_RECEIPT),
    },

    {
      name: 'Purchase order',
      Icon: <ShoppingCartIcon fill={colors.neutral_dark_5} />,
      onPress: () => navigation.navigate(routesNames.CREATE_PURCHASE_ORDER),
    },
  ];

  const othersCreate = [
    {
      name: 'Item',
      Icon: <ShoppingBagIcon fill={colors.neutral_dark_5} />,
      onPress: openCreateItemSheet,
    },
    {
      name: 'Start timer',
      Icon: <ClockIcon stroke={colors.neutral_dark_5} />,
      onPress: openCreateTimeSheet,
    },
  ];

  return (
    <>
      <AppScreenSheet
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        title="Quick Create">
        <AppListButton
          disabled
          title={'what would you like to create?'}
          titleColor="neutral_dark_1"
          titleSize="caption_m"
          textTranform="uppercase"
        />
        {customerCreate.map(({Icon, name, onPress}) => (
          <AppListButton
            key={name}
            title={name}
            LeftIcon={Icon}
            onPress={() => {
              onPress();
              closeSheet();
            }}
          />
        ))}
        <AppListButton
          disabled
          title={'bill'}
          titleColor="neutral_dark_1"
          titleSize="caption_m"
          textTranform="uppercase"
        />
        {billCreate.map(({Icon, name, onPress}) => (
          <AppListButton
            key={name}
            title={name}
            LeftIcon={Icon}
            onPress={() => {
              onPress();
              closeSheet();
            }}
          />
        ))}
        <AppListButton
          disabled
          title={'others'}
          titleColor="neutral_dark_1"
          titleSize="caption_m"
          textTranform="uppercase"
        />
        {othersCreate.map(({Icon, name, onPress}) => (
          <AppListButton
            key={name}
            title={name}
            LeftIcon={Icon}
            onPress={() => {
              onPress();
              closeSheet();
            }}
          />
        ))}
      </AppScreenSheet>
      <AddNewItemSheet
        sheetRef={createItemSheetRef}
        closeSheet={closeCreateItemSheet}
      />
      <AddTimesheetSheet
        sheetRef={createTimeSheetRef}
        closeSheet={closeCreateTimeSheet}
        openSheet={openCreateTimeSheet}
      />
    </>
  );
};

export default CreateSheet;
