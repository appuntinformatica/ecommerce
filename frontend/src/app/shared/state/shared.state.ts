export interface SharedState {
  showLoading: Boolean;
  errorMessage: string;
}

export const initialState: SharedState = {
  showLoading: false,
  errorMessage: '',
};
