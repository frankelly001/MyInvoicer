import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {AppBottomSheet, AppConfirm} from '../../..';
import {
  ClockIcon,
  CopyIcon,
  DeleteIcon,
  EditSquareIcon,
  FilePlusIcon,
  SelectIcon,
  ShareIcon,
} from '../../../../assets/svg';
import {useColors} from '../../../../hooks/useColors';
import {routesNames} from '../../../../navigation/routes';
import {GeneralNavProp} from '../../../../navigation/types';
import {
  useConvertAcceptedEstimateToInvoiceApiMutation,
  useDeleteEstimateApiMutation,
  useSendEstimateReminderApiMutation,
} from '../../../../state/services/estimate/api';
import {Estimate} from '../../../../types/Estimates';
import {BaseSheetProps} from '../../../../types/Sheet';
import {getErrorMessage} from '../../../../utils/helpers';
import {showToast} from '../../../app-toast';

const EstimateMoreSheet: FunctionComponent<
  {
    estimateData: Estimate;
    onSelectPress?: () => void;
    removeActions?: {
      delete?: boolean;
    };
    showDeleteAlert: boolean;
    shouldGoBackOnDelete?: boolean;
    setShowDeleteAlert: (visible: boolean) => void;
  } & BaseSheetProps
> = ({
  onSelectPress,
  closeSheet,
  estimateData,
  sheetRef,
  removeActions,
  setShowDeleteAlert,
  showDeleteAlert,
  shouldGoBackOnDelete,
}) => {
  const colors = useColors();

  const navigation = useNavigation<GeneralNavProp>();

  const [deleteEstimate] = useDeleteEstimateApiMutation();
  const [sendInvoiceReminder] = useSendEstimateReminderApiMutation();
  const [convertAcceptedEstimateToInvoice] =
    useConvertAcceptedEstimateToInvoiceApiMutation();

  const _handleSendEstimateReminder = async (invId: string) => {
    try {
      const response = await sendInvoiceReminder({
        estimateId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Estimate reminder sent successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };
  const _handleConvertAcceptedEstimateToInvoice = async (invId: string) => {
    try {
      const response = await convertAcceptedEstimateToInvoice({
        estimateId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Estimate reminder sent successfully',
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
      const response = await deleteEstimate({
        estimateId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Estimate deleted successfully',
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
        navigation.navigate(routesNames.EDIT_ESTIMATE, {
          estimate: estimateData,
        }),
    },
    {
      name: 'Duplicate',
      Icon: <CopyIcon stroke={colors.neutral_dark_5} />,
      onPress: () =>
        navigation.navigate(routesNames.CREATE_ESTIMATE, {
          duplicate: estimateData,
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
      onPress: () => _handleSendEstimateReminder(estimateData.id),
    },
    {
      name: 'Convert to invoice',
      Icon: <FilePlusIcon stroke={colors.neutral_dark_5} />,
      onPress: () => _handleConvertAcceptedEstimateToInvoice(estimateData.id),
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
          'You’re about to delete this estimate, would you like to proceed'
        }
        visible={showDeleteAlert}
        yesTitle={'Yes, Delete'}
        onNoPress={() => setShowDeleteAlert(false)}
        onYesPress={() => {
          _handleDelete(estimateData.id);
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

export default EstimateMoreSheet;
