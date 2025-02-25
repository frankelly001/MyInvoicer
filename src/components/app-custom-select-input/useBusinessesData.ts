import {useDispatch} from 'react-redux';
import {
  apiListParamsState,
  setBusinessApiListParams,
} from '../../state/slices/api-list-params/apiListParamsSlice';
import {useAppSelector} from '../../state/slices/store';
import {
  businessAdapter,
  businessSelector,
  useGetAllBusinessesApiQuery,
} from '../../state/services/business/api';
import {useMemo} from 'react';

export const useBusinessesData = () => {
  const {businessApiListParams} = useAppSelector(apiListParamsState);
  const dispatch = useDispatch();
  const {
    data: businessData,
    isFetching: isBusinessLoading,
    isError: isBusinessError,
    refetch: refetchBusiness,
  } = useGetAllBusinessesApiQuery(businessApiListParams, {
    selectFromResult: ({data, ...otherParams}) => ({
      data: {
        ...data,
        data: businessSelector.selectAll(
          data?.data ?? businessAdapter.getInitialState(),
        ),
      },
      ...otherParams,
    }),
  });

  const businessesDataMemo = useMemo(() => {
    const businessList = (businessData?.data ?? []).map(el => ({
      label: el.businessName,
      value: el.id,
    }));
    return {
      loading: isBusinessLoading,
      data: businessList,
      isError: isBusinessError,
      refresh: refetchBusiness,
      onLoadMore: () => {
        if (!isBusinessLoading && businessData.data && businessData.nextPage) {
          dispatch(setBusinessApiListParams({page: businessData.nextPage}));
        }
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBusinessLoading, businessData?.data?.length]);

  return businessesDataMemo;
};
