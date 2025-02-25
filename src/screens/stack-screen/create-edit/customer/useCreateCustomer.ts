import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {useCreateCustomerApiMutation} from '../../../../state/services/customer/api';
import {getErrorMessage, logThis} from '../../../../utils/helpers';
import {generateRandomFullName} from '../../../../utils/helpers/generateRandomFullName';
import {SubmitProps} from '../common/type';
import {CreateCustomerSchemaType} from './schema';

export const useCreateCustomer = () => {
  const defaultValues = {
    fullName: generateRandomFullName(),
    address: 'ojo alaba, Lagos',
    businessName: 'Cafeone',
    country: 'Nigeria',
    email: `${generateRandomFullName().replaceAll(' ', '')}@gmail.com`,
    phone: '081789927772',
    taxRate: '5',
  };
  const navigation = useNavigation();

  const [createCustomer, {isLoading}] = useCreateCustomerApiMutation();

  const submit = async ({
    values,
    reset,
  }: SubmitProps<CreateCustomerSchemaType>) => {
    try {
      const response = await createCustomer({
        createCustomer: {
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
