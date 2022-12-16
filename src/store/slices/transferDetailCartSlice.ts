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
type equipmentCartId = string;

type transferDetailCart = {
  id: equipmentCartId;
  equipment_detail_title: string;
  equipment_detail_category: string;
  equipment_detail_category_name: string;
  equipment_detail_material_type: string;
  equipment_detail_qty: number;
  equipment_detail_price: number;
  equipment_detail_price_total: number;
  equipment_detail_note: string;
};

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
      console.log(action.payload);
      state.isResult.push(action.payload);
    },

    resetanyEdit: (state: transferDetailCartState) => {
      state.isResultEdit = [];
    },

    resetany: (state: transferDetailCartState) => {
      state.isResult = [];
    },

    updateanyEdit: (
      state: transferDetailCartState,
      action: PayloadAction<any>
    ) => {
      const index = state.isResult.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.isResult[index].equipment_detail_title =
        action.payload.equipment_detail_title;
      state.isResult[index].equipment_detail_category =
        action.payload.equipment_detail_category;
      state.isResult[index].equipment_detail_category_name =
        action.payload.equipment_detail_category_name;

      state.isResult[index].equipment_detail_material_type =
        action.payload.equipment_detail_material_type;

      state.isResult[index].equipment_detail_qty =
        action.payload.equipment_detail_qty;

      state.isResult[index].equipment_detail_price =
        action.payload.equipment_detail_price;

      state.isResult[index].equipment_detail_price_total =
        action.payload.equipment_detail_qty *
        action.payload.equipment_detail_price;

      state.isResult[index].equipment_detail_note =
        action.payload.equipment_detail_note;

      const message = "แก้ไขรับอุปกรณ์ สำเร็จ";
      MySwal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1000,
      });
    },
    addTransferDetailCart: (
      state: transferDetailCartState,
      action: PayloadAction<any>
    ) => {
      state.isResult.push(action.payload);
    },

    deleteany: (
      state: transferDetailCartState,
      action: PayloadAction<equipmentCartId>
    ) => {
      state.isResult = state.isResult.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(transferDetailCartSearchById.fulfilled, (state, action) => {
      console.log(action.payload);
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
  addTransferDetailCart,
  addTransferDetailCartEdit,
  resetany,
  resetanyEdit,
  updateanyEdit,
  deleteany,
} = transferDetailCartSlice.actions;
export const transferDetailCartSelector = (store: RootState) =>
  store.transferDetailCartReducer;
export default transferDetailCartSlice.reducer;
