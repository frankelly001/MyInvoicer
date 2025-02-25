import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent, useState} from 'react';
import {AppConfirm, NotificationCard} from '../../../../../components';
import {routesNames} from '../../../../../navigation/routes';
import {GeneralNavProp} from '../../../../../navigation/types';
import {Notification} from '../../../../../types/Notifications';
import {convertToReadableDate} from '../../../../../utils/helpers';
import {ListRenderItemInfo} from '@shopify/flash-list';

const RenderNotificationItem: FunctionComponent<{
  isSelecting: boolean;
  shouldCloseSlide: boolean;
  renderedItem: ListRenderItemInfo<Notification>;
  selected: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  onMarkAsRead?: () => void;
}> = ({
  renderedItem,
  isSelecting,
  selected,
  shouldCloseSlide,
  onDelete = () => null,
  onSelect = () => null,
  onMarkAsRead = () => null,
}) => {
  const {item} = renderedItem;
  const navigation = useNavigation<GeneralNavProp>();
  const [showAlert, setShowAlert] = useState(false);

  const navigationTypes = {
    estimate: (estimateId: string) =>
      navigation.navigate(routesNames.PREVIEW_ESTIMATE, {estimateId}),
    invoice: (invoiceId: string) =>
      navigation.navigate(routesNames.PREVIEW_INVOICE, {invoiceId}),
    order: (orderId: string) =>
      navigation.navigate(routesNames.PREVIEW_PURCHASE_ORDER, {orderId}),
    receipt: (receiptId: string) =>
      navigation.navigate(routesNames.PREVIEW_SALES_RECEIPT, {receiptId}),
    timesheet: () => null,
    customer: () => null,
  };

  return (
    <>
      <NotificationCard
        selected={selected}
        duration={convertToReadableDate(item.createdAt)}
        title={item.title}
        subTitle={item.message}
        isRead={item.isRead}
        onPress={() => {
          if (!isSelecting) {
            onMarkAsRead();
            return navigationTypes?.[item.type](item.id) ?? null;
          } else {
            onSelect();
          }
        }}
        onLongPress={onSelect}
        onDeletePress={() => setShowAlert(true)}
        enableSwipe={!isSelecting}
        isSelecting={isSelecting}
        shouldCloseSlide={shouldCloseSlide}
      />
      <AppConfirm
        title="Delete invoice"
        description={
          'You’re about to delete this notification, would you like to proceed'
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

export default RenderNotificationItem;
