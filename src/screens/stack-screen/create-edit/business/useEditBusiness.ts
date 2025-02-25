import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {showToast} from '../../../../components/app-toast';
import {useUpdateBusinessApiMutation} from '../../../../state/services/business/api';
import {useUploadFileApiMutation} from '../../../../state/services/upload-file/api';
import {Business} from '../../../../types/Business';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';
import {getErrorMessage} from '../../../../utils/helpers';
import {SubmitProps} from '../common/type';
import {BusinessInfoRegSchemaType} from './schema';

export const useEditBusiness = ({business}: {business: Business}) => {
  const navigation = useNavigation();
  const defaultValues = {
    logoUrl:
      {path: business?.logoUrl, mime: 'image/jpeg', name: 'BusinessLogo'} ??
      EMPTY_STRING,
    address: business.address ?? EMPTY_STRING,
    bankActName: business.accName ?? EMPTY_STRING,
    bankActNum: business.accNumber ?? EMPTY_STRING,
    bankName: business.bankName ?? EMPTY_STRING,
    businessName: business.businessName ?? EMPTY_STRING,
    currency: business.currency ?? EMPTY_STRING,
    email: business.email ?? EMPTY_STRING,
    phone: business.phone ?? EMPTY_STRING,
  } as BusinessInfoRegSchemaType;

  const [isLoading, setIsLoading] = useState(false);

  const [updateBusiness] = useUpdateBusinessApiMutation();
  const [uploadLogo] = useUploadFileApiMutation();

  const submit = async ({
    values,
    reset,
  }: SubmitProps<BusinessInfoRegSchemaType>) => {
    setIsLoading(true);
    try {
      let fileResonse;
      const isNewImage = values.logoUrl.path !== defaultValues.logoUrl.path;

      if (isNewImage) {
        fileResonse = await uploadLogo({
          uploadFile: values.logoUrl,
        }).unwrap();

        showToast('SUCCESS', {
          title: 'Business logo upload success',
          message: fileResonse.message,
        });
      }

      const response = await updateBusiness({
        updateBusiness: {
          businessId: business.id,
          address: values.address,
          ...(isNewImage && {
            logoUrl: fileResonse?.data?.fileUrl,
          }),
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
