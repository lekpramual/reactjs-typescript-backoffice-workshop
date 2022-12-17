import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { secretAuth, OK, server } from "@/constants";
//@ http
import axios from "axios";
import { dataResult } from "../../types";
const MySwal = withReactContent(Swal);

// We can safely reuse
// types created earlier:
// type equipmentCartId = string;

type transferDetailCartState = {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isResult: any;
  isResultEdit: any;
  errorMessage: string;
};
// STATE : Default
const initialState: transferDetailCartState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isResult: [],
  isResultEdit: [],
  errorMessage: "",
};

// HEADER : Http
const header_get = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    authorization: "Basic " + encode(secretAuth),
  },
};
// LOADDING : Delay Loadding
const loadding = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

// GET : Search Transfer Detail By ID
export const transferDetailCartSearchById = createAsyncThunk(
  "transferdetailcart/searchbyId",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.get<dataResult>(
        `${server.BACKOFFICE_URL_V1}/transferdetail?id=${id}`,
        header_get
      );
      let data = res;
      if (data.result === OK) {
        await loadding(1 * 1000);
        return data.data;
      } else {
        // console.log("Error Else :", data);
        return thunkAPI.rejectWithValue({
          message: "Failed to fetch transfer detail.",
        });
      }
    } catch (e: any) {
      // console.log("Error", e.error.message);
      let message = e.error.message;
      MySwal.fire({
        icon: "error",
        title: message,
        showConfirmButton: false,
      });
      console.log(e.error.message);

      return thunkAPI.rejectWithValue(e.error.message);
    }
  }
);

const transferDetailCartSlice = createSlice({
  name: "transferDetailCart",
  // initialState: initialState,
  initialState,
  reducers: {
    addTransferDetailCartEdit: (
      state: transferDetailCartState,
      action: PayloadAction<any>
    ) => {
      state.isResult = action.payload;
    },

    // loadTransferDetailCartEdit: (state: transferDetailCartState) => {
    //   state.isResult = state.isResult;
    // },

    resetTransferDetailCartEdit: (state: transferDetailCartState) => {
      state.isResult = [];
    },

    deleteTransferDetailCart: (
      state: transferDetailCartState,
      action: PayloadAction<any>
    ) => {
      state.isResult = state.isResult.filter(
        (todo) => todo.product_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(transferDetailCartSearchById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(transferDetailCartSearchById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(transferDetailCartSearchById.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// Export all of the actions:
export const {
  addTransferDetailCartEdit,
  resetTransferDetailCartEdit,
  deleteTransferDetailCart,
  // loadTransferDetailCartEdit,
} = transferDetailCartSlice.actions;
export const transferDetailCartSelector = (store: RootState) =>
  store.transferDetailCartReducer;
export default transferDetailCartSlice.reducer;
