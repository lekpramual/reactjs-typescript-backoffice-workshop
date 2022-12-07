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
import { ProductType, TransferResult } from "@/types";

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

// เพิ่มข้อมูล
export const transferAdd = createAsyncThunk(
  "transfer/add",
  async (
    { formData, navigate }: { formData: any; navigate: any },
    thunkAPI
  ) => {
    try {
      const { data: res } = await axios.post(
        `${server.BACKOFFICE_URL_V1}/transfer`,
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
              const message = "บันทึกใบโอนย้าน สำเร็จ";
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

// โหลดข้อมูลทั้งหมด
export const transferAll = createAsyncThunk(
  "transfer/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<TransferResult>(
        `${server.BACKOFFICE_URL_V1}/transfers`,
        header_get
      );
      let data = await response.data;
      if (data.result === OK) {
        // console.log(data.data);
        await wait(1 * 1000);
        return data.data;
      } else {
        console.log("Error Else :", data.message);
        // return data.message;
        return thunkAPI.rejectWithValue({
          message: "Failed to fetch equipment.",
        });
      }
    } catch (e: any) {
      console.log("Error", e.error.message);
      let message = e.error.message;
      MySwal.fire({
        icon: "error",
        title: message,
        showConfirmButton: false,
      });
      // console.log(e.error.message);

      return thunkAPI.rejectWithValue(e.error.message);
    }
  }
);

// ค้นหาข้อมูล จากไอดี
export const transferSearchById = createAsyncThunk(
  "transfer/searchbyId",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.get(
        `${server.BACKOFFICE_URL_V1}/transfer?id=${id}`,
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
          message: "Failed to fetch transfer.",
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

const transferSlice = createSlice({
  name: "transfer",
  // initialState: initialState,
  initialState,
  reducers: {
    addTransferEdit: (
      state: TransferState,
      action: PayloadAction<ProductType>
    ) => {
      state.isResultView.push(action.payload);
    },

    resetTransferEdit: (state: TransferState) => {
      state.isResultEdit = [];
    },

    resetTransfer: (state: TransferState) => {
      state.isResultView = [];
      state.isResultEdit = [];
    },

    addTransfer: (state: TransferState, action: PayloadAction<Transfer>) => {
      state.isResultView = action.payload;
    },
    addSelectTransfer: (state: TransferState, action: PayloadAction<any>) => {
      state.isResultEdit = action.payload;
    },

    deleteTransfer: (state: TransferState, action: PayloadAction<any>) => {
      state.isResultView = state.isResultView.filter(
        (todo) => todo.product_id !== action.payload
      );

      state.isResultEdit = state.isResultEdit.filter(
        (todo) => todo !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(transferAdd.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(transferAdd.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(transferAdd.pending, (state, _action) => {
      state.isFetching = true;
    });

    builder.addCase(transferAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(transferAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(transferAll.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(transferSearchById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResultView = action.payload;
      return state;
    });
    builder.addCase(transferSearchById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResultView = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(transferSearchById.pending, (state, action) => {
      state.isFetching = true;
    });
  },
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
