import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import {
  AppButton,
  AppSearchInput,
  AppSheetList,
} from '../../../../../../../components';
import {showToast} from '../../../../../../../components/app-toast';
import {
  itemAdapter,
  itemSelector,
  useSearchItemsPaginatedApiQuery,
} from '../../../../../../../state/services/item/api';
import {BaseSheetProps} from '../../../../../../../types/Sheet';
import {getCurrencySymbol} from '../../../../../../../utils/helpers';
import {AddBillItemSchemaType} from '../add-item-form-sheet/schema';
import TotalSummary from '../common/total-summary';
import SelectItemCard from './select-item-card';
import {selectItemFormSheetStyles} from './styles';

const styles = selectItemFormSheetStyles;
const SelectItemFormSheet: FunctionComponent<
  {
    onSubmit: (values: AddBillItemSchemaType[]) => void;
    currency: string | undefined;
  } & BaseSheetProps
> = ({sheetRef, closeSheet = () => null, onSubmit, currency}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const {data: itemsData, isFetching} = useSearchItemsPaginatedApiQuery(
    {currency, searchTerm, page, documentCount: 10},
    {
      skip: !currency,
      selectFromResult: ({data, ...otherParams}) => ({
        data: {
          ...data,
          data: itemSelector.selectAll(
            data?.data ?? itemAdapter.getInitialState(),
          ),
        },
        ...otherParams,
      }),
    },
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [itemQuantitys, setItemQuantitys] = useState<{[key: string]: number}>(
    {},
  );

  const handleSelected = (id: string) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
      handleAdd(id, itemQuantitys[id] || 1);
    } else {
      setSelectedIds(selectedIds.filter(el => el !== id));
    }
  };

  const handleAdd = (id: string, payload?: number) => {
    setItemQuantitys({
      ...itemQuantitys,
      [id]: payload ? payload : !itemQuantitys[id] ? 2 : itemQuantitys[id] + 1,
    });
  };

  const handleSub = (id: string) => {
    if (itemQuantitys?.[id] > 1) {
      setItemQuantitys({
        ...itemQuantitys,
        [id]: itemQuantitys[id] - 1,
      });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    selectedIds.forEach(id => {
      const item = itemsData?.data.find(elItem => elItem.id === id);
      const quantity = itemQuantitys[id] ?? 0;
      total += Number(item?.price) * quantity;
    });
    return total;
  };

  return (
    <AppSheetList
      sheetRef={sheetRef}
      panGestureEnabled={false}
      adjustToContentHeight={false}
      onClose={() => {
        setSelectedIds([]);
        setItemQuantitys({});
        setSearchTerm('');
      }}
      title="Select item"
      closeSheet={closeSheet}
      AdditionalHeaderContent={
        <AppSearchInput
          placeholder="Search invoices"
          containerStyle={styles.searchContainer}
          onChangeText={text => {
            setSearchTerm(text);
            setPage(1);
          }}
          value={searchTerm}
        />
      }
      data={itemsData?.data}
      renderItem={({item}) => (
        <SelectItemCard
          itemName={item.name}
          description={item.description}
          isSelected={selectedIds.includes(item.id)}
          quantity={itemQuantitys?.[item.id] ?? 1}
          totalPrice={`${getCurrencySymbol(item.currency)} ${item.price}`}
          onPress={() => handleSelected(item.id)}
          onAddPress={() => handleAdd(item.id)}
          onSubPress={() => handleSub(item.id)}
        />
      )}
      keyExtractor={item => item.id}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!isFetching && itemsData?.nextPage && itemsData.data.length) {
          setPage(itemsData?.nextPage);
          showToast('INFO', {message: 'i dy update ooo', title: 'yess'});
        }
      }}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      FooterComponent={
        <View style={styles.footerContainer}>
          <TotalSummary
            total={`${getCurrencySymbol(currency) || ''} ${calculateTotal()}`}
          />
          <AppButton
            text="Proceed"
            borderWidth={1.5}
            borderColor="highlight_5"
            onPress={() => {
              const itemsLookup =
                itemsData?.data?.reduce<
                  Record<string, (typeof itemsData.data)[0]>
                >((acc, item) => {
                  acc[item.id] = item;
                  return acc;
                }, {}) || {};

              const selectedItemsWithDetails = selectedIds.map(id => {
                const item = itemsLookup[id];
                return {
                  productName: item?.name,
                  description: item?.description,
                  price: item?.price,
                  total: `${Number(item?.price) * (itemQuantitys[id] ?? 0)}`,
                  quantity: `${itemQuantitys[id]}`, // renamed 'unit' to 'quantity'
                  unit: item.unit,
                };
              });

              onSubmit(selectedItemsWithDetails);
              closeSheet();
            }}
          />
        </View>
      }
    />
  );
};

export default SelectItemFormSheet;
