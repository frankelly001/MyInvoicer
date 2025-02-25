/* eslint-disable react/no-unstable-nested-components */
import {zodResolver} from '@hookform/resolvers/zod';
import React, {FunctionComponent, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {
  AppButton,
  AppImageInput,
  AppLoading,
  AppScreen,
  AppText,
  AppTextInput,
} from '../../../../components';
import {showToast} from '../../../../components/app-toast';
import {FormFieldController} from '../../../../components/form-field-controller';
import {AuthScreenProps} from '../../../../navigation/auth-stack/type';
import {useCreateBusinessApiMutation} from '../../../../state/services/business/api';
import {useUploadFileApiMutation} from '../../../../state/services/upload-file/api';
import {userAccountApi} from '../../../../state/services/user-account/api';
import {AllInputFields} from '../../../../types/Fields';
import {generateRandomFullName} from '../../../../utils/helpers/generateRandomFullName';
import {getErrorMessage} from '../../../../utils/helpers/getErrorMessage';
import {BusinessInfoRegSchemaType, businessInfoRegSchema} from './schema';
import {businessInfoStyles} from './styles';
import {useAppDispatch} from '../../../../state/slices/store';

const inputFields: AllInputFields<BusinessInfoRegSchemaType> = [
  {
    name: 'logoUrl',
    label: 'Upload your business logo',
    placeholder: '(up to 12 Mb)',
    type: 'image',
  },
  {
    name: 'businessName',
    label: 'Business Name',
    placeholder: 'Google Inc',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: 'Add Phone',
    keyBoardType: 'number-pad',
    type: 'text',
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Address',
    type: 'text',
  },
  {
    name: 'website',
    label: 'Website (If any)',
    placeholder: 'www.workroom.tech',
    keyBoardType: 'url',
    type: 'text',
  },
];

const BusinessInfo: FunctionComponent<
  AuthScreenProps<'BUSINESS_INFO_REG'>
> = () => {
  const styles = businessInfoStyles;

  const dispatch = useAppDispatch();

  const {handleSubmit, control} = useForm<BusinessInfoRegSchemaType>({
    defaultValues: {
      address: 'Ojo, Lagos state',
      businessName: generateRandomFullName(),
      logoUrl: undefined,
      phone: '0918282872776',
    },
    resolver: zodResolver(businessInfoRegSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [createBusiness] = useCreateBusinessApiMutation();

  const [uploadLogo] = useUploadFileApiMutation();

  const refreshUserDetails = async () => {
    const {refetch} = dispatch(
      userAccountApi.endpoints.getUserDetailsApi.initiate(),
    );
    await refetch();
  };
  const submit = async (values: BusinessInfoRegSchemaType) => {
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
            logoUrl: fileResonse?.data.fileUrl,
            phone: values.phone,
            ...(values.website && {website: values.website}),
          },
        }).unwrap();

        showToast('SUCCESS', {
          title: 'Create business success',
          message: response?.message,
        });
        await refreshUserDetails();
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

  return (
    <AppScreen isScrollable={false}>
      <AppLoading visible={isLoading} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <AppText text={'My business'} type="heading_h1" style={styles.mb16} />
          <AppText
            text={'Enter your business information'}
            type="body_s"
            color="neutral_dark_2"
            style={styles.info}
          />
          <View style={styles.fieldContainer}>
            {inputFields.map(item => (
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
                    ) : item.type === 'text' ? (
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
          </View>
        </ScrollView>

        <AppButton text="Done" onPress={handleSubmit(submit)} />
      </View>
    </AppScreen>
  );
};

export default BusinessInfo;
