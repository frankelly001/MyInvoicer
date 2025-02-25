import React, {FunctionComponent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppBackButton,
  AppDeleteSheet,
  AppFlashList,
  AppScreen,
  AppSeperator,
} from '../../../../components';
import {showToast} from '../../../../components/app-toast';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from '../../../../config/const';
import {useSheet} from '../../../../hooks/useSheet';
import {useStickyHeaderAnimation} from '../../../../hooks/useStickyHeaderAnimation';
import {GeneralScreenProps} from '../../../../navigation/types';
import {
  notificationAdapter,
  notificationSelector,
  useDeleteMultipleNotificationApiMutation,
  useDeleteNotificationApiMutation,
  useGetAllNotificationsApiQuery,
  useMarkAllNotificationsAsReadApiMutation,
  useMarkNotificationAsReadOrUnReadApiMutation,
} from '../../../../state/services/notification/api';
import {
  apiListParamsState,
  setNotificationApiListParams,
} from '../../../../state/slices/api-list-params/apiListParamsSlice';
import {getErrorMessage} from '../../../../utils/helpers';
import NotificationHeader from './header';
import RenderNotificationItem from './render-notification-item';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;
const Notifications: FunctionComponent<
  GeneralScreenProps<'NOTIFICATIONS'>
> = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {notificationApiListParams} = useSelector(apiListParamsState);
  const dispatch = useDispatch();

  const {
    data: notificationsData,
    isFetching,
    isLoading,
  } = useGetAllNotificationsApiQuery(notificationApiListParams, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: notificationSelector.selectAll(
          data?.data ?? notificationAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const [deleteInvoice, {isLoading: isDeleteInvoice}] =
    useDeleteNotificationApiMutation();
  const [deleteMultipleInvoice, {isLoading: isDeletingMultipleInvoice}] =
    useDeleteMultipleNotificationApiMutation();
  const [markAllAsRead, {isLoading: isMarkingAllAsRead}] =
    useMarkAllNotificationsAsReadApiMutation();
  const [markAsReadOrUnread, {isLoading: isMarkingAsReadOrUnread}] =
    useMarkNotificationAsReadOrUnReadApiMutation();

  const _handleAsRead = async (notificationId: string) => {
    try {
      const response = await markAsReadOrUnread({
        notificationId,
        type: 'read',
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Notification read successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  const _handleDelete = async (notificationId: string) => {
    try {
      const response = await deleteInvoice({
        notificationId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Notification deleted successfully',
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
        const response = await deleteMultipleInvoice({
          arrayOfNotificationId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Notifications deleted successfully',
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

  const {
    closeSheet: closeEditSheet,
    openSheet: openEditSheet,
    sheetRef: editSheetRef,
  } = useSheet();

  const {onScroll, translateY} = useStickyHeaderAnimation(CONTAINER_HEIGHT);

  const handleSelect = (itemId: string) => {
    if (!isSelecting) {
      setSelectedIds([itemId]);
      setIsSelecting(true);
      openEditSheet();
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
        <NotificationHeader
          LeftContent={isSelecting ? undefined : <AppBackButton title="More" />}
          leftTitle={isSelecting ? 'Cancel' : ''}
          onMarkAsRead={_handleAsRead}
          onPressLeft={() => {
            if (isSelecting) {
              setSelectedIds([]);
              closeEditSheet();
            }
            setIsSelecting(false);
          }}
          translateY={translateY}
          onPressRight={markAllAsRead}
        />
      }>
      <AppFlashList
        data={notificationsData?.data}
        onScroll={onScroll}
        isLoading={isLoading}
        showsVerticalScrollIndicator={false}
        isFetchingMore={isFetching}
        contentContainerPaddingTop={CONTAINER_HEIGHT}
        ItemSeparatorComponent={AppSeperator}
        onEndReached={() => {
          if (
            !isFetching &&
            notificationsData.nextPage &&
            notificationsData.data.length
          ) {
            dispatch(
              setNotificationApiListParams({
                page: notificationsData.nextPage,
              }),
            );
          }
        }}
        keyExtractor={item => item.id}
        renderItem={renderedItem => {
          return (
            <RenderNotificationItem
              selected={selectedIds.includes(renderedItem.item.id)}
              onSelect={() => handleSelect(renderedItem.item.id)}
              onDelete={() => _handleDelete(renderedItem.item.id)}
              onMarkAsRead={() => _handleAsRead(renderedItem.item.id)}
              isSelecting={isSelecting}
              shouldCloseSlide={
                isSelecting ||
                isMarkingAllAsRead ||
                isDeleteInvoice ||
                isDeletingMultipleInvoice ||
                isMarkingAsReadOrUnread
              }
              renderedItem={renderedItem}
            />
          );
        }}
      />
      <AppDeleteSheet
        onClose={() => {
          setSelectedIds([]);
          setIsSelecting(false);
        }}
        shouldCloseSheetWhenItemPressed={!!selectedIds.length}
        sheetRef={editSheetRef}
        closeSheet={closeEditSheet}
        onPressDelete={_handleMultipleDelete}
      />
    </AppScreen>
  );
};
export default Notifications;
