import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
// @type
import { reducerState, NumberResult } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//@ http
import axios from "axios";
// @constants
import { server, secretKey } from "@/constants";

const MySwal = withReactContent(Swal);
// STATE : Default
const initialValues: reducerState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isResult: [],
  errorMessage: "",
};
// HEADER : Http
const header_get = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    secretkey: secretKey,
  },
};

// LOADDING : Delay Loadding
const loadding = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
// GET : Search All Number
export const numberAll = createAsyncThunk("number/all", async (_, thunkAPI) => {
  try {
    const response = await axios.get<NumberResult>(
      `${server.SERVICE_URL}/phones`,
      header_get
    );
    let data = await response.data;
    if (data.status === true) {
      await loadding(1 * 1000);
      return data.data;
    } else {
      console.log("Error Else :", data.message);
      // return data.message;
      return thunkAPI.rejectWithValue({
        message: "Failed to fetch number.",
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
    console.log(e.error.message);

    return thunkAPI.rejectWithValue(e.error.message);
  }
});
// GET : Search Number By Keyword
export const numberSearch = createAsyncThunk(
  "number/search",
  async ({ keyword }: { keyword: string }, thunkAPI) => {
    try {
      if (keyword) {
        const response = await axios.get<NumberResult>(
          `${server.SERVICE_URL}/phones`,
          header_get
        );
        let data = await response.data;
        if (data.status === true) {
          let resultData = data.data;
          const lowercasedValue = keyword.toLowerCase().trim();
          const filteredData = resultData.filter((item: any) => {
            return Object.keys(item).some((key) =>
              item[key].toString().toLowerCase().includes(lowercasedValue)
            );
          });
          await loadding(1 * 1000);
          return filteredData;
        } else {
          console.log("Error Else :", data.message);
          // return data.message;
          return thunkAPI.rejectWithValue({
            message: "Failed to fetch number.",
          });
        }
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

const numberSlice = createSlice({
  name: "number",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    // โหลดข้อมูลทั้งหมด
    builder.addCase(numberAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(numberAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(numberAll.pending, (state, action) => {
      state.isFetching = true;
    });

    // ค้นหา
    builder.addCase(numberSearch.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(numberSearch.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(numberSearch.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});
// Export all of the actions:
// export const {} = transferDetailSlice.actions;
export const numberSelector = (store: RootState) => store.numberReducer;
export default numberSlice.reducer;
