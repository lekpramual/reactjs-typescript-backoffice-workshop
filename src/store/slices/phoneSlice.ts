import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
// @type
import { PhoneResult, PhoneSearch, reducerState } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { apiPhoneUrl, secretKey } from "@/constants";
// @utils
// import { httpPhoneClient } from "@/utils";
import axios from "axios";
// @day
import moment from "moment";

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

export const phoneAll = createAsyncThunk("phone/all", async (_, thunkAPI) => {
  try {
    const response = await axios.get<PhoneResult>(
      `${apiPhoneUrl}/phone.php`,
      header_get
    );
    let data = await response.data;
    if (data.code === 200) {
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

export const phoneSearch = createAsyncThunk(
  "phone/search",
  async (
    { phone, navigate }: { phone: PhoneSearch; navigate: any },
    thunkAPI
  ) => {
    try {
      let keyword = phone.keyword;
      let type = phone.type;
      const date_start =
        phone.start != null ? moment(phone.start).format("yyyy-MM-DD") : "";
      const date_end =
        phone.end != null ? moment(phone.end).format("yyyy-MM-DD") : "";

      let disposition = phone.disposition;
      let dstchannel = phone.dstchannel;

      // console.log(phone);
      const { data: res } = await axios.get(
        `${apiPhoneUrl}/search.php?q=""&keyword=${keyword}&type=${type}&disposition=${disposition}&dstchannel=${dstchannel}&start=${date_start}&end=${date_end}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            secretkey: secretKey,
          },
        }
      );

      let data = res;

      if (data.code === 200) {
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

const phoneSlice = createSlice({
  name: "phone",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(phoneAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(phoneAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(phoneAll.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(phoneSearch.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(phoneSearch.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(phoneSearch.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// export const {} = loginSlice.actions;
export const phoneSelector = (store: RootState) => store.phoneReducer;
export default phoneSlice.reducer;
