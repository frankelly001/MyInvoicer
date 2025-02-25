import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {showToast} from '../../../../components/app-toast';
import {useCreateBusinessApiMutation} from '../../../../state/services/business/api';
import {useUploadFileApiMutation} from '../../../../state/services/upload-file/api';
import {getErrorMessage} from '../../../../utils/helpers';
import {BusinessInfoRegSchemaType} from './schema';
import {SubmitProps} from '../common/type';
import {generateRandomFullName} from '../../../../utils/helpers/generateRandomFullName';

export const useAddBusiness = () => {
  const defaultValues = {
    address: 'ojo alaba, Lagos',
    bankActName: 'Cafeone',
    bankActNum: '2119742110',
    bankName: 'UBA',
    businessName: generateRandomFullName(),
    currency: '$',
    email: 'cafeone@gmail.com',
    phone: '081789927772',
  } as BusinessInfoRegSchemaType;
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [createBusiness] = useCreateBusinessApiMutation();
  const [uploadLogo] = useUploadFileApiMutation();

  const submit = async ({
    values,
    reset,
  }: SubmitProps<BusinessInfoRegSchemaType>) => {
    setIsLoading(true);
    try {
      const fileResonse = await uploadLogo({
        uploadFile: values.logoUrl,
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Business logo upload success',
        message: fileResonse.message,
      });

      if (fileResonse?.data?.fileUrl) {
        const response = await createBusiness({
          createBusiness: {
            address: values.address,
            businessName: values.businessName,
            logoUrl: fileResonse?.data?.fileUrl,
            phone: values.phone,
            website: values.website,
            accName: values.bankActName,
            accNumber: values.bankActNum,
            bankName: values.bankName,
            currency: values.currency,
          },
        }).unwrap();
        reset();
        showToast('SUCCESS', {
          title: 'Create business success',
          message: response?.message,
        });
        navigation.goBack();
      }
    } catch (error) {
      showToast('ERROR', {
        title: 'Error Encontered!',
        message: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {submit, isLoading, defaultValues};
};
