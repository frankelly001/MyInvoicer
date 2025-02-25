/* eslint-disable react/no-unstable-nested-components */
import React, {FunctionComponent, useState} from 'react';
import {Animated, ListRenderItemInfo, View} from 'react-native';
import {IHandles} from 'react-native-modalize/lib/options';
import {EditSquareIcon, PenIcon, SelectIcon} from '../../../../assets/svg';
import {
  AnimatedTabHeader,
  AppAlert,
  AppBackButton,
  AppBottomSheet,
  AppButton,
  AppDeleteSheet,
  AppLoading,
  AppScreen,
  AppSeperator,
  AppText,
  DashedView,
  ItemCard,
} from '../../../../components';
import AppListButton from '../../../../components/app-list-button';
import {showToast} from '../../../../components/app-toast';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from '../../../../config/const';
import {useColors} from '../../../../hooks/useColors';
import {useSheet} from '../../../../hooks/useSheet';
import {useStickyHeaderAnimation} from '../../../../hooks/useStickyHeaderAnimation';
import {GeneralScreenProps} from '../../../../navigation/types';
import {
  useDeleteItemApiMutation,
  useDeleteMultipleItemApiMutation,
  useGetAllItemsApiQuery,
  useUpdateItemApiMutation,
} from '../../../../state/services/item/api';
import {Item} from '../../../../types/Item';
import {getErrorMessage} from '../../../../utils/helpers';
import {itemDetailsSheetStyles, itemsStyle} from './styles';
import {ItemFormSheet} from '../../common';
import {AddItemSchemaType} from '../../common/item-form-sheet/shema';
import {BaseSheetProps} from '../../types/Sheet';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

const Items: FunctionComponent<GeneralScreenProps<'ITEMS'>> = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    closeSheet: closeDeleteSheet,
    openSheet: openDeleteSheet,
    sheetRef: deleteSheetRef,
  } = useSheet();

  const {data: itemData, isLoading: isItemsLoading} = useGetAllItemsApiQuery(
    {},
  );
  const [deleteItem, {isLoading: isDeleteItemLoading}] =
    useDeleteItemApiMutation();
  const [deleteMultipleInvoice, {isLoading: isDeleteMultipleItemLoading}] =
    useDeleteMultipleItemApiMutation();

  const styles = itemsStyle;

  const {
    onScroll,
    translateY,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
  } = useStickyHeaderAnimation(CONTAINER_HEIGHT);

  const _handleDelete = async (invId: string) => {
    try {
      const response = await deleteItem({
        itemId: invId,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Item deleted successfully',
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
          arrayOfItemId: selectedIds,
        }).unwrap();
        showToast('SUCCESS', {
          title: 'Item deleted successfully',
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

  const handleSelect = (itemId: string) => {
    const isChecked = selectedIds.includes(itemId);
    setSelectedIds(
      !isChecked
        ? [...selectedIds.filter(el => el !== itemId), itemId]
        : selectedIds.filter(el => el !== itemId),
    );
  };

  // const renderItemBillItem = ({item, index}: ListRenderItemInfo<Item>) => {
  //   const isChecked = selectedIds.includes(item.id);
  //   const handlePress = () => {
  //     setSelectedIds(
  //       !isChecked
  //         ? [...selectedIds.filter(el => el !== item.id), item.id]
  //         : selectedIds.filter(el => el !== item.id),
  //     );
  //   };

  //   return (
  //     <ItemBillCard
  //       name={item.name}
  //       price={item.price}
  //       currency={item.currency}
  //       description={item.description}
  //       unit={item.unit}
  //       itemId={item.id}
  //       isSelecting={isSelecting}
  //       selected={isChecked}
  //       listNum={index + 1}
  //       enableSwipe={!isSelecting}
  //       onPress={handlePress}
  //       onDelete={() => _handleDelete(item.id)}
  //       sheetProps={{
  //         onEdit: undefined,
  //         onSelect: undefined,
  //       }}
  //     />
  //   );
  // };

  return (
    <AppScreen isScrollable={false}>
      <AnimatedTabHeader
        translateY={translateY}
        screenTitle={'Items'}
        leftContent={<AppBackButton title="More" />}
        scrollHeaderProps={{
          middleTitle: 'Items',
          leftContent: <AppBackButton title="More" />,
          onPressLeft: () => {
            if (!isSelecting) {
              openDeleteSheet();
            } else {
              setSelectedIds([]);
              closeDeleteSheet();
            }
            setIsSelecting(!isSelecting);
          },
        }}
      />
      <AppLoading
        visible={
          isDeleteItemLoading || isDeleteMultipleItemLoading || isItemsLoading
        }
      />

      <Animated.FlatList
        data={itemData?.data}
        onScroll={onScroll}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onEndReached={onMomentumScrollEnd}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: CONTAINER_HEIGHT,
          paddingBottom: CONTAINER_HEIGHT,
        }}
        ItemSeparatorComponent={() => (
          <AppSeperator containerStyle={styles.seperator} />
        )}
        keyExtractor={item => item.id}
        renderItem={renderedItem => (
          <ItemBillCard
            renderedItem={renderedItem}
            isSelecting={isSelecting}
            selected={selectedIds.includes(renderedItem.item.id)}
            onDelete={() => _handleDelete(renderedItem.item.id)}
            onSelect={() => handleSelect(renderedItem.item.id)}
          />
        )}
      />

      <AppDeleteSheet sheetRef={deleteSheetRef} closeSheet={closeDeleteSheet} />
      <AppDeleteSheet
        onClose={() => {
          setSelectedIds([]);
          setIsSelecting(false);
        }}
        shouldCloseSheetWhenItemPressed={!!selectedIds.length}
        sheetRef={deleteSheetRef}
        closeSheet={closeDeleteSheet}
        onPressDelete={_handleMultipleDelete}
      />
    </AppScreen>
  );
};

export default Items;

export const ItemBillCard: FunctionComponent<{
  renderedItem: ListRenderItemInfo<Item>;
  isSelecting: boolean;
  selected: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}> = ({
  isSelecting,
  renderedItem,
  selected,
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
  const [updateItem] = useUpdateItemApiMutation();
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
      <ItemCard
        name={item.name}
        price={item.price}
        currency={item.currency}
        description={item.description}
        isSelecting={isSelecting}
        selected={selected}
        listNum={index + 1}
        enableSwipe={!isSelecting}
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
        }}
      />
      <AppAlert
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
// export const ItemBillCard: FunctionComponent<
//   Omit<ItemCardProps, 'onDeletePress' | 'onLongPress' | 'onMorePress'> & {
//     sheetProps: {
//       onEdit?: () => void;
//       onSelect?: () => void;
//     };
//     itemId: string;
//     unit: string;
//     onDelete?: () => void;
//   }
// > = ({
//   sheetProps,
//   isSelecting,
//   onPress = () => null,
//   onDelete = () => null,
//   itemId,
//   ...props
// }) => {
//   const {
//     closeSheet: closeMoreSheet,
//     openSheet: openMoreSheet,
//     sheetRef: moreSheetRef,
//   } = useSheet();
//   const {
//     closeSheet: closeEditSheet,
//     openSheet: openEditSheet,
//     sheetRef: editSheetRef,
//   } = useSheet();
//   const {
//     closeSheet: closeDetailsSheet,
//     openSheet: openDetailsSheet,
//     sheetRef: detailsSheetRef,
//   } = useSheet();
//   const colors = useColors();
//   const [showAlert, setShowAlert] = useState(false);
//   const [updateItem] = useUpdateItemApiMutation();
//   const createBtns = [
//     {
//       name: 'Edit',
//       Icon: <EditSquareIcon fill={colors.neutral_dark_5} />,
//       onPress: openEditSheet,
//     },

//     {
//       name: 'Select',
//       Icon: <SelectIcon stroke={colors.neutral_dark_5} />,
//       onPress: sheetProps.onSelect,
//     },
//   ];

//   const submit = async ({
//     values,
//     reset,
//   }: {
//     values: AddItemSchemaType;
//     reset: () => void;
//   }) => {
//     try {
//       const response = await updateItem({
//         updateItem: {
//           currency: values.currency,
//           name: values.productName,
//           description: values.description,
//           price: values.price,
//           unit: values.unit,
//           itemId: itemId,
//         },
//       }).unwrap();
//       reset();
//       showToast('SUCCESS', {
//         title: 'Item Created successfully',
//         message: response.message,
//       });
//     } catch (error) {
//       showToast('SUCCESS', {
//         message: 'Item Created successfully',
//         title: getErrorMessage(error),
//       });
//     }
//   };

//   return (
//     <>
//       <ItemCard
//         onLongPress={openMoreSheet}
//         onMorePress={() => {
//           openMoreSheet();
//         }}
//         onPress={() => {
//           if (!isSelecting) {
//             openDetailsSheet();
//           } else {
//             onPress();
//           }
//         }}
//         onDeletePress={() => setShowAlert(true)}
//         {...props}
//       />
//       <AppBottomSheet
//         title="More"
//         sheetRef={moreSheetRef}
//         closeSheet={closeMoreSheet}
//         shouldCloseSheetOnItemPressed
//         optionsBtns={createBtns}
//       />
//       <ItemFormSheet
//         closeSheet={closeEditSheet}
//         sheetRef={editSheetRef}
//         defaultValues={{
//           currency: props.currency,
//           description: props.description,
//           price: props.price,
//           productName: props.name,
//           unit: props.unit,
//         }}
//         onSubmit={submit}
//       />
//       <ItemDetailsSheet
//         closeSheet={closeDetailsSheet}
//         sheetRef={detailsSheetRef}
//         onDelete={() => setShowAlert(true)}
//         onEdit={openEditSheet}
//         itemBill={{
//           name: props.name ?? '',
//           price: props.price ?? '',
//           description: props.description ?? '',
//           unit: props.unit ?? '',
//         }}
//       />
//       <AppAlert
//         title="Delete Item"
//         description={
//           'You’re about to delete this Item, would you like to proceed'
//         }
//         visible={showAlert}
//         yesTitle={'Yes, Delete'}
//         onNoPress={() => setShowAlert(false)}
//         onYesPress={() => {
//           onDelete();
//           setShowAlert(false);
//         }}
//         yesBtnProps={{
//           buttonColor: 'support_error_3',
//           borderColor: 'support_error_3',
//         }}
//       />
//     </>
//   );
// };

const ItemDetailsSheet: FunctionComponent<
  {
    onEdit?: () => void;
    onDelete?: () => void;
    itemBill: {name: string; description: string; unit: string; price: string};
  } & BaseSheetProps
> = ({
  closeSheet = () => null,
  sheetRef,
  itemBill,
  onDelete = () => null,
  onEdit = () => null,
}) => {
  const colors = useColors();
  const details: {
    value: string;
    label: string;
    width: `${number}%`;
  }[] = [
    {value: itemBill.price, label: 'Price', width: '47%'},
    {
      value: itemBill.unit,
      label: 'Unit',
      width: '47%',
    },
  ];

  const styles = itemDetailsSheetStyles;

  return (
    <AppBottomSheet
      title={itemBill.name}
      sheetRef={sheetRef}
      closeSheet={closeSheet}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          {details.map(item => (
            <DashedView
              key={item.label}
              value={item.value}
              label={item.label}
              style={{...styles.detail, width: item.width}}
            />
          ))}
        </View>
        <AppListButton
          LeftIcon={<PenIcon stroke={colors.neutral_dark_4} />}
          title={'Description'}
          titleSize="action_l"
          style={styles.descriptionLabel}
          disabled
        />
        <AppText
          text={itemBill.description}
          type="body_m"
          style={styles.descriptionValue}
        />
        <View style={styles.actionBtnContainer}>
          <AppButton
            text="Delete"
            buttonColor="neutral_light_1"
            textColor="support_error_3"
            borderColor="support_error_3"
            borderWidth={1.5}
            style={styles.submitBtn}
            onPress={() => {
              onDelete();
              closeSheet();
            }}
          />
          <AppButton
            text="Edit"
            borderWidth={1.5}
            borderColor="highlight_5"
            style={styles.submitBtn}
            onPress={() => {
              onEdit();
              closeSheet();
            }}
          />
        </View>
      </View>
    </AppBottomSheet>
  );
};
