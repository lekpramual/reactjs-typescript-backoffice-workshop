import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @type
import { EquipmentResult, EquipmentSearch, reducerStateNew } from "@/types";
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

// เพิ่มข้อมูล
export const equipmentAdd = createAsyncThunk(
  "equipment/add",
  async (
    { formData, navigate }: { formData: any; navigate: any },
    thunkAPI
  ) => {
    try {
      const { data: res } = await axios.post(
        `${server.BACKOFFICE_URL_V1}/equipment`,
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
              const message = "บันทึกรับอุปกรณ์ สำเร็จ";
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

// ตรวจรับอุปกรณ์
export const equipmentApproved = createAsyncThunk(
  "equipment/approved",
  async (
    { formData, navigate }: { formData: any; navigate: any },
    thunkAPI
  ) => {
    try {
      const { data: res } = await axios.post(
        `${server.BACKOFFICE_URL_V1}/equipment_approved`,
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
              const message = "ตรวจรับอุปกรณ์ สำเร็จ";
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
              let message = "ไม่สามารถตรวจรับอุปกรณ์ได้กรุณาตรวจสอบ";
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

export const equipmentUpdateById = createAsyncThunk(
  "equipment/update",
  async ({ formData, id }: { formData: any; id: any }, thunkAPI) => {
    try {
      const { data: res } = await axios.put(
        `${server.BACKOFFICE_URL_V1}/equipment?id=${id}`,
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
      let no = search.no || null;
      let title = search.title || null;
      let depart =
        search.depart !== null && search.depart["value"] !== 0
          ? search.depart["value"]
          : null;

      const urlSearch = `${server.BACKOFFICE_URL_V1}/equipments?no=${no}&title=${title}&depart=${depart}`;

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

// ลบข้อมูล จากไอดี
export const equipmentDeleteById = createAsyncThunk(
  "equipment/deletehbyId",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.delete(
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
        // await wait(1 * 1000);
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
    builder.addCase(equipmentAdd.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentAdd.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentAdd.pending, (state, _action) => {
      state.isFetching = true;
    });

    builder.addCase(equipmentApproved.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentApproved.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentApproved.pending, (state, _action) => {
      state.isFetching = true;
    });

    builder.addCase(equipmentUpdateById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      //   state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentUpdateById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentUpdateById.pending, (state, _action) => {
      state.isFetching = true;
    });
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
    builder.addCase(equipmentSearchById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResultView = action.payload;
      return state;
    });
    builder.addCase(equipmentSearchById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResultView = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentSearchById.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(equipmentDeleteById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      // state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentDeleteById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentDeleteById.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// export const {} = loginSlice.actions;
export const equipmentSelector = (store: RootState) => store.equipmentReducer;
export default equipmentSlice.reducer;
