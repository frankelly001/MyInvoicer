import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {RootStackNavigationProps} from '../../../../navigation/main-navigation/types';
import {routesNames} from '../../../../navigation/routes';
import {useCreateEstimateApiMutation} from '../../../../state/services/estimate/api';
import {BillToProps} from '../../../../types/Billing';
import {formatAmount, getErrorMessage} from '../../../../utils/helpers';
import {generateRandomFullName} from '../../../../utils/helpers/generateRandomFullName';
import {BillFormSubmitProps} from '../common/type';
import {EstimateFormSchemaType} from './schema';
import {Estimate} from '../../../../types/Estimates';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';

export const useCreateEstimate = ({
  billTo,
  duplicate: estimate,
}: {
  billTo?: BillToProps;
  duplicate?: Estimate;
}) => {
  const defaultValues = {
    fullname: billTo?.fullname ?? generateRandomFullName(),
    address: billTo?.address ?? 'Alandinma',
    email: billTo?.email ?? `sasha${Math.ceil(Math.random() * 500)}@gmail.com`,
    phone: billTo?.phone ?? `081${Math.ceil(Math.random() * 65770)}7344`,
    termsAndConditions: 'its good',
    discount: `${Math.ceil(Math.random() * 10)}`,
    tax: `${Math.ceil(Math.random() * 10)}`,
    billLabel: `sasha${Math.ceil(Math.random() * 500)}`,
    estimateDate: new Date(),
    expiryDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
    billNote: 'i love thid app',
    currency: 'Australian dollar ($)',
    billFrom: '659d1d5355e1e00018998ca1',
    items: [
      {
        description: 'Dbdbbdbd',
        price: '200',
        productName: 'powerr',
        quantity: '1',
        total: '200',
        unit: 'Kg',
      },
      {
        description: 'Nfnnfnnfnfff',
        price: '300',
        productName: 'emeka',
        quantity: '1',
        total: '300',
        unit: 'Mg',
      },
    ],
  } as EstimateFormSchemaType;

  console.log(estimate);

  const duplicateDefaultValues = {
    fullname: estimate?.customerData?.name,
    email: estimate?.customerData?.email,
    address: estimate?.customerData.address as string,
    phone: estimate?.customerData?.phone,
    estimateDate: new Date(estimate?.estimateDate ?? 0),
    currency: estimate?.currency,
    billFrom: estimate?.businessData.id,
    discount: estimate?.discount as string,
    billNote: estimate?.estimateNote as string,
    expiryDate: new Date(estimate?.expiryDate ?? 0),
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

  const navigation =
    useNavigation<RootStackNavigationProps<'CREATE_ESTIMATE'>>();

  const [createEstimate, {isLoading}] = useCreateEstimateApiMutation();

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
      const response = await createEstimate({
        createEstimate: {
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
          // paymentMode: values.paymentMode,
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
    defaultValues: estimate ? duplicateDefaultValues : defaultValues,
    isLoading,
    submit,
  };
};
