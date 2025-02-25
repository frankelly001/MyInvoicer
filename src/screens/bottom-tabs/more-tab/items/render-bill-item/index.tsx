import React, {FunctionComponent, useState} from 'react';
import {EditSquareIcon, SelectIcon} from '../../../../../assets/svg';
import {
  AppConfirm,
  AppBottomSheet,
  AppLoading,
  ItemCard,
} from '../../../../../components';
import {showToast} from '../../../../../components/app-toast';
import {useColors} from '../../../../../hooks/useColors';
import {useSheet} from '../../../../../hooks/useSheet';
import {useUpdateItemApiMutation} from '../../../../../state/services/item/api';
import {Item} from '../../../../../types/Item';
import {getErrorMessage} from '../../../../../utils/helpers';
import {ItemFormSheet} from '../../../common';
import {AddItemSchemaType} from '../../../common/item-form-sheet/shema';
import ItemDetailsSheet from '../details-sheet';
import {ListRenderItemInfo} from '@shopify/flash-list';

export const RenderBillItem: FunctionComponent<{
  renderedItem: ListRenderItemInfo<Item>;
  isSelecting?: boolean;
  shouldCloseSlide?: boolean;
  selected?: boolean;
  enableSwipe?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}> = ({
  isSelecting,
  shouldCloseSlide,
  renderedItem,
  selected,
  enableSwipe,
  onSelect = () => null,
  onDelete = () => null,
}) => {
  const {
    closeSheet: closeMoreSheet,
    openSheet: openMoreSheet,
    sheetRef: moreSheetRef,
  } = useSheet();
  const {
    closeSheet: closeEditSheet,
    openSheet: openEditSheet,
    sheetRef: editSheetRef,
  } = useSheet();
  const {
    closeSheet: closeDetailsSheet,
    openSheet: openDetailsSheet,
    sheetRef: detailsSheetRef,
  } = useSheet();
  const colors = useColors();
  const [showAlert, setShowAlert] = useState(false);
  const [updateItem, {isLoading}] = useUpdateItemApiMutation();
  const {index, item} = renderedItem;
  const createBtns = [
    {
      name: 'Edit',
      Icon: <EditSquareIcon fill={colors.neutral_dark_5} />,
      onPress: openEditSheet,
    },

    {
      name: 'Select',
      Icon: <SelectIcon stroke={colors.neutral_dark_5} />,
      onPress: onSelect,
    },
  ];

  const submit = async ({
    values,
    reset,
  }: {
    values: AddItemSchemaType;
    reset: () => void;
  }) => {
    try {
      const response = await updateItem({
        updateItem: {
          currency: values.currency,
          name: values.productName,
          description: values.description,
          price: values.price,
          unit: values.unit,
          itemId: item.id,
        },
      }).unwrap();
      reset();
      showToast('SUCCESS', {
        title: 'Item Created successfully',
        message: response.message,
      });
    } catch (error) {
      showToast('SUCCESS', {
        message: 'Item Created successfully',
        title: getErrorMessage(error),
      });
    }
  };

  return (
    <>
      <AppLoading visible={isLoading} />
      <ItemCard
        name={item.name}
        price={item.price}
        currency={item.currency}
        description={item.description}
        isSelecting={isSelecting}
        shouldCloseSlide={shouldCloseSlide || isLoading}
        selected={selected}
        listNum={index + 1}
        enableSwipe={enableSwipe}
        onLongPress={openMoreSheet}
        onMorePress={() => {
          openMoreSheet();
        }}
        onPress={() => {
          if (!isSelecting) {
            openDetailsSheet();
          } else {
            onSelect();
          }
        }}
        onDeletePress={() => setShowAlert(true)}
      />
      <AppBottomSheet
        title="More"
        sheetRef={moreSheetRef}
        closeSheet={closeMoreSheet}
        shouldCloseSheetOnItemPressed
        optionsBtns={createBtns}
      />
      <ItemFormSheet
        closeSheet={closeEditSheet}
        sheetRef={editSheetRef}
        defaultValues={{
          currency: item.currency,
          description: item.description,
          price: item.price,
          productName: item.name,
          unit: item.unit,
        }}
        onSubmit={submit}
      />
      <ItemDetailsSheet
        closeSheet={closeDetailsSheet}
        sheetRef={detailsSheetRef}
        onDelete={() => setShowAlert(true)}
        onEdit={openEditSheet}
        itemBill={{
          name: item.name,
          price: item.price,
          description: item.description,
          unit: item.unit,
          currency: item.currency,
        }}
      />
      <AppConfirm
        title="Delete Item"
        description={
          'You’re about to delete this Item, would you like to proceed'
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

export default RenderBillItem;
