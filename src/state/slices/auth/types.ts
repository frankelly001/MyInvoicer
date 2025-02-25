import {AuthSuccess} from '../../../types/Authentication';

export type AuthState = {
  user: AuthSuccess | null;
};
