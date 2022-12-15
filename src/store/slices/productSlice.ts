import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @type
import { reducerStateNew, ProductTypeSearch } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//@ http
import axios from "axios";
// @constants
import { secretAuth, OK, server } from "@/constants";

const MySwal = withReactContent(Swal);
// STATE : Default
const initialValues: reducerStateNew = {
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
// GET : Search Product By No And no_txt And category
export const productSearch = createAsyncThunk(
  "product/search",
  async ({ search }: { search: ProductTypeSearch }, thunkAPI) => {
    try {
      let no = search.no || null;
      let no_txt = search.no_txt || null;
      let category = search.category !== 0 ? search.category : null;

      const urlSearch = `${server.BACKOFFICE_URL_V1}/products?no=${no}&no_txt=${no_txt}&category=${category}`;
      const { data: res } = await axios.get(urlSearch, header_get);

      let data = res;

      if (data.result === OK) {
        // console.log(data.data);
        // navigate("/phone");
        // await wait(1 * 1000);
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
// GET : Search Product By Product ID
export const productSearchById = createAsyncThunk(
  "equipment/searchbyId",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.get(
        `${server.BACKOFFICE_URL_V1}/product?id=${id}`,
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
// PUT : Update Product By ID
export const productUpdate = createAsyncThunk(
  "product/update",
  async ({ formData, id }: { formData: any; id: any }, thunkAPI) => {
    try {
      const { data: res } = await axios.put(
        `${server.BACKOFFICE_URL_V1}/product?id=${id}`,
        formData,
        header_get
      );
      let data = res;
      if (data.result === OK) {
        const message = "แก้ไขรับอุปกรณ์ สำเร็จ";
        MySwal.fire({
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 1000,
        });
        return data.data;
      } else {
        let message = "บันทึกรับอุปกรณ์ ผิดพลาด";
        MySwal.fire({
          icon: "warning",
          title: message,
          showConfirmButton: false,
        });
        return thunkAPI.rejectWithValue(data.message);
      }
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

const productSlice = createSlice({
  name: "product",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productSearch.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(productSearch.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(productSearch.pending, (state, _action) => {
      state.isFetching = true;
    });
    builder.addCase(productSearchById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResultView = action.payload;
      return state;
    });
    builder.addCase(productSearchById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResultView = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(productSearchById.pending, (state, _action) => {
      state.isFetching = true;
    });
    builder.addCase(productUpdate.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(productUpdate.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(productUpdate.pending, (state, _action) => {
      state.isFetching = true;
    });
  },
});
// Export all of the actions:
// export const {} = loginSlice.actions;
export const productSelector = (store: RootState) => store.productReducer;
export default productSlice.reducer;
