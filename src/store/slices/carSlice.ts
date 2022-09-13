import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
// @type
import { reducerState, carResult } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { server, secretKey } from "@/constants";
// @utils
// import { httpPhoneClient } from "@/utils";
import axios from "axios";

const MySwal = withReactContent(Swal);

const initialValues: reducerState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isResult: [],
  errorMessage: "",
};

const header_get = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    secretkey: secretKey,
  },
};

export const carAll = createAsyncThunk("car/all", async (_, thunkAPI) => {
  try {
    const response = await axios.get<carResult>(
      `${server.SERVICE_URL}/cars`,
      header_get
    );
    let data = await response.data;
    if (data.status === true) {
      // console.log(data.data);
      return data.data;
    } else {
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
    return thunkAPI.rejectWithValue(e.error.message);
  }
});

export const carSearch = createAsyncThunk(
  "number/search",
  async ({ keyword }: { keyword: string }, thunkAPI) => {
    try {
      if (keyword) {
        const response = await axios.get<carResult>(
          `${server.SERVICE_URL}/cars`,
          header_get
        );
        let data = await response.data;
        if (data.status === true) {
          let resultData = data.data;
          console.log(resultData);
          let val = keyword.toLowerCase();
          let matches = await resultData.filter((v: any) =>
            v.licenseplate.toLowerCase().includes(val)
          );

          console.log(matches);

          return matches;
        } else {
          console.log("Error Else :", data);
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

const carSlice = createSlice({
  name: "car",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    // โหลดข้อมูลทั้งหมด
    builder.addCase(carAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(carAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(carAll.pending, (state, action) => {
      state.isFetching = true;
    });

    // ค้นหา
    builder.addCase(carSearch.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(carSearch.rejected, (state, action) => {
      console.log(action);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(carSearch.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

export const carSelector = (store: RootState) => store.carReducer;
export default carSlice.reducer;
