import {useMemo} from 'react';
import {useGetCountriesApiQuery} from '../../state/services/countries/api';
import {getCurrencySymbol} from '../../utils/helpers';

export const useCurrenciesData = () => {
  const {
    data: countriesData = [],
    isFetching: isCountriesLoading,
    isError: isCountriesError,
    refetch: refetchCountries,
  } = useGetCountriesApiQuery();

  const currenciesDataMemo = useMemo(() => {
    const currencyList = countriesData
      ?.map(el => {
        const currencies = Object.values(el?.currencies ?? {})[0];
        const currency = `${currencies?.name ?? ''} (${
          currencies?.symbol ?? ''
        })`;
        return {
          label: currency,
          value: currency,
        };
      })
      .filter(
        (currency, index, self) =>
          index === self.findIndex(t => t.value === currency.value) &&
          !!getCurrencySymbol(currency.value),
      );
    return {
      loading: isCountriesLoading,
      data: currencyList,
      isError: isCountriesError,
      refresh: refetchCountries,
      onLoadMore: () => null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountriesLoading, countriesData?.length]);

  return currenciesDataMemo;
};
