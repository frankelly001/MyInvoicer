import React, {FunctionComponent, ReactNode, useState} from 'react';
import {Animated} from 'react-native';
import {
  AnimatedTabHeader,
  AppConfirm,
  AppLoading,
  AppText,
  ItemCard,
} from '../../../../../components';
import AnimatedHeaderContent from '../../../../../components/animated-header/animated-header-content';
import {showToast} from '../../../../../components/app-toast';
import {useSheet} from '../../../../../hooks/useSheet';
import {
  useSearchItemApiQuery,
  useUpdateItemApiMutation,
} from '../../../../../state/services/item/api';
import {Item} from '../../../../../types/Item';
import {getErrorMessage} from '../../../../../utils/helpers';
import {ItemFormSheet} from '../../../common';
import {AddItemSchemaType} from '../../../common/item-form-sheet/shema';
import ItemDetailsSheet from '../details-sheet';

const ItemHeader: FunctionComponent<{
  onPressLeft: () => void;
  leftTitle: string;
  LeftContent: ReactNode;
  translateY: Animated.AnimatedInterpolation<string | number> | undefined;
  onDelete?: (id: string) => void;
}> = ({
  onPressLeft,

  leftTitle,
  translateY,

  LeftContent,
  onDelete = () => null,
}) => {
  const [searchText, setSearchText] = useState('');
  const {currentData = [], isFetching: isSearching} = useSearchItemApiQuery(
    {
      searchTerm: searchText,
    },
    {skip: searchText.length < 1},
  );
  const [updateItem, {isLoading}] = useUpdateItemApiMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

  const submit = async ({
    values,
    reset,
  }: {
    values: AddItemSchemaType;
    reset: () => void;
  }) => {
    if (selectedItem) {
      try {
        const response = await updateItem({
          updateItem: {
            currency: values.currency,
            name: values.productName,
            description: values.description,
            price: values.price,
            unit: values.unit,
            itemId: selectedItem?.id,
          },
        }).unwrap();
        reset();
        showToast('SUCCESS', {
          title: 'Item Created successfully',
          message: response.message,
        });
        setSelectedItem(null);
      } catch (error) {
        showToast('SUCCESS', {
          message: 'Item Created successfully',
          title: getErrorMessage(error),
        });
      }
    }
  };

  return (
    <>
      <AppLoading visible={isLoading} />
      <AnimatedTabHeader
        translateY={translateY}
        screenTitle={'Items'}
        leftTitle={leftTitle}
        LeftContent={LeftContent}
        onPressLeft={onPressLeft}
        MiddleContent={
          <AnimatedHeaderContent translateY={translateY}>
            <AppText
              color={'neutral_dark_5'}
              text={'item'}
              align="center"
              textTransform="capitalize"
              type={'heading_h4'}
            />
          </AnimatedHeaderContent>
        }
        search={{
          isSearching,
          searchText,
          onChangeSearchText: setSearchText,
          searchResultData: currentData,
          searchResultKeyExtractor: item => item.id,
          // renderSearchResultItem: renderedItem => (
          //   <RenderBillItem
          //     renderedItem={renderedItem}
          //     enableSwipe={false}
          //     onDelete={() => onDelete(renderedItem.item.id)}
          //   />
          // ),
          renderSearchResultItem: ({item, index}, onSearchToggle) => (
            <ItemCard
              name={item.name}
              price={item.price}
              currency={item.currency}
              description={item.description}
              listNum={index + 1}
              enableSwipe={false}
              onPress={() => {
                setSelectedItem(item);
                openDetailsSheet();
                onSearchToggle(false);
                setSearchText('');
              }}
            />
          ),
        }}
      />
      <ItemFormSheet
        closeSheet={closeEditSheet}
        sheetRef={editSheetRef}
        defaultValues={{
          currency: selectedItem?.currency ?? '',
          description: selectedItem?.description ?? '',
          price: selectedItem?.price ?? '',
          productName: selectedItem?.name ?? '',
          unit: selectedItem?.unit ?? '',
        }}
        onSubmit={submit}
      />
      <ItemDetailsSheet
        closeSheet={closeDetailsSheet}
        sheetRef={detailsSheetRef}
        onDelete={() => setShowAlert(true)}
        onEdit={openEditSheet}
        itemBill={{
          name: selectedItem?.name ?? '',
          price: selectedItem?.price ?? '',
          description: selectedItem?.description ?? '',
          unit: selectedItem?.unit ?? '',
          currency: selectedItem?.currency ?? '',
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
          onDelete(selectedItem?.id ?? '');
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

export default ItemHeader;
