import {useMemo} from 'react';
import {useGetCountriesApiQuery} from '../../state/services/countries/api';
import {generateSelectInputData} from '../../utils/helpers';

export const useCountriesData = () => {
  const {
    data: countriesData = [],
    isFetching: isCountriesLoading,
    isError: isCountriesError,
    refetch: refetchCountries,
  } = useGetCountriesApiQuery();

  const countriesDataMemo = useMemo(() => {
    const countriesList = generateSelectInputData(
      countriesData?.map(el => el.name.common),
    );
    return {
      loading: isCountriesLoading,
      data: countriesList,
      isError: isCountriesError,
      refresh: refetchCountries,
      onLoadMore: () => null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountriesLoading, countriesData?.length]);

  return countriesDataMemo;
};
