export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string;
  flags: {
    svg: string;
  };
  flag: string;
  region: string;
  languages: [];
  currencies: {[key: string]: {name: string; symbol: string}};
  timezones: string;
  borders: [];
  cca2: string;
}

export interface Option {
  label: string;
  value: string;
}
export interface Currency {
  name: string;
  symbol: string;
}

export interface CountryState {
  name: string;
  state_code: string;
}

export interface CountryStates {
  ios2: string;
  iso3: string;
  name: string;
  states: Array<CountryState>;
}
