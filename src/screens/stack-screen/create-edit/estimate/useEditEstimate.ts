import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {RootStackNavigationProps} from '../../../../navigation/main-navigation/types';
import {useUpdateEstimateApiMutation} from '../../../../state/services/estimate/api';
import {Estimate} from '../../../../types/Estimates';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';
import {formatAmount, getErrorMessage} from '../../../../utils/helpers';
import {BillFormSubmitProps} from '../common/type';
import {EstimateFormSchemaType} from './schema';
import {routesNames} from '../../../../navigation/routes';

export const useEditEstimate = ({estimate}: {estimate: Estimate}) => {
  const defaultValues = {
    fullname: estimate?.customerData?.name,
    email: estimate?.customerData?.email,
    address: estimate?.customerData.address as string,
    phone: estimate?.customerData?.phone,
    estimateDate: new Date(estimate?.estimateDate),
    currency: estimate?.currency,
    billFrom: estimate?.businessData.id,
    discount: estimate?.discount as string,
    billNote: estimate?.estimateNote as string,
    expiryDate: new Date(estimate?.expiryDate),
    billLabel: estimate?.estimateSubject as string,
    tax: estimate?.tax as string,
    termsAndConditions: estimate?.estimateTerms as string,
    items: estimate?.products.map(el => ({
      description: el?.description ?? EMPTY_STRING,
      productName: el?.productName ?? EMPTY_STRING,
      price: el?.price ?? EMPTY_STRING,
      quantity: (el?.quantity ?? 0).toString(),
      total: el?.total ?? EMPTY_STRING,
      unit: el?.unit ?? EMPTY_STRING,
    })),
  } as EstimateFormSchemaType;
  const navigation = useNavigation<RootStackNavigationProps<'EDIT_ESTIMATE'>>();
  const [updateEstimate, {isLoading}] = useUpdateEstimateApiMutation();

  const submit = async ({
    values,
    reset,
  }: BillFormSubmitProps<EstimateFormSchemaType>) => {
    const total = values.items.reduce(
      (sum, item) => Number(item?.total ?? 0) + sum,
      0,
    );
    const taxAmount = total * (Number(values.tax || 0) / 100);
    const discount = total * (Number(values.discount || 0) / 100);
    const grandTotal = total - discount + taxAmount;

    try {
      const response = await updateEstimate({
        updateEstimate: {
          estimateId: estimate.id,
          currency: values.currency,
          discount: values.discount,
          estimateDate: values.estimateDate.toString(),
          estimateFrom: values.billFrom,
          estimateNote: values.billNote,
          tax: values.tax,
          estimateTo: {
            address: values.address,
            email: values.email,
            phone: values.phone,
            name: values.fullname,
          },
          estimateTerms: values.termsAndConditions,
          estimateSubject: values.billLabel,
          expiryDate: values.expiryDate.toString(),
          estimateStatus: 'draft',
          products: values.items.map(prod => ({
            description: prod.description,
            price: prod.price,
            quantity: Number(prod.quantity),
            productName: prod.productName,
            total: prod.total,
            unit: prod.unit,
          })),
          useDefaultEstimateNote: !values.billNote,
          useDefaultEstimateTerms: !values.termsAndConditions,
          subTotal: `${formatAmount(total)}`,
          taxAmount: `${formatAmount(taxAmount)}`,
          grandTotal: `${formatAmount(grandTotal)}`,
        },
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Estimate Created successfully',
        message: response.message,
      });
      reset();
      navigation.replace(routesNames.PREVIEW_ESTIMATE, {
        estimateId: response.data.id,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  return {
    submit,
    isLoading,
    defaultValues,
  };
};
