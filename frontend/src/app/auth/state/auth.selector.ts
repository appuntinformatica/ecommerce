import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  console.log('isAuthenticated', (state.user !== null ? true : false) );
  return state.user !== null ? true : false;
});

export const getToken = createSelector(getAuthState, (state) => {
  console.log('getToken', (state.user ? state.user.userToken : null) );
  return state.user ? state.user.userToken : null;
});
