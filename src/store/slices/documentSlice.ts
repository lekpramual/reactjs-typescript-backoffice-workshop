import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @constants
import { secretAuth, OK, server } from "@/constants";
import axios from "axios";
import { reducerStateNew, dataResult } from "@/types";

const MySwal = withReactContent(Swal);

const initialState: reducerStateNew = {
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

// เพิ่มข้อมูล
export const documentCreate = createAsyncThunk(
  "document/create",
  async (
    { formData, navigate }: { formData: any; navigate: any },
    thunkAPI
  ) => {
    try {
      const { data: res } = await axios.post(
        `${server.BACKOFFICE_URL_V1}/document`,
        formData,
        header_get
      );

      let data = res;

      MySwal.fire({
        title: "<p>กำลังประมวลผล ...</p>",
        didOpen: () => {
          MySwal.showLoading();
          if (data.result === OK) {
            setTimeout(() => {
              MySwal.hideLoading();
              const message = "สร้างใหม่ สำเร็จ";
              MySwal.fire({
                icon: "success",
                title: message,
                showConfirmButton: false,
                timer: 1500,
              });
              return data.data;
            }, 1000);
          } else {
            setTimeout(() => {
              MySwal.hideLoading();
              let message = "ผิดพลาด กรุณาตรวจสอบ";
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
      // if (data.result === OK) {
      //   // console.log(data.data);
      //   // navigate("/phone");
      //   await wait(1 * 1000);
      //   return data.data;
      // } else {
      //   // console.log("Error Else :", data);
      //   return thunkAPI.rejectWithValue({
      //     message: "Failed to fetch phone.",
      //   });
      // }
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

// โหลดข้อมูลทั้งหมด
export const documentAll = createAsyncThunk(
  "document/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<dataResult>(
        `${server.BACKOFFICE_URL_V1}/documents`,
        header_get
      );
      let data = await response.data;
      if (data.result === OK) {
        // console.log(data.data);
        // await wait(1 * 1000);
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

export const documentSearch = createAsyncThunk(
  "document/search",
  async ({ keyword }: { keyword: string }, thunkAPI) => {
    try {
      if (keyword) {
        const response = await axios.get<dataResult>(
          `${server.BACKOFFICE_URL_V1}/documents`,
          header_get
        );
        let data = await response.data;
        if (data.result === OK) {
          let resultData = data.data;

          // let val = keyword.toLowerCase();
          // let matches = resultData.filter((v: any) =>
          //   v.num.toLowerCase().includes(val)
          // );
          // return matches;

          const lowercasedValue = keyword.toLowerCase().trim();
          const filteredData = resultData.filter((item: any) => {
            return Object.keys(item).some((key) =>
              item[key].toString().toLowerCase().includes(lowercasedValue)
            );
          });
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

// ค้นหาข้อมูล จากไอดี
export const documentSearchById = createAsyncThunk(
  "document/searchbyId",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.get(
        `${server.BACKOFFICE_URL_V1}/document?id=${id}`,
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
          message: "Failed to fetch document.",
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

// แก้ไขข้อมูลรายละเอียดใบรับอุปกรณ์
export const documentUpdateById = createAsyncThunk(
  "document/update",
  async ({ formData, id }: { formData: any; id: any }, thunkAPI) => {
    try {
      const { data: res } = await axios.put(
        `${server.BACKOFFICE_URL_V1}/document?id=${id}`,
        formData,
        header_get
      );
      let data = res;
      if (data.result === OK) {
        const message = "ปรับปรุงรายการ สำเร็จ";
        MySwal.fire({
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 1000,
        });
        return data.data;
      } else {
        let message = "ปรับปรุงรายการ ผิดพลาด";
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

const documentSlice = createSlice({
  name: "document",
  // initialState: initialState,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(documentCreate.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(documentCreate.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(documentCreate.pending, (state, _action) => {
      state.isFetching = true;
    });

    builder.addCase(documentAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(documentAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(documentAll.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(documentSearchById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResultView = action.payload;
      return state;
    });
    builder.addCase(documentSearchById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResultView = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(documentSearchById.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(documentUpdateById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(documentUpdateById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(documentUpdateById.pending, (state, _action) => {
      state.isFetching = true;
    });

    // ค้นหา
    builder.addCase(documentSearch.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(documentSearch.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(documentSearch.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// Export all of the actions:
export const {} = documentSlice.actions;
export const documentSelector = (store: RootState) => store.documentReducer;
export default documentSlice.reducer;
