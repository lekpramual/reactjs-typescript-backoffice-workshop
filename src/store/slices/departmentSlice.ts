import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @type
import { DepartmentResult, reducerState } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { secretAuth, OK, server } from "@/constants";
// @utils
// import { httpPhoneClient } from "@/utils";
import axios from "axios";

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
    authorization: "Basic " + encode(secretAuth),
  },
};

// GET : Search Department
export const departmentAll = createAsyncThunk(
  "department/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<DepartmentResult>(
        `${server.BACKOFFICE_URL_V1}/departments`,
        header_get
      );
      let data = await response.data;
      if (data.result === OK) {
        // console.log(data.data);
        return data.data;
      } else {
        // console.log("Error Else :", data.message);
        // return data.message;
        return thunkAPI.rejectWithValue({
          message: "Failed to fetch department.",
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
const departmentSlice = createSlice({
  name: "department",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(departmentAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(departmentAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(departmentAll.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// export const {} = loginSlice.actions;
export const departmentSelector = (store: RootState) => store.departmentReducer;
export default departmentSlice.reducer;
