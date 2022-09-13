import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
// @type
import { reducerState, HosxpResult } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { server, secretKey } from "@/constants";
// @utils
// import { httpPhoneClient } from "@/utils";
import axios from "axios";
// @day
// import moment from "moment";

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

export const hosxpAll = createAsyncThunk("hosxp/all", async (_, thunkAPI) => {
  try {
    const response = await axios.get<HosxpResult>(
      `${server.HOSXP_URL}/users`,
      header_get
    );
    let data = await response.data;
    if (data.status === true) {
      // console.log(data.data);
      return data.data;
    } else {
      console.log("Error Else :", data.message);
      // return data.message;
      return thunkAPI.rejectWithValue({
        message: "Failed to fetch phone.",
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

export const hosxpSearch = createAsyncThunk(
  "hosxp/search",
  async ({ keyword }: { keyword: string }, thunkAPI) => {
    try {
      console.log(keyword);
      if (keyword) {
        const { data: res } = await axios.get<HosxpResult>(
          `${server.HOSXP_URL}/user/?username=${keyword}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-type": "application/json",
              secretkey: secretKey,
            },
          }
        );

        let data = res;

        if (data.status === true) {
          // console.log(data.data);
          // navigate("/phone");
          return data.data;
        } else {
          // console.log("Error Else :", data);
          return thunkAPI.rejectWithValue({
            message: "Failed to fetch phone.",
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

export const hosxpDelete = createAsyncThunk(
  "hosxp/delete",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      console.log(id);
      if (id) {
        const { data: res } = await axios.delete<HosxpResult>(
          `${server.HOSXP_URL}/user/?username=${id}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-type": "application/json",
              secretkey: secretKey,
            },
          }
        );

        let data = res;

        if (data.status === true) {
          // console.log(data.data);
          return data.data;
        } else {
          // console.log("Error Else :", data);
          return thunkAPI.rejectWithValue({
            message: "Failed to fetch phone.",
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

const hosxpSlice = createSlice({
  name: "hosxp",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hosxpAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(hosxpAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(hosxpAll.pending, (state, action) => {
      state.isFetching = true;
    });

    // Search
    builder.addCase(hosxpSearch.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(hosxpSearch.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(hosxpSearch.pending, (state, action) => {
      state.isFetching = true;
    });

    // Delete
    builder.addCase(hosxpDelete.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(hosxpDelete.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(hosxpDelete.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

export const hosxpSelector = (store: RootState) => store.hosxpReducer;
export default hosxpSlice.reducer;
