import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//@ http
import axios from "axios";
// @constants
import { secretAuth, OK, server } from "@/constants";
// @types
import { reducerStateNew, dataResult } from "@/types";

const MySwal = withReactContent(Swal);
// STATE : Default
const initialState: reducerStateNew = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isResult: [],
  isResultEdit: [],
  isResultView: [],
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

// POST : Create New Data Transfer Detail
export const transferDetailAdd = createAsyncThunk(
  "transferdetail/add",
  async (
    { formData, navigate }: { formData: any; navigate: any },
    thunkAPI
  ) => {
    try {
      const { data: res } = await axios.post<dataResult>(
        `${server.BACKOFFICE_URL_V1}/transferdetail`,
        formData,
        header_get
      );

      let data = res;

      MySwal.fire({
        title: "<p>กำลังประมวลผล ...</p>",
        didOpen: () => {
          MySwal.showLoading();
          if (data.result === OK) {
            setTimeout(() => {
              MySwal.hideLoading();
              const message = "เพิ่มรายการอุปกรณ์ สำเร็จ";
              MySwal.fire({
                icon: "success",
                title: message,
                showConfirmButton: false,
                timer: 1500,
              });
              return data.data;
            }, 800);
          } else {
            setTimeout(() => {
              MySwal.hideLoading();
              let message = "ผิดพลาด กรุณาตรวจสอบ";
              MySwal.fire({
                icon: "warning",
                title: message,
                showConfirmButton: false,
              });
              return thunkAPI.rejectWithValue(data.message);
            }, 1000);
          }
        },
      });
    } catch (e: any) {
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
// GET : Search Transfer Detail By ID
export const transferDetailSearchById = createAsyncThunk(
  "transferdetail/searchbyId",
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
// GET : Search Transfer Detail By Product ID
export const transferDetailSearchByProductId = createAsyncThunk(
  "transferdetail/searchbyProductId",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;

      const { data: res } = await axios.get<dataResult>(
        `${server.BACKOFFICE_URL_V1}/transferdetailByProductId?id=${id}`,
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
// DELETE : Delete Transfer Detail By ID
export const transferDetailDeleteById = createAsyncThunk(
  "transferdetail/deletehbyId",
  async ({ search }: { search: any }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.delete<dataResult>(
        `${server.BACKOFFICE_URL_V1}/transferdetail?id=${id}`,
        header_get
      );
      let data = res;
      if (data.result === OK) {
        return data.data;
      } else {
        // console.log("Error Else :", data);
        return thunkAPI.rejectWithValue({
          message: "Failed to fetch phone.",
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

const transferDetailSlice = createSlice({
  name: "transferdetail",
  initialState,
  reducers: {
    addTransferDetailEdit: (
      state: reducerStateNew,
      action: PayloadAction<any>
    ) => {
      console.log(action.payload);
      state.isResultEdit.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(transferDetailAdd.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(transferDetailAdd.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(transferDetailAdd.pending, (state, _action) => {
      state.isFetching = true;
    });

    builder.addCase(transferDetailSearchById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResultView = action.payload;
      return state;
    });
    builder.addCase(transferDetailSearchById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResultView = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(transferDetailSearchById.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(
      transferDetailSearchByProductId.fulfilled,
      (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.isResult = action.payload;
        return state;
      }
    );
    builder.addCase(
      transferDetailSearchByProductId.rejected,
      (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.isResult = [];
        state.errorMessage = action.payload as string;
      }
    );
    builder.addCase(
      transferDetailSearchByProductId.pending,
      (state, action) => {
        state.isFetching = true;
      }
    );

    builder.addCase(transferDetailDeleteById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      // state.isResult = action.payload;
      return state;
    });
    builder.addCase(transferDetailDeleteById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(transferDetailDeleteById.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// Export all of the actions:
export const { addTransferDetailEdit } = transferDetailSlice.actions;
export const transferDetailSelector = (store: RootState) =>
  store.transferDetailReducer;
export default transferDetailSlice.reducer;
