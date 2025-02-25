import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../components/app-toast';
import {useCreateInvoiceApiMutation} from '../../../../state/services/invoice/api';
import {formatAmount, getErrorMessage} from '../../../../utils/helpers';
import {generateRandomFullName} from '../../../../utils/helpers/generateRandomFullName';
import {BillFormSubmitProps} from '../common/type';
import {InvoiceFormSchemaType} from './schema';
import {BillToProps} from '../../../../types/Billing';
import {RootStackNavigationProps} from '../../../../navigation/main-navigation/types';
import {routesNames} from '../../../../navigation/routes';
import {ItemsSchemaType} from '../common/bill-form-screen/schema';
import {
  timeSheetApi,
  timesheetAdapter,
} from '../../../../state/services/timesheet/api';
import {useDispatch, useSelector} from 'react-redux';
import {apiListParamsState} from '../../../../state/slices/api-list-params/apiListParamsSlice';
import {Invoice} from '../../../../types/Invoices';
import {EMPTY_STRING} from '../../../../utils/constants/fieldDefaultValues';

export const useCreateInvoice = ({
  billTo,
  currency,
  items,
  timesheetId,
  duplicate: invoice,
}: {
  billTo?: BillToProps;
  currency?: string;
  timesheetId?: string;
  items?: ItemsSchemaType;
  duplicate?: Invoice;
}) => {
  const {timesheetApiListParams} = useSelector(apiListParamsState);
  const dispatch: any = useDispatch();
  const defaultValues = {
    fullname: billTo?.fullname ?? generateRandomFullName(),
    address: billTo?.address ?? 'Alandinma',
    email: billTo?.email ?? `sasha${Math.ceil(Math.random() * 500)}@gmail.com`,
    phone: billTo?.phone ?? `081${Math.ceil(Math.random() * 65770)}7344`,
    termsAndConditions: 'its good',
    amtDeposited: `${Math.ceil(Math.random() * 500)}`,
    discount: `${Math.ceil(Math.random() * 10)}`,
    tax: `${Math.ceil(Math.random() * 10)}`,
    paymentMode: 'cash',
    billLabel: `sasha${Math.ceil(Math.random() * 500)}`,
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
    billNote: 'i love thid app',
    currency: currency ?? 'Australian dollar ($)',
    billFrom: '659d1d5355e1e00018998ca1',
    items: items ?? [
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
  } as InvoiceFormSchemaType;

  const duplicateDefaultValues = {
    fullname: invoice?.customerData?.name,
    email: invoice?.customerData?.email,
    address: invoice?.customerData?.address,
    phone: invoice?.customerData?.phone,
    issueDate: new Date(invoice?.issuedDate ?? 0),
    currency: invoice?.currency,
    billFrom: invoice?.businessData.id,
    discount: invoice?.discount,
    billNote: invoice?.invoiceNote,
    dueDate: new Date(invoice?.dueDate ?? 0),
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

  const navigation =
    useNavigation<RootStackNavigationProps<'CREATE_INVOICE'>>();

  const [createInvoice, {isLoading}] = useCreateInvoiceApiMutation();

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
      const response = await createInvoice({
        createInvoice: {
          ...(timesheetId && {timesheetId}),
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
      if (timesheetId) {
        dispatch(
          timeSheetApi.util.updateQueryData(
            'getAllTimeSheetsApi',
            timesheetApiListParams,
            timesheetDraft => {
              timesheetAdapter.updateOne(timesheetDraft.data, {
                id: timesheetId,
                changes: {timesheetStatus: 'billed'},
              });
            },
          ),
        );
      }
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
    submit,
    isLoading,
    defaultValues: invoice ? duplicateDefaultValues : defaultValues,
  };
};
