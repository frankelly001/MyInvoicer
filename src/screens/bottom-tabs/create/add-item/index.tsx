import React, {FunctionComponent} from 'react';
import {AppLoading} from '../../../../components';
import {showToast} from '../../../../components/app-toast';
import {useCreateItemApiMutation} from '../../../../state/services/item/api';
import {BaseSheetProps} from '../../../../types/Sheet';
import {getErrorMessage} from '../../../../utils/helpers';
import {ItemFormSheet} from '../../common';
import {AddItemSchemaType} from '../../common/item-form-sheet/shema';

const AddNewItemSheet: FunctionComponent<BaseSheetProps> = ({
  closeSheet = () => null,
  sheetRef,
}) => {
  const [createItem, {isLoading}] = useCreateItemApiMutation();

  const submit = async ({
    values,
    reset,
  }: {
    values: AddItemSchemaType;
    reset: () => void;
  }) => {
    try {
      const response = await createItem({
        createItem: {
          currency: values.currency,
          name: values.productName,
          description: values.description,
          price: values.price,
          unit: values.unit,
        },
      }).unwrap();
      reset();
      showToast('SUCCESS', {
        title: 'Item Created successfully',
        message: response.message,
      });
      closeSheet();
    } catch (error) {
      showToast('ERROR', {
        message: 'Error Encountered!',
        title: getErrorMessage(error),
      });
    }
  };

  return (
    <>
      <AppLoading visible={isLoading} />
      <ItemFormSheet
        closeSheet={closeSheet}
        sheetRef={sheetRef}
        onSubmit={submit}
      />
    </>
  );
};

export default AddNewItemSheet;
