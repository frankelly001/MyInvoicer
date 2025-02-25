import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {AppBottomSheet, AppConfirm} from '../../..';
import {
  CheckSquareIcon,
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
  useDeleteInvoiceApiMutation,
  useMarkInvoiceAsPaidApiMutation,
  useSendInvoiceReminderApiMutation,
} from '../../../../state/services/invoice/api';
import {Invoice} from '../../../../types/Invoices';
import {BaseSheetProps} from '../../../../types/Sheet';
import {getErrorMessage} from '../../../../utils/helpers';
import {showToast} from '../../../app-toast';

const InvoiceMoreSheet: FunctionComponent<
  {
    invoiceData: Invoice;
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
  invoiceData,
  sheetRef,
  removeActions = {},
  showDeleteAlert,
  setShowDeleteAlert,
  shouldGoBackOnDelete,
}) => {
  const colors = useColors();

  const navigation = useNavigation<GeneralNavProp>();
  const [deleteInvoice] = useDeleteInvoiceApiMutation();
  const [sendInvoiceReminde] = useSendInvoiceReminderApiMutation();
  const [markAsInvoicePaid] = useMarkInvoiceAsPaidApiMutation();

  const _handleSendInvoiceReminder = async (invId: string) => {
    try {
      const response = await sendInvoiceReminde({
        invoiceId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Invoice reminder sent successfully',
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
      const response = await deleteInvoice({
        invoiceId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Invoice deleted successfully',
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

  const _handleMarkAsPaid = async (invId: string) => {
    try {
      const response = await markAsInvoicePaid({
        invoiceId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Invoice marked as paid successfully',
        message: response.message,
      });
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
        navigation.navigate(routesNames.EDIT_INVOICE, {
          invoice: invoiceData,
        }),
    },
    {
      name: 'Duplicate',
      Icon: <CopyIcon stroke={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(routesNames.CREATE_INVOICE, {
          duplicate: invoiceData,
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
    ...(invoiceData.invoiceStatus !== 'paid'
      ? [
          {
            name: 'Remind',
            Icon: <ClockIcon stroke={colors.neutral_dark_5} />,
            onPress: () => _handleSendInvoiceReminder(invoiceData.id),
          },
          {
            name: 'Mark as paid',
            Icon: <CheckSquareIcon stroke={colors.neutral_dark_5} />,
            onPress: () => _handleMarkAsPaid(invoiceData.id),
          },
        ]
      : []),
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
          'You’re about to delete this invoice, would you like to proceed'
        }
        visible={showDeleteAlert}
        yesTitle={'Yes, Delete'}
        onNoPress={() => setShowDeleteAlert(false)}
        onYesPress={() => {
          _handleDelete(invoiceData.id);
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

export default InvoiceMoreSheet;
