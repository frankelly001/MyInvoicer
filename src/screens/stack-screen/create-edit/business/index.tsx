/* eslint-disable react/no-unstable-nested-components */
import {zodResolver} from '@hookform/resolvers/zod';
import React, {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';
import {
  AppCustomSelectInput,
  AppHeader,
  AppImageInput,
  AppLoading,
  AppScreen,
  AppTextInput,
} from '../../../../components';
import {FormFieldController} from '../../../../components/form-field-controller';
import {useColors} from '../../../../hooks/useColors';
import {RootScreenProps} from '../../../../navigation/main-navigation/types';
import {AllInputFields} from '../../../../types/Fields';
import {FormType, SubmitProps} from '../common/type';
import {BusinessInfoRegSchemaType, businessInfoRegSchema} from './schema';
import {accountSettingsStyles} from './styles';
import {useAddBusiness} from './useAddBusiness';
import {useEditBusiness} from './useEditBusiness';

const BusinessForm: FunctionComponent<{
  defaultValues: BusinessInfoRegSchemaType;
  onSubmit: (props: SubmitProps<BusinessInfoRegSchemaType>) => void;
  isLoading?: boolean;
  formType: FormType;
  disabledFields?: (keyof BusinessInfoRegSchemaType)[];
}> = ({defaultValues, formType, onSubmit, isLoading, disabledFields}) => {
  const colors = useColors();
  const styles = accountSettingsStyles({colors});

  const {handleSubmit, control, reset} = useForm<BusinessInfoRegSchemaType>({
    defaultValues,
    resolver: zodResolver(businessInfoRegSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  return (
    <AppScreen
      ScreenHeader={
        <AppHeader
          leftTitle="Cancel"
          middleTitle={`${formType} business`}
          rightTitle="Save"
          onPressRight={handleSubmit(values => onSubmit({values, reset}))}
        />
      }
      contentContainerStyle={styles.contentContainer}>
      <AppLoading visible={isLoading} />

      {addBusinessInputField.map(item => (
        <FormFieldController
          key={item.name}
          name={item.name}
          control={control}
          Field={({value, onChange}) => (
            <>
              {item.type === 'image' ? (
                <AppImageInput
                  label={item.label}
                  placeholder={item.placeholder}
                  value={value?.path}
                  onChange={image =>
                    onChange({
                      path: image?.path,
                      mime: image?.mime,
                      name: image?.filename,
                    })
                  }
                />
              ) : item.type === 'custom_select' ? (
                <AppCustomSelectInput
                  placeholder={item.placeholder}
                  label={item.label}
                  search
                  dropdownPosition="top"
                  value={value}
                  onChange={selectedItem => onChange(selectedItem.value)}
                  dataType={item.dataType}
                />
              ) : item.type === 'text' ? (
                <AppTextInput
                  label={item.label}
                  placeholder={item.placeholder}
                  value={value}
                  disabled={disabledFields?.includes(item.name)}
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
const AddBusiness: FunctionComponent<RootScreenProps<'ADD_BUSINESS'>> = () => {
  const {defaultValues, isLoading, submit} = useAddBusiness();

  return (
    <BusinessForm
      defaultValues={defaultValues}
      formType="add"
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
};
const EditBusiness: FunctionComponent<RootScreenProps<'EDIT_BUSINESS'>> = ({
  route,
}) => {
  const {defaultValues, isLoading, submit} = useEditBusiness({
    business: route.params.business,
  });

  return (
    <BusinessForm
      defaultValues={defaultValues}
      formType="edit"
      isLoading={isLoading}
      onSubmit={submit}
      disabledFields={['businessName']}
    />
  );
};

export {AddBusiness, EditBusiness};

const addBusinessInputField: AllInputFields<BusinessInfoRegSchemaType> = [
  {
    name: 'logoUrl',
    label: 'Upload your logo',
    placeholder: '(up to 12 Mb)',
    type: 'image',
  },
  {
    name: 'businessName',
    label: 'Business Name',
    placeholder: 'Enter Business Name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'alex.della@outlook.com',
    type: 'text',
    keyBoardType: 'email-address',
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: '+234824643898',
    type: 'text',
    keyBoardType: 'phone-pad',
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Address',
    type: 'text',
  },
  {
    name: 'website',
    label: 'Website',
    placeholder: 'www.workroom.tech',
    type: 'text',
  },
  {
    name: 'currency',
    label: 'Currecy',
    placeholder: 'Nigerian Naira - N',
    type: 'custom_select',
    dataType: 'currencies',
    search: true,
  },

  {
    name: 'bankActNum',
    label: 'Account Number',
    placeholder: 'Enter Account Number',
    type: 'text',
    keyBoardType: 'numeric',
  },
  {
    name: 'bankActName',
    label: 'Account Name',
    placeholder: 'Enter Account Name',
    type: 'text',
  },
  {name: 'bankName', label: 'Bank', placeholder: 'Enter Bank', type: 'text'},
];
