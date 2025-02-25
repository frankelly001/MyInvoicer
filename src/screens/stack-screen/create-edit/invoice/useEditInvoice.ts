import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {useCompleteDraftedInvoiceApiMutation} from '../../../../state/services/invoice/api';
import {Invoice} from '../../../../types/Invoices';
import {formatAmount, getErrorMessage} from '../../../../utils/helpers';
import {BillFormSubmitProps} from '../common/type';
import {InvoiceFormSchemaType} from './schema';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';
import {routesNames} from '../../../../navigation/routes';
import {RootStackNavigationProps} from '../../../../navigation/main-navigation/types';

export const useEditInvoice = ({invoice}: {invoice: Invoice}) => {
  const defaultValues = {
    fullname: invoice?.customerData?.name,
    email: invoice?.customerData?.email,
    address: invoice?.customerData?.address,
    phone: invoice?.customerData?.phone,
    issueDate: new Date(invoice?.issuedDate),
    currency: invoice?.currency,
    billFrom: invoice?.businessData.id,
    discount: invoice?.discount,
    billNote: invoice?.invoiceNote,
    dueDate: new Date(invoice?.dueDate),
    billLabel: invoice?.invoiceSubject,
    tax: invoice?.tax,
    termsAndConditions: invoice?.invoiceTerms,
    paymentMode: invoice?.paymentMode,
    amtDeposited: invoice?.amountDeposited,
    items: invoice?.products.map(el => ({
      description: el?.description ?? EMPTY_STRING,
      productName: el?.productName ?? EMPTY_STRING,
      price: el?.price ?? EMPTY_STRING,
      quantity: (el?.quantity ?? 0).toString(),
      total: el?.total ?? EMPTY_STRING,
      unit: el?.unit ?? EMPTY_STRING,
    })),
  } as InvoiceFormSchemaType;
  const navigation = useNavigation<RootStackNavigationProps<'EDIT_INVOICE'>>();
  const [updateInvoice, {isLoading}] = useCompleteDraftedInvoiceApiMutation();
  const submit = async ({
    values,
    reset,
  }: BillFormSubmitProps<InvoiceFormSchemaType>) => {
    const total = values.items.reduce(
      (sum, item) => Number(item?.total ?? 0) + sum,
      0,
    );
    const taxAmount = total * (Number(values.tax || 0) / 100);
    const discount = total * (Number(values.discount || 0) / 100);
    const grandTotal =
      total - discount - Number(values.amtDeposited || 0) + taxAmount;

    try {
      const response = await updateInvoice({
        completeDraftedInvoice: {
          invoiceId: invoice.id,
          currency: values.currency,
          amountDeposited: values.amtDeposited,
          discount: values.discount,
          dueDate: values.dueDate.toString(),
          invoiceFrom: values.billFrom,
          invoiceNote: values.billNote,
          tax: values.tax,
          invoiceTo: {
            address: values.address,
            email: values.email,
            phone: values.phone,
            name: values.fullname,
          },
          invoiceTerms: values.termsAndConditions,
          invoiceSubject: values.billLabel,
          issuedDate: values.issueDate.toString(),
          invoiceStatus: 'draft',
          paymentMode: values.paymentMode,
          products: values.items.map(prod => ({
            description: prod.description,
            price: prod.price,
            quantity: Number(prod.quantity),
            productName: prod.productName,
            total: prod.total,
            unit: prod.unit,
          })),
          useDefaultInvoiceNote: !values.billNote,
          useDefaultInvoiceTerms: !values.termsAndConditions,
          subTotal: `${formatAmount(total)}`,
          taxAmount: `${formatAmount(taxAmount)}`,
          grandTotal: `${formatAmount(grandTotal)}`,
        },
      }).unwrap();
      showToast('SUCCESS', {
        title: 'Invoice Created successfully',
        message: response.message,
      });
      reset();
      navigation.replace(routesNames.PREVIEW_INVOICE, {
        invoiceId: response.data.id,
      });
    } catch (error) {
      showToast('ERROR', {
        title: 'Error encountered!',
        message: getErrorMessage(error),
      });
    }
  };

  return {
    isLoading,
    submit,
    defaultValues,
  };
};
