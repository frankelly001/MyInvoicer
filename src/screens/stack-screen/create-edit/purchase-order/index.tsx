import React, {FunctionComponent} from 'react';
import {GeneralScreenProps} from '../../../../navigation/types';
import {AllInputFields} from '../../../../types/Fields';
import BillFormScreen from '../common/bill-form-screen';
import {FormType, BillFormSubmitProps} from '../common/type';
import {OrderFormFields, OrderFormSchemaType, orderFormSchema} from './schema';
import {useCreateOrder} from './useCreateOrder';
import {useEditOrder} from './useEditOrder';
import {BillToProps} from '../../../../types/Billing';

const OrderForm: FunctionComponent<{
  defaultValues?: OrderFormSchemaType;
  onSubmit: (props: BillFormSubmitProps<OrderFormSchemaType>) => void;
  isLoading: boolean;
  formType: FormType;
  disabledFields?: (keyof OrderFormSchemaType)[];
  disableImportFrom?: boolean;
}> = ({
  defaultValues,
  onSubmit,
  isLoading,
  formType,
  disabledFields,
  disableImportFrom,
}) => {
  return (
    <BillFormScreen
      formType={formType}
      isLoading={isLoading}
      validationShema={orderFormSchema}
      defaultValues={defaultValues}
      disabledFields={disabledFields}
      billType={'order'}
      inputFields={{
        billInfo: billInfoInputFields,
        otherInfo: otherInfoField,
      }}
      disableImportFrom={disableImportFrom}
      onSubmit={onSubmit}
    />
  );
};

const CreatePurchaseOrder: FunctionComponent<
  GeneralScreenProps<'CREATE_PURCHASE_ORDER'>
> = ({route}) => {
  const {isLoading, submit, defaultValues} = useCreateOrder({
    ...route.params,
  });

  return (
    <OrderForm
      formType="create"
      defaultValues={defaultValues}
      isLoading={isLoading}
      disabledFields={
        route.params?.billTo
          ? (Object.keys(route.params.billTo) as (keyof BillToProps)[])
          : undefined
      }
      disableImportFrom={!!route.params?.billTo}
      onSubmit={submit}
    />
  );
};
const EditPurchaseOrder: FunctionComponent<
  GeneralScreenProps<'EDIT_PURCHASE_ORDER'>
> = ({route}) => {
  const {isLoading, submit, defaultValues} = useEditOrder({
    order: route.params?.order,
  });

  return (
    <OrderForm
      formType="edit"
      defaultValues={defaultValues}
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
};

export {CreatePurchaseOrder, EditPurchaseOrder};

const billInfoInputFields: AllInputFields<OrderFormFields> = [
  {
    name: 'orderDate',
    label: 'Order date',
    placeholder: 'Select date',
    style: {width: '47%'},
    type: 'date',
  },
  {
    name: 'expiryDate',
    label: 'Expiry date',
    placeholder: 'Select date',
    style: {width: '47%'},
    type: 'date',
  },
  {
    name: 'currency',
    label: 'Currency',
    placeholder: 'Nigerian Naira - N',
    type: 'custom_select',
    dataType: 'currencies',
    search: true,
  },
  {
    name: 'billLabel',
    label: 'Purchase Order Label',
    placeholder: 'Title of invoice',
    type: 'text',
  },
];

const otherInfoField: AllInputFields<OrderFormFields> = [
  {
    name: 'discount',
    label: 'Discount',
    placeholder: 'Enter discount (%)',
    type: 'text',
    style: {width: '47%'},
  },
  {
    name: 'tax',
    label: 'Tax',
    placeholder: 'Enter tax (%)',
    type: 'text',
    style: {width: '47%'},
  },
  {
    name: 'billNote',
    label: 'Order Note',
    placeholder:
      'It was a pleasure doing business with you, thanks for your patronage',
    type: 'text_area',
  },
  {
    name: 'termsAndConditions',
    label: 'Terms and condition',
    placeholder:
      'It was a pleasure doing business with you, thanks for your patronage',
    type: 'text_area',
  },
];
