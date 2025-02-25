import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {useCreateReceiptApiMutation} from '../../../../state/services/receipt/api';
import {formatAmount, getErrorMessage} from '../../../../utils/helpers';
import {generateRandomFullName} from '../../../../utils/helpers/generateRandomFullName';
import {BillFormSubmitProps} from '../common/type';
import {ReceiptFormSchemaType} from './schema';
import {ReceiptStatusTypes} from '../../../../utils/constants/status';
import {BillToProps} from '../../../../types/Billing';
import {RootStackNavigationProps} from '../../../../navigation/main-navigation/types';
import {routesNames} from '../../../../navigation/routes';
import {Receipt} from '../../../../types/Receipts';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';

export const useCreateReceipt = ({
  billTo,
  duplicate: receipt,
}: {
  billTo?: BillToProps;
  duplicate?: Receipt;
}) => {
  const defaultValues = {
    fullname: billTo?.fullname ?? generateRandomFullName(),
    address: billTo?.address ?? 'Alandinma',
    email: billTo?.email ?? `sasha${Math.ceil(Math.random() * 500)}@gmail.com`,
    phone: billTo?.phone ?? `081${Math.ceil(Math.random() * 65770)}7344`,
    discount: `${Math.ceil(Math.random() * 10)}`,
    tax: `${Math.ceil(Math.random() * 10)}`,
    billLabel: `sasha${Math.ceil(Math.random() * 500)}`,
    receiptDate: new Date(),
    billNote: 'i love thid app',
    currency: 'Australian dollar ($)',
    billFrom: '659d1d5355e1e00018998ca1',
    paymentMode: ['transfer', 'online', 'card', 'cash'][
      Math.floor(Math.random() * 4)
    ],
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
  } as ReceiptFormSchemaType;

  const duplicateDefaultValues = {
    fullname: receipt?.customerData?.name,
    email: receipt?.customerData?.email,
    address: receipt?.customerData?.address as string,
    phone: receipt?.customerData?.phone,
    receiptDate: new Date(receipt?.receiptDate ?? 0),
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
    useNavigation<RootStackNavigationProps<'CREATE_SALES_RECEIPT'>>();
  const [createReceipt, {isLoading}] = useCreateReceiptApiMutation();

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
      const response = await createReceipt({
        createReceipt: {
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
    defaultValues: receipt ? duplicateDefaultValues : defaultValues,
    isLoading,
    submit,
  };
};
