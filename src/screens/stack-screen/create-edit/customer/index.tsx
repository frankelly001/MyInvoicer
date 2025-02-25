/* eslint-disable react/no-unstable-nested-components */
import {zodResolver} from '@hookform/resolvers/zod';
import React, {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';
import {
  AppCustomSelectInput,
  AppHeader,
  AppLoading,
  AppScreen,
  AppTextInput,
} from '../../../../components';
import {FormFieldController} from '../../../../components/form-field-controller';
import {GeneralScreenProps} from '../../../../navigation/types';
import {AllInputFields} from '../../../../types/Fields';
import {FormType, SubmitProps} from '../common/type';
import {CreateCustomerSchemaType, createCustomerSchema} from './schema';
import {customerDetailsStyles} from './styles';
import {useCreateCustomer} from './useCreateCustomer';
import {useEditCustomer} from './useEditCustomer';

const CustomerForm: FunctionComponent<{
  defaultValues: CreateCustomerSchemaType;
  onSubmit: (props: SubmitProps<CreateCustomerSchemaType>) => void;
  isLoading?: boolean;
  formType: FormType;
}> = ({defaultValues, onSubmit, isLoading, formType}) => {
  const styles = customerDetailsStyles;

  const {handleSubmit, control, reset} = useForm<CreateCustomerSchemaType>({
    defaultValues,
    resolver: zodResolver(createCustomerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  return (
    <AppScreen
      ScreenHeader={
        <AppHeader
          leftTitle="Cancel"
          middleTitle={`${formType} Customer`}
          rightTitle="Save"
          onPressRight={handleSubmit(values => onSubmit({values, reset}))}
        />
      }
      contentContainerStyle={styles.inputFields}>
      <AppLoading visible={isLoading} />
      {customerFields.map(item => (
        <FormFieldController
          key={item.name}
          name={item.name}
          control={control}
          Field={({value, onChange}) => (
            <>
              {item.type === 'custom_select' ? (
                <AppCustomSelectInput
                  placeholder={item.placeholder}
                  label={item.label}
                  search
                  value={value}
                  onChange={selectedItem => onChange(selectedItem.value)}
                  dataType={item.dataType}
                />
              ) : item.type === 'text' ? (
                <AppTextInput
                  label={item.label}
                  placeholder={item.placeholder}
                  value={value}
                  onChangeText={onChange}
                  keyboardType={item.keyBoardType}
                />
              ) : item.type === 'text_area' ? (
                <AppTextInput
                  label={item.label}
                  placeholder={item.placeholder}
                  value={value}
                  onChangeText={onChange}
                  keyboardType={item.keyBoardType}
                />
              ) : null}
            </>
          )}
        />
      ))}
    </AppScreen>
  );
};
const CreateCustomer: FunctionComponent<
  GeneralScreenProps<'CREATE_CUSTOMER'>
> = () => {
  const {defaultValues, isLoading, submit} = useCreateCustomer();

  return (
    <CustomerForm
      defaultValues={defaultValues}
      formType="create"
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
};
const EditCustomer: FunctionComponent<GeneralScreenProps<'EDIT_CUSTOMER'>> = ({
  route,
}) => {
  const {defaultValues, isLoading, submit} = useEditCustomer({
    customer: route.params?.customer,
  });

  return (
    <CustomerForm
      defaultValues={defaultValues}
      formType="edit"
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
};

export {CreateCustomer, EditCustomer};

const customerFields: AllInputFields<CreateCustomerSchemaType> = [
  {
    name: 'fullName',
    label: 'Full name',
    placeholder: 'Alex Della',
    type: 'text',
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone',
    placeholder: 'Enter phone',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'text',
    placeholder: 'alex.della@outlook.com',
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Address',
    type: 'text_area',
  },

  {
    name: 'businessName',
    label: 'Business',
    placeholder: 'Enter busimess name',
    type: 'text',
  },
  {
    name: 'website',
    label: 'Website',
    placeholder: 'Enter website',
    type: 'text',
  },
  {
    name: 'country',
    label: 'Country',
    placeholder: 'Nigeria',
    type: 'custom_select',
    dataType: 'countries',
  },
  {
    name: 'taxRate',
    label: 'Tax Rate',
    placeholder: 'Enter tax rate %',
    type: 'text',
  },
];
