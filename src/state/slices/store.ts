import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {LogBox} from 'react-native';
import {baseApi as api} from '../services/baseApi';
import authReducer from './auth/authSlice';
import colorsReducer from './colors/colorsSlice';
import apiListParamsReducer from './api-list-params/apiListParamsSlice';

LogBox.ignoreLogs(['Require cycle:']);

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  authReducer,
  colorsReducer,
  apiListParamsReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const resetStore = () => {
  const rootState = store.getState();
  const resetAction = {type: 'RESET_STORE'};
  Object.keys(rootState).forEach(key => {
    store.dispatch({...resetAction, meta: {key}});
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
