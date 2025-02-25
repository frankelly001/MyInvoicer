import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import localStorage from '../../../utils/helpers/localStorage';
import {AuthState} from './types';

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      localStorage.remove(localStorage.keys.ACCESS_TOKEN);
      localStorage.remove(localStorage.keys.USER);
      state.user = null;
    },
    setUser: (state, {payload}) => {
      state.user = payload;
    },
  },
});

export const {setUser, logOut} = authSlice.actions;

export const authState = (state: RootState): AuthState => state.authReducer;

export default authSlice.reducer;
