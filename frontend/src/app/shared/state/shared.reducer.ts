import { setLoadingSpinner, setErrorMessage } from './shared.actions';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { initialState, SharedState } from './shared.state';

export const sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
) as ActionReducer<SharedState, Action>;

