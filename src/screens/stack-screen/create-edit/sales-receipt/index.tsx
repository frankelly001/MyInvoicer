import React, {FunctionComponent} from 'react';
import {GeneralScreenProps} from '../../../../navigation/types';
import {AllInputFields} from '../../../../types/Fields';
import BillFormScreen from '../common/bill-form-screen';
import {FormType, BillFormSubmitProps} from '../common/type';
import {
  ReceiptFormFields,
  ReceiptFormSchemaType,
  receiptFormSchema,
} from './schema';
import {useCreateReceipt} from './useCreateReceipt';
import {useEditReceipt} from './useEditReceipt';
import {BillToProps} from '../../../../types/Billing';

const ReceiptForm: FunctionComponent<{
  defaultValues?: ReceiptFormSchemaType;
  onSubmit: (props: BillFormSubmitProps<ReceiptFormSchemaType>) => void;
  isLoading: boolean;
  formType: FormType;
  disabledFields?: (keyof ReceiptFormSchemaType)[];
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
      validationShema={receiptFormSchema}
      defaultValues={defaultValues}
      disabledFields={disabledFields}
      billType={'receipt'}
      inputFields={{
        billInfo: billInfoInputFields,
        otherInfo: otherInfoField,
      }}
      disableImportFrom={disableImportFrom}
      onSubmit={onSubmit}
    />
  );
};

const CreateSalesReceipt: FunctionComponent<
  GeneralScreenProps<'CREATE_SALES_RECEIPT'>
> = ({route}) => {
  const {isLoading, submit, defaultValues} = useCreateReceipt({
    ...route.params,
  });

  return (
    <ReceiptForm
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
const EditSalesReceipt: FunctionComponent<
  GeneralScreenProps<'EDIT_SALES_RECEIPT'>
> = ({route}) => {
  const {isLoading, submit, defaultValues} = useEditReceipt({
    receipt: route.params?.receipt,
  });

  return (
    <ReceiptForm
      formType="edit"
      defaultValues={defaultValues}
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
};

export {CreateSalesReceipt, EditSalesReceipt};

const billInfoInputFields: AllInputFields<ReceiptFormFields> = [
  {
    name: 'receiptDate',
    label: 'Receipt date',
    placeholder: 'Select date',
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

const otherInfoField: AllInputFields<ReceiptFormFields> = [
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
    name: 'paymentMode',
    label: 'Payment method',
    placeholder: 'Cash',
    type: 'select',
    data: [
      {label: 'Card', value: 'card'},
      {label: 'Cash', value: 'cash'},
      {label: 'Online payment', value: 'online'},
      {label: 'Transfer', value: 'transfer'},
    ],
  },
  {
    name: 'billNote',
    label: 'Order Note',
    placeholder:
      'It was a pleasure doing business with you, thanks for your patronage',
    type: 'text_area',
  },
];
