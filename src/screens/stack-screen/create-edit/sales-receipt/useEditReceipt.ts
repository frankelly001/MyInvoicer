import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {useUpdateReceiptApiMutation} from '../../../../state/services/receipt/api';
import {Receipt} from '../../../../types/Receipts';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';
import {formatAmount, getErrorMessage} from '../../../../utils/helpers';
import {BillFormSubmitProps} from '../common/type';
import {ReceiptFormSchemaType} from './schema';
import {ReceiptStatusTypes} from '../../../../utils/constants/status';
import {RootStackNavigationProps} from '../../../../navigation/main-navigation/types';
import {routesNames} from '../../../../navigation/routes';

export const useEditReceipt = ({receipt}: {receipt: Receipt}) => {
  const defaultValues = {
    fullname: receipt?.customerData?.name,
    email: receipt?.customerData?.email,
    address: receipt?.customerData?.address as string,
    phone: receipt?.customerData?.phone,
    receiptDate: new Date(receipt?.receiptDate),
    paymentMode: receipt?.paymentMode,
    currency: receipt?.currency,
    billFrom: receipt?.businessData.id,
    discount: receipt?.discount as string,
    billNote: receipt?.receiptNote as string,
    billLabel: receipt?.receiptSubject as string,
    tax: receipt?.tax as string,
    items: receipt?.products.map(el => ({
      description: el?.description ?? EMPTY_STRING,
      productName: el?.productName ?? EMPTY_STRING,
      price: el?.price ?? EMPTY_STRING,
      quantity: (el?.quantity ?? 0).toString(),
      total: el?.total ?? EMPTY_STRING,
      unit: el?.unit ?? EMPTY_STRING,
    })),
  } as ReceiptFormSchemaType;
  const navigation =
    useNavigation<RootStackNavigationProps<'EDIT_SALES_RECEIPT'>>();
  const [updateOrder, {isLoading}] = useUpdateReceiptApiMutation();
  const submit = async ({
    values,
    reset,
  }: BillFormSubmitProps<ReceiptFormSchemaType>) => {
    const total = values.items.reduce(
      (sum, item) => Number(item?.total ?? 0) + sum,
      0,
    );
    const taxAmount = total * (Number(values.tax || 0) / 100);
    const discount = total * (Number(values.discount || 0) / 100);
    const grandTotal = total - discount + taxAmount;

    try {
      const response = await updateOrder({
        updateReceipt: {
          receiptId: receipt.id,
          currency: values.currency,
          discount: values.discount,
          receiptDate: values.receiptDate.toString(),
          receiptFrom: values.billFrom,
          receiptNote: values.billNote,
          paymentMode: values.paymentMode as ReceiptStatusTypes,
          tax: values.tax,
          receiptTo: {
            address: values.address,
            email: values.email,
            phone: values.phone,
            name: values.fullname,
          },

          receiptSubject: values.billLabel,
          products: values.items.map(prod => ({
            description: prod.description,
            price: prod.price,
            quantity: Number(prod.quantity),
            productName: prod.productName,
            total: prod.total,
            unit: prod.unit,
          })),
          useDefaultReceiptNote: !values.billNote,
          subTotal: `${formatAmount(total)}`,
          taxAmount: `${formatAmount(taxAmount)}`,
          grandTotal: `${formatAmount(grandTotal)}`,
        },
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Receipt Created successfully',
        message: response.message,
      });
      reset();
      navigation.replace(routesNames.PREVIEW_SALES_RECEIPT, {
        receiptId: response.data.id,
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
