import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {AppBottomSheet, AppConfirm} from '../../..';
import {
  ClockIcon,
  CopyIcon,
  DeleteIcon,
  EditSquareIcon,
  SelectIcon,
  ShareIcon,
} from '../../../../assets/svg';
import {useColors} from '../../../../hooks/useColors';
import {routesNames} from '../../../../navigation/routes';
import {GeneralNavProp} from '../../../../navigation/types';
import {
  useDeleteOrderApiMutation,
  useSendOrderReminderApiMutation,
} from '../../../../state/services/order/api';
import {Order} from '../../../../types/Orders';
import {BaseSheetProps} from '../../../../types/Sheet';
import {getErrorMessage} from '../../../../utils/helpers';
import {showToast} from '../../../app-toast';

const PurchaseOrderMoreSheet: FunctionComponent<
  {
    orderData: Order;
    onSelectPress?: () => void;
    removeActions?: {
      delete?: boolean;
    };
    showDeleteAlert: boolean;
    setShowDeleteAlert: (visible: boolean) => void;
    shouldGoBackOnDelete?: boolean;
  } & BaseSheetProps
> = ({
  onSelectPress,
  closeSheet,
  orderData,
  sheetRef,
  removeActions,
  setShowDeleteAlert,
  showDeleteAlert,
  shouldGoBackOnDelete,
}) => {
  const colors = useColors();
  const navigation = useNavigation<GeneralNavProp>();
  const [deleteOrder] = useDeleteOrderApiMutation();
  const [sendInvoiceReminder] = useSendOrderReminderApiMutation();

  const _handleSendOrderReminder = async (invId: string) => {
    try {
      const response = await sendInvoiceReminder({
        orderId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Order reminder sent successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  const _handleDelete = async (invId: string) => {
    try {
      const response = await deleteOrder({
        orderId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Order deleted successfully',
        message: response.message,
      });
      if (shouldGoBackOnDelete) {
        navigation.goBack();
      }
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  const createBtns = [
    {
      name: 'Edit',
      Icon: <EditSquareIcon fill={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(routesNames.EDIT_PURCHASE_ORDER, {
          order: orderData,
        }),
    },
    {
      name: 'Duplicate',
      Icon: <CopyIcon stroke={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(routesNames.CREATE_PURCHASE_ORDER, {
          duplicate: orderData,
        }),
    },
    ...(onSelectPress
      ? [
          {
            name: 'Select',
            Icon: <SelectIcon stroke={colors.neutral_dark_5} />,
            onPress: onSelectPress,
          },
        ]
      : []),

    {
      name: 'Remind',
      Icon: <ClockIcon stroke={colors.neutral_dark_5} />,
      onPress: () => _handleSendOrderReminder(orderData?.id),
    },

    {
      name: 'Share',
      Icon: <ShareIcon fill={colors.neutral_dark_5} />,
      // onPress: onShare,
    },
    ...(!removeActions?.delete
      ? [
          {
            name: 'Delete',
            Icon: <DeleteIcon fill={colors.neutral_dark_5} />,
            onPress: () => setShowDeleteAlert(true),
          },
        ]
      : []),
  ];

  return (
    <>
      <AppBottomSheet
        title="More"
        sheetRef={sheetRef}
        closeSheet={closeSheet}
        shouldCloseSheetOnItemPressed
        optionsBtns={createBtns}
      />
      <AppConfirm
        title="Delete invoice"
        description={
          'You’re about to delete this purchase order, would you like to proceed'
        }
        visible={showDeleteAlert}
        yesTitle={'Yes, Delete'}
        onNoPress={() => setShowDeleteAlert(false)}
        onYesPress={() => {
          _handleDelete(orderData.id);
          setShowDeleteAlert(false);
        }}
        yesBtnProps={{
          buttonColor: 'support_error_3',
          borderColor: 'support_error_3',
        }}
      />
    </>
  );
};

export default PurchaseOrderMoreSheet;
