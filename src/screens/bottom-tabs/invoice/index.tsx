import {FlashList} from '@shopify/flash-list';
import React, {FunctionComponent, useRef, useState} from 'react';
import {Pressable} from 'react-native';
import {BarChartIcon} from '../../../assets/svg';
import {AppScreen} from '../../../components';
import {HEADER_SEARCH_HEIGHT, HEADER_TITLE_HEIGHT} from '../../../config/const';
import {useColors} from '../../../hooks/useColors';
import {useSheet} from '../../../hooks/useSheet';
import {useStickyHeaderAnimation} from '../../../hooks/useStickyHeaderAnimation';
import {GeneralScreenProps} from '../../../navigation/types';
import InvoiceHeader from './header';
import {InvoiceReceivedList, InvoiceSentList} from './list';

const CONTAINER_HEIGHT = HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT;

const Invoice: FunctionComponent<GeneralScreenProps<'INVOICE'>> = () => {
  const colors = useColors();
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  const listRef = useRef<FlashList<any>>(null);

  const {
    closeSheet: closeFilterSheet,
    openSheet: openFilterSheet,
    sheetRef: filterSheetRef,
  } = useSheet();
  const {
    closeSheet: closeDeleteSheet,
    openSheet: openDeleteSheet,
    sheetRef: deleteSheetRef,
  } = useSheet();

  const {onScroll, translateY, setTranslateY} =
    useStickyHeaderAnimation(CONTAINER_HEIGHT);

  return (
    <AppScreen
      isScrollable={false}
      ScreenHeader={
        <InvoiceHeader
          translateY={translateY}
          RightContent={
            <Pressable onPress={openFilterSheet}>
              <BarChartIcon fill={colors.neutral_dark_4} />
            </Pressable>
          }
          current={current}
          onChangeTab={val => {
            setCurrent(val);
            setTranslateY(0);
            listRef.current?.scrollToOffset({offset: 0, animated: true});
          }}
          leftTitle={isSelecting ? 'Cancel' : ''}
          onPressLeft={() => {
            if (isSelecting) {
              setSelectedIds([]);
              closeDeleteSheet();
            }
            setIsSelecting(false);
          }}
        />
      }>
      {!current ? (
        <InvoiceSentList
          listRef={listRef}
          filterSheet={{
            closeSheet: closeFilterSheet,
            sheetRef: filterSheetRef,
          }}
          muitiDeleteSheet={{
            closeSheet: closeDeleteSheet,
            sheetRef: deleteSheetRef,
            openSheet: openDeleteSheet,
          }}
          isSelecting={isSelecting}
          selectedIds={selectedIds}
          setIsSelecting={setIsSelecting}
          setSelectedIds={setSelectedIds}
          onScroll={onScroll}
        />
      ) : (
        <InvoiceReceivedList
          listRef={listRef}
          filterSheet={{
            closeSheet: closeFilterSheet,
            sheetRef: filterSheetRef,
          }}
          muitiDeleteSheet={{
            closeSheet: closeDeleteSheet,
            sheetRef: deleteSheetRef,
            openSheet: openDeleteSheet,
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

export default Invoice;
