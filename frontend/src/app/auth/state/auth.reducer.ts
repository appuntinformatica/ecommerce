import { loginSuccess, autoLogout } from './auth.actions';
import { Action, createReducer, on, State } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

