import {QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {QueryStateSelector} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  customerAdapter,
  customerSelector,
} from '../../state/services/customer/api';
import {
  estimateAdapter,
  estimateSelector,
} from '../../state/services/estimate/api';
import {
  invoiceAdapter,
  invoiceSelector,
} from '../../state/services/invoice/api';

const invoiceSelectFromResult: QueryStateSelector<
  Record<string, any>,
  QueryDefinition<any, any, any, any>
> = ({data, ...otherParams}) => ({
  data: {
    ...data,
    data: invoiceSelector.selectAll(
      data?.data ?? invoiceAdapter.getInitialState(),
    ),
  },
  ...otherParams,
});
const estimateSelectFromResult: QueryStateSelector<
  Record<string, any>,
  QueryDefinition<any, any, any, any>
> = ({data, ...otherParams}) => ({
  data: {
    ...data,
    data: estimateSelector.selectAll(
      data?.data ?? estimateAdapter.getInitialState(),
    ),
  },
  ...otherParams,
});

const customerSelectFromResult: QueryStateSelector<
  Record<string, any>,
  QueryDefinition<any, any, any, any>
> = ({data, ...otherParams}) => ({
  data: {
    ...data,
    data: customerSelector.selectAll(
      data?.data ?? customerAdapter.getInitialState(),
    ),
  },
  ...otherParams,
});

export {
  customerSelectFromResult,
  estimateSelectFromResult,
  invoiceSelectFromResult,
};
