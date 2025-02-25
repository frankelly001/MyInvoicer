import {ApiListParamsState} from './api-list-params/types';
import {AuthState} from './auth/types';
import {ColorsState} from './colors/types';

export type storeState = {
  colorsReducer: ColorsState;
  authReducer: AuthState;
  apiListParamsSlice: ApiListParamsState;
};
