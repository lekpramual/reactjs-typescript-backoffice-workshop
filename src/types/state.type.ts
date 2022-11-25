export interface reducerState {
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isResult: any;
  errorMessage: string;
}

export interface reducerStateNew {
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isResult: any;
  isResultEdit: any;
  isResultView: any;
  errorMessage: string;
}
