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
  useDeleteReceiptApiMutation,
  useSendReceiptReminderApiMutation,
} from '../../../../state/services/receipt/api';
import {Receipt} from '../../../../types/Receipts';
import {BaseSheetProps} from '../../../../types/Sheet';
import {getErrorMessage} from '../../../../utils/helpers';
import {showToast} from '../../../app-toast';

const ReceiptMoreSheet: FunctionComponent<
  {
    receiptData: Receipt;
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
  receiptData,
  sheetRef,
  removeActions,
  setShowDeleteAlert,
  showDeleteAlert,
  shouldGoBackOnDelete,
}) => {
  const colors = useColors();
  const navigation = useNavigation<GeneralNavProp>();
  const [deleteReceipt] = useDeleteReceiptApiMutation();
  const [sendReceiptReminder] = useSendReceiptReminderApiMutation();

  const _handleSendReceiptReminder = async (rcpId: string) => {
    try {
      const response = await sendReceiptReminder({
        receiptId: rcpId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Receipt reminder sent successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  const _handleDelete = async (rcpId: string) => {
    try {
      const response = await deleteReceipt({
        receiptId: rcpId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Receipt deleted successfully',
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
        navigation.navigate(routesNames.EDIT_SALES_RECEIPT, {
          receipt: receiptData,
        }),
    },
    {
      name: 'Duplicate',
      Icon: <CopyIcon stroke={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(routesNames.CREATE_SALES_RECEIPT, {
          duplicate: receiptData,
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
      onPress: () => _handleSendReceiptReminder(receiptData.id),
    },
    {
      name: 'Share',
      Icon: <ShareIcon fill={colors.neutral_dark_5} />,
      //   onPress: onSharePress,
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
        title="Delete receipt"
        description={
          'You’re about to delete this receipt, would you like to proceed'
        }
        visible={showDeleteAlert}
        yesTitle={'Yes, Delete'}
        onNoPress={() => setShowDeleteAlert(false)}
        onYesPress={() => {
          _handleDelete(receiptData.id);
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

export default ReceiptMoreSheet;
