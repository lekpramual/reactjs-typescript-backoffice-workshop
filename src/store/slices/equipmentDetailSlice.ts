import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
import { encode } from "base-64";
// @type
import { dataResult, EquipmentSearch, reducerState } from "@/types";
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

// LOADDING : Delay Loadding
const loadding = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
// POST : Create New Data Equipment Detail
export const equipmentDetailAdd = createAsyncThunk(
  "equipmentdetail/add",
  async ({ formData }: { formData: any }, thunkAPI) => {
    try {
      const { data: res } = await axios.post<dataResult>(
        `${server.BACKOFFICE_URL_V1}/equipmentdetail`,
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
              const message = "บันทึกข้อมูล สำเร็จ";
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
      //   const message = "บันทึกรับอุปกรณ์ สำเร็จ";
      //   MySwal.fire({
      //     icon: "success",
      //     title: message,
      //     showConfirmButton: false,
      //     timer: 1000,
      //   });
      //   return data.data;
      //   // setTimeout(() => {
      //   //   const message = "บันทึกรับอุปกรณ์ สำเร็จ";
      //   //   MySwal.fire({
      //   //     icon: "success",
      //   //     title: message,
      //   //     showConfirmButton: false,
      //   //     timer: 1000,
      //   //   });
      //   //   return data.data;
      //   // }, 1000);
      // } else {
      //   let message = "บันทึกรับอุปกรณ์ ผิดพลาด";
      //   MySwal.fire({
      //     icon: "warning",
      //     title: message,
      //     showConfirmButton: false,
      //   });
      //   return thunkAPI.rejectWithValue(data.message);
      //   // setTimeout(() => {
      //   //   let message = "ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง";
      //   //   MySwal.fire({
      //   //     icon: "warning",
      //   //     title: message,
      //   //     showConfirmButton: false,
      //   //   });
      //   //   return thunkAPI.rejectWithValue(data.message);
      //   // }, 1000);
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
// PUT : Delete Equipment Detail By ID
export const equipmentDetailUpdate = createAsyncThunk(
  "equipmentdetail/update",
  async ({ formData, id }: { formData: any; id: number }, thunkAPI) => {
    try {
      const { data: res } = await axios.put(
        `${server.BACKOFFICE_URL_V1}/equipmentdetail?id=${id}`,
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
              const message = "ปรับปรุงข้อมูล สำเร็จ";
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
              let message = "ผิดพลาดกรุณา ตรวจสอบ";
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
      //   MySwal.fire({
      //     title: "<p>กำลังประมวลผล ...</p>",
      //     didOpen: () => {
      //       MySwal.showLoading();
      //       if (data.result === OK) {
      //         setTimeout(() => {
      //           MySwal.hideLoading();
      //           const message = "บันทึกรับอุปกรณ์ สำเร็จ";
      //           MySwal.fire({
      //             icon: "success",
      //             title: message,
      //             showConfirmButton: false,
      //             timer: 1000,
      //           });
      //           return data.data;
      //         }, 1000);
      //       } else {
      //         setTimeout(() => {
      //           MySwal.hideLoading();
      //           let message = "ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง";
      //           MySwal.fire({
      //             icon: "warning",
      //             title: message,
      //             showConfirmButton: false,
      //           });
      //           return thunkAPI.rejectWithValue(data.message);
      //         }, 1000);
      //       }
      //     },
      //   });
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
// GET : Search Equipment Detail All
export const equipmentDetailAll = createAsyncThunk(
  "equipmentdetail/all",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const response = await axios.get<dataResult>(
        `${server.BACKOFFICE_URL_V1}/equipmentdetails?id=${id}`,
        header_get
      );
      let data = await response.data;
      if (data.result === OK) {
        // console.log(data.data);
        await loadding(1 * 1000);
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
// GET : Search Equipment Detail By Keyword
export const equipmentDetailSearch = createAsyncThunk(
  "equipment/search",
  async (
    { search, navigate }: { search: EquipmentSearch; navigate: any },
    thunkAPI
  ) => {
    try {
      let no = search.no;
      let title = search.title;
      let depart = search.depart["state"];

      const { data: res } = await axios.get<dataResult>(
        `${server.BACKOFFICE_URL_V1}/equipments?q=""${
          no !== "" && `&no=${no}`
        }${title !== "" && `&title=${title}`}${
          depart !== "" && `&depart=${depart}`
        }`,
        header_get
      );

      let data = res;

      if (data.result === OK) {
        await loadding(1 * 1000);
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
// GET : Search Equipment Detail By ID
export const equipmentDetailSearchById = createAsyncThunk(
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
// DELTE : Equipment Detail By ID
export const equipmentDetailDeleteById = createAsyncThunk(
  "equipmentdetail/deletehbyId",
  async ({ search }: { search: any }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.delete(
        `${server.BACKOFFICE_URL_V1}/equipmentdetail?id=${id}`,
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
// GET : Search Equipment Detail By ID V2
export const equipmentSearchByIdV2 = createAsyncThunk(
  "equipment/searchbyIdV2",
  async ({ search }: { search: string }, thunkAPI) => {
    try {
      let id = search;
      const { data: res } = await axios.get<dataResult>(
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

const equipmentDetailSlice = createSlice({
  name: "equipmentdetail",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(equipmentDetailAdd.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      //   state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentDetailAdd.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentDetailAdd.pending, (state, _action) => {
      state.isFetching = true;
    });
    builder.addCase(equipmentDetailUpdate.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      //   state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentDetailUpdate.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentDetailUpdate.pending, (state, _action) => {
      state.isFetching = true;
    });

    builder.addCase(equipmentDetailAll.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentDetailAll.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentDetailAll.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(equipmentDetailSearch.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentDetailSearch.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentDetailSearch.pending, (state, action) => {
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
    builder.addCase(equipmentSearchByIdV2.pending, (state, _action) => {
      state.isFetching = true;
    });
    builder.addCase(equipmentDetailDeleteById.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      // state.isResult = action.payload;
      return state;
    });
    builder.addCase(equipmentDetailDeleteById.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.isResult = [];
      state.errorMessage = action.payload as string;
    });
    builder.addCase(equipmentDetailDeleteById.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

// export const {} = loginSlice.actions;
export const equipmentDetailSelector = (store: RootState) =>
  store.equipmentDetailReducer;
export default equipmentDetailSlice.reducer;
