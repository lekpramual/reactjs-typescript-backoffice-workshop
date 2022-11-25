import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @type
import { reducerStateNew, ProductTypeSearch } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { secretAuth, OK, server } from "@/constants";
// @utils
// import { httpPhoneClient } from "@/utils";
import axios from "axios";

const MySwal = withReactContent(Swal);

const initialValues: reducerStateNew = {
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

// ค้นหาข้อมูล
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
        await wait(1 * 1000);
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

// ค้นหาข้อมูล จากไอดี
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
  },
});

// export const {} = loginSlice.actions;
export const productSelector = (store: RootState) => store.productReducer;
export default productSlice.reducer;
