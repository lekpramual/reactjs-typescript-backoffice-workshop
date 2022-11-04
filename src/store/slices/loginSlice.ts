import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encode } from "base-64";
// @store PayloadAction
import { RootState } from "@/store";
// @type
import { User, LoginResult, reducerState } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import {
  OK,
  LOGIN_STATUS,
  LOGIN_TOKENS,
  server,
  secretAuth,
  LOGIN_STATUS_V2,
  LOGIN_TOKENS_V2,
} from "@/constants";
// @utils
import { httpClient } from "@/utils";

const MySwal = withReactContent(Swal);

const initialValues: reducerState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isResult: [],
  errorMessage: "",
};

const auth_headers = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    // "Content-type": "application/json",
    "content-type": "multipart/form-data",
    authorization: "Basic " + encode(secretAuth),
  },
};

export const isLoggedIn = () => {
  const loginStatus = localStorage.getItem(LOGIN_STATUS_V2);
  return loginStatus === OK;
};

export const isLogout = (navigate: any) => {
  return Swal.fire({
    title: "ยืนยันออกจากระบบ",
    text: "คุณต้องการออกจากระบบ ใช่หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่",
    cancelButtonText: "ไม่",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem(LOGIN_STATUS);
      localStorage.removeItem(LOGIN_TOKENS);
      localStorage.removeItem(LOGIN_STATUS_V2);
      localStorage.removeItem(LOGIN_TOKENS_V2);

      navigate("/login");
    }
  });
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ user, navigate }: { user: User; navigate: any }, thunkAPI) => {
    try {
      const response = await httpClient.post<LoginResult>(
        `${server.BACKOFFICE_URL_V1}/authenticate`,
        user,
        auth_headers
      );
      let data = await response.data;

      MySwal.fire({
        title: "<p>กำลังประมวลผล ...</p>",
        didOpen: () => {
          MySwal.showLoading();
          if (data.result === OK) {
            setTimeout(() => {
              MySwal.hideLoading();
              const message = "เข้าสู่ระบบ สำเร็จ";
              MySwal.fire({
                icon: "success",
                title: message,
                showConfirmButton: false,
                timer: 1500,
              });
              localStorage.setItem(LOGIN_STATUS_V2, OK);
              localStorage.setItem(LOGIN_TOKENS_V2, data.data);
              navigate("/home");
              return data;
            }, 1000);
          } else {
            setTimeout(() => {
              MySwal.hideLoading();
              let message = "ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง";
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

const loginSlice = createSlice({
  name: "user",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, _action) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(loginUser.pending, (state, _action) => {
      state.isFetching = true;
    });
  },
});

// export const {} = loginSlice.actions;
export const loginSelector = (store: RootState) => store.loginReducer;
export default loginSlice.reducer;
