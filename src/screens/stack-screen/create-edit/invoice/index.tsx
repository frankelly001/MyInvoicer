import React, {FunctionComponent} from 'react';
import {GeneralScreenProps} from '../../../../navigation/types';
import {BillToProps} from '../../../../types/Billing';
import {AllInputFields} from '../../../../types/Fields';
import BillFormScreen from '../common/bill-form-screen';
import {BillFormSubmitProps, FormType} from '../common/type';
import {
  InvoiceFormFields,
  InvoiceFormSchemaType,
  invoiceFormSchema,
} from './schema';
import {useCreateInvoice} from './useCreateInvoice';
import {useEditInvoice} from './useEditInvoice';

const InvoiceForm: FunctionComponent<{
  defaultValues?: InvoiceFormSchemaType;
  onSubmit: (props: BillFormSubmitProps<InvoiceFormSchemaType>) => void;
  isLoading: boolean;
  formType: FormType;
  disabledFields?: (keyof InvoiceFormSchemaType)[];
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
      defaultValues={defaultValues}
      validationShema={invoiceFormSchema}
      billType={'invoice'}
      inputFields={{
        billInfo: billInfoInputFields,
        otherInfo: otherInfoField,
      }}
      disableImportFrom={disableImportFrom}
      disabledFields={disabledFields}
      onSubmit={({values, reset}) => onSubmit({values, reset})}
    />
  );
};

const CreateInvoice: FunctionComponent<
  GeneralScreenProps<'CREATE_INVOICE'>
> = ({route}) => {
  const {isLoading, submit, defaultValues} = useCreateInvoice({
    ...route.params,
  });

  return (
    <InvoiceForm
      formType="create"
      defaultValues={defaultValues}
      disabledFields={
        route.params?.billTo && !route.params.timesheetId
          ? (Object.keys(route.params.billTo) as (keyof BillToProps)[])
          : undefined
      }
      disableImportFrom={!!route.params?.billTo && !route.params.timesheetId}
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
};
const EditInvoice: FunctionComponent<GeneralScreenProps<'EDIT_INVOICE'>> = ({
  route,
}) => {
  const {isLoading, submit, defaultValues} = useEditInvoice({
    invoice: route.params?.invoice,
  });

  return (
    <InvoiceForm
      formType="edit"
      defaultValues={defaultValues}
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
};

export {CreateInvoice, EditInvoice};

const billInfoInputFields: AllInputFields<InvoiceFormFields> = [
  {
    name: 'issueDate',
    label: 'Issue date',
    placeholder: 'Select date',
    style: {width: '47%'},
    type: 'date',
  },
  {
    name: 'dueDate',
    label: 'Due date',
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
    label: 'Invoice label',
    placeholder: 'Title of invoice',
    type: 'text',
  },
];

const otherInfoField: AllInputFields<InvoiceFormFields> = [
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
    name: 'amtDeposited',
    label: 'Amount Deposited (If any)',
    placeholder: 'Enter amount deposited',
    type: 'text',
    keyBoardType: 'numeric',
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
    label: 'Invoice Note',
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
