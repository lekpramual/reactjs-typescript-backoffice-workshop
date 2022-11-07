import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @type
import { EquipmentResult, EquipmentSearch, reducerState } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { secretAuth, OK, server } from "@/constants";
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
    authorization: "Basic " + encode(secretAuth),
  },
};

// โหลดข้อมูลทั้งหมด
export const equipmentAll = createAsyncThunk(
  "equipment/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<EquipmentResult>(
        `${server.BACKOFFICE_URL_V1}/equipments`,
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

// ค้นหาข้อมูล
export const equipmentSearch = createAsyncThunk(
  "equipment/search",
  async (
    { search, navigate }: { search: EquipmentSearch; navigate: any },
    thunkAPI
  ) => {
    try {
      let no = search.no;
      let title = search.title;
      let depart = search.depart["state"];

      const { data: res } = await axios.get(
        `${server.BACKOFFICE_URL_V1}/equipments?q=""${
          no !== "" && `&no=${no}`
        }${title !== "" && `&title=${title}`}${
          depart !== "" && `&depart=${depart}`
        }`,
        header_get
      );

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
export const equipmentSearchById = createAsyncThunk(
  "equipment/searchbyId",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.get(
        `${server.BACKOFFICE_URL_V1}/equipment?id=${id}`,
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

export const equipmentSearchByIdV2 = createAsyncThunk(
  "equipment/searchbyIdV2",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.get(
        `${server.BACKOFFICE_URL_V1}/equipment?id=${id}`,
        header_get
      );
      let data = res;
      if (data.result === OK) {
        await wait(1 * 1000);
        return data.data;
      } else {
        // console.log("Error Else :", data);
        return thunkAPI.rejectWithValue({
          message: "Failed to fetch phone.",
        });
      }
    } catch (e: any) {
      console.log("Error", e.error.message);
      setTimeout(() => {
        MySwal.hideLoading();
        let message = e.error.message;
        MySwal.fire({
          icon: "error",
          title: message,
          showConfirmButton: false,
        });
        return thunkAPI.rejectWithValue(e.error.message);
      }, 1000);
    }
  }
);

const equipmentSlice = createSlice({
  name: "equipment",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(equipmentAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentAll.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(equipmentSearch.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentSearch.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentSearch.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(equipmentSearchByIdV2.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentSearchByIdV2.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentSearchByIdV2.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// export const {} = loginSlice.actions;
export const equipmentSelector = (store: RootState) => store.equipmentReducer;
export default equipmentSlice.reducer;
