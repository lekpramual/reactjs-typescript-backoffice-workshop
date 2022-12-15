import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @type
import { EquipmentResult, reducerState } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { secretAuth, OK, server } from "@/constants";
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

// GET : Search Category All
export const categoryAll = createAsyncThunk(
  "category/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<EquipmentResult>(
        `${server.BACKOFFICE_URL_V1}/categorys`,
        header_get
      );
      let data = await response.data;
      if (data.result === OK) {
        // console.log(data.data);
        return data.data;
      } else {
        console.log("Error Else :", data.message);
        // return data.message;
        return thunkAPI.rejectWithValue({
          message: "Failed to fetch category.",
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

const categorySlice = createSlice({
  name: "category",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(categoryAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(categoryAll.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// export const {} = loginSlice.actions;
export const categorySelector = (store: RootState) => store.categoryReducer;
export default categorySlice.reducer;
