import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {
  EstimateIcon,
  FileIcon,
  InvoiceIcon,
  ShoppingCartIcon,
} from '../../../assets/svg';
import {useColors} from '../../../hooks/useColors';
import {routesNames} from '../../../navigation/routes';
import {GeneralNavProp} from '../../../navigation/types';
import {BaseSheetProps} from '../../../types/Sheet';
import {EMPTY_STRING} from '../../../utils/constants/fieldDefaultValues';
import AppBottomSheet from '../../app-bottom-sheet';

const BillCustomerSheet: FunctionComponent<
  {
    customer: {
      fullname: string;
      address: string;
      email: string;
      phone: string;
    };
  } & BaseSheetProps
> = ({closeSheet, sheetRef, customer}) => {
  const colors = useColors();
  const navigation = useNavigation<GeneralNavProp>();
  const createBillRouteParams = {
    billTo: {
      fullname: customer?.fullname ?? EMPTY_STRING,
      address: customer?.address ?? EMPTY_STRING,
      email: customer?.email ?? EMPTY_STRING,
      phone: customer?.phone ?? EMPTY_STRING,
    },
  };
  const billOptions = [
    {
      name: 'New Invoice',
      Icon: <InvoiceIcon fill={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(routesNames.CREATE_INVOICE, createBillRouteParams),
    },
    {
      name: 'New Estimate',
      Icon: <EstimateIcon stroke={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(routesNames.CREATE_ESTIMATE, createBillRouteParams),
    },
    {
      name: 'New Sales Receipt',
      Icon: <FileIcon stroke={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(
          routesNames.CREATE_SALES_RECEIPT,
          createBillRouteParams,
        ),
    },
    {
      name: 'New Purchase Order',
      Icon: <ShoppingCartIcon fill={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(
          routesNames.CREATE_PURCHASE_ORDER,
          createBillRouteParams,
        ),
    },
  ];
  return (
    <AppBottomSheet
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      title={'Bill customer'}
      shouldCloseSheetOnItemPressed
      optionsBtns={billOptions}
    />
  );
};

export default BillCustomerSheet;
