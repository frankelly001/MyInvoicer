import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent, useState} from 'react';
import {
  EditSquareIcon,
  EmailIcon,
  FilePlusIcon,
  PhoneIcon,
  SelectIcon,
} from '../../../../assets/svg';
import {AppConfirm, AppBottomSheet, CustomerCard} from '../../../../components';
import {BillCustomerSheet} from '../../../../components/sheets';
import {useColors} from '../../../../hooks/useColors';
import {useSheet} from '../../../../hooks/useSheet';
import {routesNames} from '../../../../navigation/routes';
import {GeneralNavProp} from '../../../../navigation/types';
import {Customer} from '../../../../types/Customers';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';
import {makePhoneCall, sendEmail} from '../../../../utils/helpers/linking';
import {ListRenderItemInfo} from '@shopify/flash-list';

const RenderCustomerItem: FunctionComponent<{
  renderedItem: ListRenderItemInfo<Customer>;
  isSelecting: boolean;
  shouldCloseSlide: boolean;
  selected: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}> = ({
  isSelecting,
  shouldCloseSlide,
  renderedItem,
  selected,

  onSelect = () => null,
  onDelete = () => null,
}) => {
  const {item, index} = renderedItem;
  const {
    closeSheet: closeMoreSheet,
    openSheet: openMoreSheet,
    sheetRef: moreSheetRef,
  } = useSheet();
  const colors = useColors();
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation<GeneralNavProp>();

  const {
    closeSheet: closeBillSheet,
    openSheet: openBillSheet,
    sheetRef: billSheetRef,
  } = useSheet();

  const createBtns = [
    {
      name: 'Edit',
      Icon: <EditSquareIcon fill={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(routesNames.EDIT_CUSTOMER, {customer: item}),
    },
    {
      name: 'Select',
      Icon: <SelectIcon stroke={colors.neutral_dark_5} />,
      onPress: onSelect,
    },
    {
      name: 'Call',
      Icon: <PhoneIcon stroke={colors.neutral_dark_5} />,
      onPress: () => makePhoneCall(item?.phone),
    },
    {
      name: 'Email',
      Icon: <EmailIcon fill={colors.neutral_dark_5} />,
      onPress: () => sendEmail({email: item.email}),
    },
    {
      name: 'Bill',
      Icon: <FilePlusIcon stroke={colors.neutral_dark_5} />,
      onPress: openBillSheet,
    },
  ];
  return (
    <>
      <CustomerCard
        listNum={index + 1}
        email={item?.email}
        fullname={item?.name}
        phone={item?.phone}
        isSelecting={isSelecting}
        selected={selected}
        shouldCloseSlide={shouldCloseSlide}
        onPress={() => {
          if (!isSelecting) {
            return navigation.navigate(routesNames.CUSTOMER_DETAILS, {
              customerId: item?.id,
              customerName: item?.name,
            });
          } else {
            onSelect();
          }
        }}
        onLongPress={openMoreSheet}
        onMorePress={openMoreSheet}
        onDeletePress={() => setShowAlert(true)}
        enableSwipe={!isSelecting}
      />
      <AppBottomSheet
        title="More"
        sheetRef={moreSheetRef}
        closeSheet={closeMoreSheet}
        shouldCloseSheetOnItemPressed
        optionsBtns={createBtns}
      />
      <BillCustomerSheet
        sheetRef={billSheetRef}
        closeSheet={closeBillSheet}
        customer={{
          fullname: item?.name ?? EMPTY_STRING,
          address: item?.address ?? EMPTY_STRING,
          email: item?.email ?? EMPTY_STRING,
          phone: item?.phone ?? EMPTY_STRING,
        }}
      />
      <AppConfirm
        title="Delete estimate"
        description={
          'You’re about to delete this estimate, would you like to proceed'
        }
        visible={showAlert}
        yesTitle={'Yes, Delete'}
        onNoPress={() => setShowAlert(false)}
        onYesPress={() => {
          onDelete();
          setShowAlert(false);
        }}
        yesBtnProps={{
          buttonColor: 'support_error_3',
          borderColor: 'support_error_3',
        }}
      />
    </>
  );
};

export default RenderCustomerItem;
