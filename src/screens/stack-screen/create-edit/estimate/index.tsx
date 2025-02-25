import React, {FunctionComponent} from 'react';
import {GeneralScreenProps} from '../../../../navigation/types';
import {AllInputFields} from '../../../../types/Fields';
import BillFormScreen from '../common/bill-form-screen';
import {DefaultValuesType, FormType, BillFormSubmitProps} from '../common/type';
import {
  EstimateFormFields,
  EstimateFormSchemaType,
  estimateFormSchema,
} from './schema';
import {useCreateEstimate} from './useCreateEstimate';
import {useEditEstimate} from './useEditEstimate';
import {BillToProps} from '../../../../types/Billing';

const EstimateForm: FunctionComponent<{
  defaultValues?: DefaultValuesType<EstimateFormSchemaType>;
  onSubmit: (props: BillFormSubmitProps<EstimateFormSchemaType>) => void;
  isLoading: boolean;
  formType: FormType;
  disabledFields?: (keyof EstimateFormSchemaType)[];
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
      disabledFields={disabledFields}
      validationShema={estimateFormSchema}
      billType={'estimate'}
      inputFields={{
        billInfo: billInfoInputFields,
        otherInfo: otherInfoField,
      }}
      disableImportFrom={disableImportFrom}
      onSubmit={onSubmit}
    />
  );
};

const CreateEstimate: FunctionComponent<
  GeneralScreenProps<'CREATE_ESTIMATE'>
> = ({route}) => {
  const {isLoading, submit, defaultValues} = useCreateEstimate({
    ...route.params,
  });

  return (
    <EstimateForm
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
const EditEstimate: FunctionComponent<GeneralScreenProps<'EDIT_ESTIMATE'>> = ({
  route,
}) => {
  const {isLoading, submit, defaultValues} = useEditEstimate({
    estimate: route.params?.estimate,
  });

  return (
    <EstimateForm
      formType="edit"
      defaultValues={defaultValues}
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
};

export {CreateEstimate, EditEstimate};

const billInfoInputFields: AllInputFields<EstimateFormFields> = [
  {
    name: 'estimateDate',
    label: 'Estimate date',
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
    label: 'Estimate label',
    placeholder: 'Title of invoice',
    type: 'text',
  },
];

const otherInfoField: AllInputFields<EstimateFormFields> = [
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
    label: 'Estimate Note',
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
