import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { secretAuth, OK, server } from "@/constants";
import axios from "axios";
import { ProductType, TransferResult, TransferDetailResult } from "@/types";

const MySwal = withReactContent(Swal);

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

const header_get = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    authorization: "Basic " + encode(secretAuth),
  },
};

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    MySwal.fire({
      title: "<p>กำลังโหลดข้อมูล ...</p>",
      showConfirmButton: false,
      timer: ms,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    setTimeout(() => resolve(), ms);
  });

// ค้นหาข้อมูล จากไอดี
export const transferDetailSearchById = createAsyncThunk(
  "transferdetail/searchbyId",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      console.log(id);
      const { data: res } = await axios.get(
        `${server.BACKOFFICE_URL_V1}/transferdetail?id=${id}`,
        header_get
      );
      let data = res;
      if (data.result === OK) {
        console.log(data.data);
        // navigate("/phone");
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

// เพิ่มข้อมูล
export const transferDetailAdd = createAsyncThunk(
  "transferdetail/add",
  async (
    { formData, navigate }: { formData: any; navigate: any },
    thunkAPI
  ) => {
    try {
      const { data: res } = await axios.post(
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
            }, 1000);
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
      // if (data.result === OK) {
      //   // console.log(data.data);
      //   // navigate("/phone");
      //   await wait(1 * 1000);
      //   return data.data;
      // } else {
      //   // console.log("Error Else :", data);
      //   return thunkAPI.rejectWithValue({
      //     message: "Failed to fetch phone.",
      //   });
      // }
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

// ลบข้อมูล จากไอดี
export const transferDetailDeleteById = createAsyncThunk(
  "transferdetail/deletehbyId",
  async ({ search }: { search: any }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.delete(
        `${server.BACKOFFICE_URL_V1}/transferdetail?id=${id}`,
        header_get
      );
      let data = res;
      if (data.result === OK) {
        // console.log(data.data);
        // navigate("/phone");
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
  // initialState: initialState,
  initialState,
  reducers: {},
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
      console.log(action.payload);
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
// export const {} = transferDetailSlice.actions;
export const transferDetailSelector = (store: RootState) =>
  store.transferDetailReducer;
export default transferDetailSlice.reducer;
