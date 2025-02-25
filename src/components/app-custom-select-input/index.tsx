import React, {FunctionComponent} from 'react';
import CustomSelectInput from './custom-select-input';
import {AppCustomSelectInputProps, CustomSelectInputProps} from './type';
import {useBusinessesData} from './useBusinessesData';
import {useCountriesData} from './useCountriesData';
import {useCurrenciesData} from './useCurrenciesData';
import {useCustomersData} from './useCustomersData';

const AppCustomSelectInput: FunctionComponent<AppCustomSelectInputProps> = ({
  dataType,
  ...otherSelectInputProps
}) => {
  switch (dataType) {
    case 'countries':
      return <CountrySelectInput {...otherSelectInputProps} />;
    case 'currencies':
      return <CurrencySelectInput {...otherSelectInputProps} />;
    case 'businesses':
      return <BusinessSelectInput {...otherSelectInputProps} />;
    case 'customers':
      return <CustomerSelectInput {...otherSelectInputProps} />;
    default:
      throw new Error(`Unsupported data type: ${dataType}`);
  }
};

export default AppCustomSelectInput;

const CountrySelectInput: FunctionComponent<CustomSelectInputProps> = ({
  ...otherProps
}) => {
  const dataProps = useCountriesData();
  return <CustomSelectInput {...dataProps} {...otherProps} />;
};
const CurrencySelectInput: FunctionComponent<CustomSelectInputProps> = ({
  ...otherProps
}) => {
  const dataProps = useCurrenciesData();
  return <CustomSelectInput {...dataProps} {...otherProps} />;
};
const BusinessSelectInput: FunctionComponent<CustomSelectInputProps> = ({
  ...otherProps
}) => {
  const dataProps = useBusinessesData();
  return <CustomSelectInput {...dataProps} {...otherProps} />;
};
const CustomerSelectInput: FunctionComponent<CustomSelectInputProps> = ({
  ...otherProps
}) => {
  const dataProps = useCustomersData();
  return <CustomSelectInput {...dataProps} {...otherProps} />;
};

export {
  CountrySelectInput,
  CurrencySelectInput,
  BusinessSelectInput,
  CustomerSelectInput,
};
