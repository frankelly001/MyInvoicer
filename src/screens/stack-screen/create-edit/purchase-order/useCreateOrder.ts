import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {RootStackNavigationProps} from '../../../../navigation/main-navigation/types';
import {routesNames} from '../../../../navigation/routes';
import {useCreateOrderApiMutation} from '../../../../state/services/order/api';
import {BillToProps} from '../../../../types/Billing';
import {formatAmount, getErrorMessage} from '../../../../utils/helpers';
import {generateRandomFullName} from '../../../../utils/helpers/generateRandomFullName';
import {BillFormSubmitProps} from '../common/type';
import {OrderFormSchemaType} from './schema';
import {Order} from '../../../../types/Orders';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';

export const useCreateOrder = ({
  billTo,
  duplicate: order,
}: {
  billTo?: BillToProps;
  duplicate?: Order;
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
    orderDate: new Date(),
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
  } as OrderFormSchemaType;

  const duplicateDefaultValues = {
    fullname: order?.customerData?.name,
    email: order?.customerData?.email,
    address: order?.customerData.address as string,
    phone: order?.customerData.phone,
    orderDate: new Date(order?.orderDate ?? 0),
    expiryDate: new Date(order?.orderExpiryDate ?? 0),
    currency: order?.currency,
    billFrom: order?.businessData.id,
    discount: order?.discount as string,
    billNote: order?.orderNote as string,
    billLabel: order?.orderSubject as string,
    tax: '' as string,
    termsAndConditions: order?.orderTerms as string,
    items: order?.products.map(el => ({
      description: el?.description ?? EMPTY_STRING,
      productName: el?.productName ?? EMPTY_STRING,
      price: el?.price ?? EMPTY_STRING,
      quantity: (el?.quantity ?? 0).toString(),
      total: el?.total ?? EMPTY_STRING,
      unit: el?.unit ?? EMPTY_STRING,
    })),
  } as OrderFormSchemaType;
  const navigation =
    useNavigation<RootStackNavigationProps<'CREATE_PURCHASE_ORDER'>>();

  const [createOrder, {isLoading}] = useCreateOrderApiMutation();

  const submit = async ({
    values,
    reset,
  }: BillFormSubmitProps<OrderFormSchemaType>) => {
    const total = values.items.reduce(
      (sum, item) => Number(item?.total ?? 0) + sum,
      0,
    );
    const taxAmount = total * (Number(values.tax || 0) / 100);
    const discount = total * (Number(values.discount || 0) / 100);
    const grandTotal = total - discount + taxAmount;

    try {
      const response = await createOrder({
        createOrder: {
          currency: values.currency,
          discount: values.discount,
          orderDate: values.orderDate.toString(),
          orderFrom: values.billFrom,
          orderNote: values.billNote,
          orderExpiryDate: values.expiryDate.toString(),
          // tax: values.tax,
          orderTo: {
            address: values.address,
            email: values.email,
            phone: values.phone,
            name: values.fullname,
          },
          orderTerms: values.termsAndConditions,
          orderSubject: values.billLabel,

          orderStatus: 'draft',
          // paymentMode: values.paymentMode,
          products: values.items.map(prod => ({
            description: prod.description,
            price: prod.price,
            quantity: Number(prod.quantity),
            productName: prod.productName,
            total: prod.total,
            unit: prod.unit,
          })),
          useDefaultOrderNote: !values.billNote,
          useDefaultOrderTerms: !values.termsAndConditions,
          subTotal: `${formatAmount(total)}`,
          grandTotal: `${formatAmount(grandTotal)}`,
        },
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Order Created successfully',
        message: response.message,
      });
      reset();
      navigation.replace(routesNames.PREVIEW_PURCHASE_ORDER, {
        orderId: response.data.id,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  return {
    defaultValues: order ? duplicateDefaultValues : defaultValues,
    isLoading,
    submit,
  };
};
