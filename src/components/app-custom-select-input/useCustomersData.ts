import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../state/slices/store';
import {
  customerAdapter,
  customerSelector,
  useGetAllCustomersApiQuery,
} from '../../state/services/customer/api';
import {useMemo} from 'react';
import {
  apiListParamsState,
  setCustomerApiListParams,
} from '../../state/slices/api-list-params/apiListParamsSlice';

export const useCustomersData = () => {
  const {customerApiListParams} = useAppSelector(apiListParamsState);
  const dispatch = useDispatch();
  const {
    data: customersData,
    isFetching: isCustomersFetching,
    isError: isCustomersError,
    refetch: refetchCustomers,
  } = useGetAllCustomersApiQuery(customerApiListParams, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: customerSelector.selectAll(
          data?.data ?? customerAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const customersDataMemo = useMemo(() => {
    const customersList = (customersData?.data ?? []).map(el => ({
      label: el.name,
      value: el.id,
    }));
    return {
      loading: isCustomersFetching,
      data: customersList,
      isError: isCustomersError,
      refresh: refetchCustomers,
      onLoadMore: () => {
        if (
          !isCustomersFetching &&
          customersData.data &&
          customersData.nextPage
        ) {
          dispatch(setCustomerApiListParams({page: customersData.nextPage}));
        }
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomersFetching, customersData?.data?.length]);

  return customersDataMemo;
};
