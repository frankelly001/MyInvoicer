import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {useUpdateOrderApiMutation} from '../../../../state/services/order/api';
import {Order} from '../../../../types/Orders';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';
import {formatAmount, getErrorMessage} from '../../../../utils/helpers';
import {BillFormSubmitProps} from '../common/type';
import {OrderFormSchemaType} from './schema';
import {routesNames} from '../../../../navigation/routes';
import {RootStackNavigationProps} from '../../../../navigation/main-navigation/types';

export const useEditOrder = ({order}: {order: Order}) => {
  const defaultValues: OrderFormSchemaType = {
    fullname: order?.customerData?.name,
    email: order?.customerData?.email,
    address: order?.customerData.address as string,
    phone: order?.customerData.phone,
    orderDate: new Date(order?.orderDate),
    expiryDate: new Date(order?.orderExpiryDate),
    currency: order?.currency,
    billFrom: order?.businessData.id,
    discount: order?.discount as string,
    billNote: order?.orderNote as string,
    billLabel: order?.orderSubject as string,
    tax: '' as string,
    termsAndConditions: order.orderTerms as string,

    items: order.products.map(el => ({
      description: el?.description ?? EMPTY_STRING,
      productName: el?.productName ?? EMPTY_STRING,
      price: el?.price ?? EMPTY_STRING,
      quantity: (el?.quantity ?? 0).toString(),
      total: el?.total ?? EMPTY_STRING,
      unit: el?.unit ?? EMPTY_STRING,
    })),
  };
  const navigation =
    useNavigation<RootStackNavigationProps<'EDIT_PURCHASE_ORDER'>>();
  const [updateOrder, {isLoading}] = useUpdateOrderApiMutation();
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
      const response = await updateOrder({
        updateOrder: {
          orderId: order.id,
          currency: values.currency,
          discount: values.discount,
          orderDate: values.orderDate.toString(),
          orderFrom: values.billFrom,
          orderNote: values.billNote,
          // tax: values.tax,
          orderTo: {
            address: values.address,
            email: values.email,
            phone: values.phone,
            name: values.fullname,
          },
          orderTerms: values.termsAndConditions,
          orderSubject: values.billLabel,
          orderExpiryDate: values.orderDate.toString(),
          orderStatus: 'draft',
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
    submit,
    isLoading,
    defaultValues,
  };
};
