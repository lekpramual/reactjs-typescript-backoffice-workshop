import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
// @alert
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { ProductType } from "@/types";

// const MySwal = withReactContent(Swal);

// We can safely reuse
// types created earlier:
type transferId = string;
// type transferSelectId = number;

type Transfer = {
  product_id: transferId;
  product_no: string;
  product_inventory_number: string;
};

type TransferState = {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isResult: any;
  isResultEdit: any;
  isResultView: any;
  errorMessage: string;
};

const initialState: TransferState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isResult: [],
  isResultEdit: [],
  isResultView: [],
  errorMessage: "",
};

const transferSlice = createSlice({
  name: "transfer",
  // initialState: initialState,
  initialState,
  reducers: {
    addTransferEdit: (
      state: TransferState,
      action: PayloadAction<ProductType>
    ) => {
      state.isResultEdit.push(action.payload);
    },

    resetTransferEdit: (state: TransferState) => {
      state.isResultEdit = [];
    },

    resetTransfer: (state: TransferState) => {
      state.isResult = [];
    },

    addTransfer: (state: TransferState, action: PayloadAction<Transfer>) => {
      state.isResult = action.payload;
    },
    addSelectTransfer: (state: TransferState, action: PayloadAction<any>) => {
      state.isResultEdit = action.payload;
    },

    deleteTransfer: (state: TransferState, action: PayloadAction<any>) => {
      state.isResult = state.isResult.filter(
        (todo) => todo.product_id !== action.payload
      );

      state.isResultEdit = state.isResultEdit.filter(
        (todo) => todo !== action.payload
      );
    },
  },
  extraReducers: (builder) => {},
});

// Export all of the actions:
export const {
  addTransfer,
  addTransferEdit,
  addSelectTransfer,
  resetTransfer,
  resetTransferEdit,
  deleteTransfer,
} = transferSlice.actions;
export const transferSelector = (store: RootState) => store.transferReducer;
export default transferSlice.reducer;
