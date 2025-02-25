import React, {FunctionComponent, useState} from 'react';
import {Pressable} from 'react-native';
import {BarChartIcon} from '../../../../assets/svg';
import {AppBackButton, AppScreen} from '../../../../components';
import {
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from '../../../../config/const';
import {useColors} from '../../../../hooks/useColors';
import {useSheet} from '../../../../hooks/useSheet';
import {useStickyHeaderAnimation} from '../../../../hooks/useStickyHeaderAnimation';
import {GeneralScreenProps} from '../../../../navigation/types';
import PurchaseOrderHeader from './header';
import {OrderReceivedList, OrderSentList} from './list';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

const PurchaseOrders: FunctionComponent<
  GeneralScreenProps<'PURCHASE_ORDERS'>
> = ({}) => {
  const colors = useColors();

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  const {
    closeSheet: closeFilterSheet,
    openSheet: openFilterSheet,
    sheetRef: filterSheetRef,
  } = useSheet();
  const {
    closeSheet: closeEditSheet,
    openSheet: openEditSheet,
    sheetRef: editSheetRef,
  } = useSheet();

  const {onScroll, translateY} = useStickyHeaderAnimation(CONTAINER_HEIGHT);

  return (
    <AppScreen
      isScrollable={false}
      ScreenHeader={
        <PurchaseOrderHeader
          LeftContent={isSelecting ? undefined : <AppBackButton title="More" />}
          leftTitle={isSelecting ? 'Cancel' : ''}
          current={current}
          onChangeTab={setCurrent}
          onPressLeft={() => {
            if (isSelecting) {
              setSelectedIds([]);
              closeEditSheet();
            }
            setIsSelecting(false);
          }}
          translateY={translateY}
          RightContent={
            <Pressable onPress={openFilterSheet}>
              <BarChartIcon fill={colors.neutral_dark_4} />
            </Pressable>
          }
        />
      }>
      {current === 0 ? (
        <OrderSentList
          filterSheet={{closeSheet: closeFilterSheet, sheetRef: filterSheetRef}}
          muitiDeleteSheet={{
            closeSheet: closeEditSheet,
            sheetRef: editSheetRef,
            openSheet: openEditSheet,
          }}
          isSelecting={isSelecting}
          selectedIds={selectedIds}
          setIsSelecting={setIsSelecting}
          setSelectedIds={setSelectedIds}
          onScroll={onScroll}
        />
      ) : (
        <OrderReceivedList
          filterSheet={{closeSheet: closeFilterSheet, sheetRef: filterSheetRef}}
          muitiDeleteSheet={{
            closeSheet: closeEditSheet,
            sheetRef: editSheetRef,
            openSheet: openEditSheet,
          }}
          isSelecting={isSelecting}
          selectedIds={selectedIds}
          setIsSelecting={setIsSelecting}
          setSelectedIds={setSelectedIds}
          onScroll={onScroll}
        />
      )}
    </AppScreen>
  );
};

export default PurchaseOrders;
