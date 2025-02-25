import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {useUpdateCustomerApiMutation} from '../../../../state/services/customer/api';
import {Customer} from '../../../../types/Customers';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';
import {getErrorMessage, logThis} from '../../../../utils/helpers';
import {SubmitProps} from '../common/type';
import {CreateCustomerSchemaType} from './schema';

export const useEditCustomer = ({customer}: {customer: Customer}) => {
  const defaultValues = {
    fullName: customer.name ?? EMPTY_STRING,
    address: customer.address ?? EMPTY_STRING,
    businessName: customer.businessName ?? EMPTY_STRING,
    country: customer.country ?? EMPTY_STRING,
    email: customer.email ?? EMPTY_STRING,
    phone: customer.phone ?? EMPTY_STRING,
    taxRate: customer.taxRate ?? EMPTY_STRING,
  };
  const navigation = useNavigation();

  const [updateCustomer, {isLoading}] = useUpdateCustomerApiMutation();

  const submit = async ({
    values,
    reset,
  }: SubmitProps<CreateCustomerSchemaType>) => {
    try {
      const response = await updateCustomer({
        updateCustomer: {
          customerId: customer.id,
          address: values.address,
          businessName: values.businessName,
          phone: values.phone,
          ...(values.website && {website: values.website}),
          email: values.email,
          name: values.fullName,
          country: values.country,
          ...(values.taxRate && {taxRate: values.taxRate}),
        },
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Create Customer success',
        message: response?.message,
      });
      reset();
      navigation.goBack();
    } catch (error) {
      logThis('error...', error);
      showToast('ERROR', {
        title: 'Error Encontered!',
        message: getErrorMessage(error),
      });
    }
  };

  return {submit, isLoading, defaultValues};
};
