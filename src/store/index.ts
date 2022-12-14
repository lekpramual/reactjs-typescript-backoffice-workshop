import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import carReducer from "@/store/slices/carSlice";
import loginReducer from "@/store/slices/loginSlice";
import phoneReducer from "@/store/slices/phoneSlice";
import hosxpReducer from "@/store/slices/hosxpSlice";
import numberReducer from "@/store/slices/numberSlice";
import equipmentReducer from "@/store/slices/equipmentSlice";
import companyReducer from "@/store/slices/companySlice";
import departmentReducer from "@/store/slices/departmentSlice";
import categoryReducer from "@/store/slices/categorySlice";
import equipmentCartReducer from "@/store/slices/equipmentCartSlice";
import equipmentDetailReducer from "@/store/slices/equipmentDetailSlice";
import productReducer from "@/store/slices/productSlice";
import transferReducer from "@/store/slices/transferSlice";
import transferDetailReducer from "@/store/slices/transferDetailSlice";
import documentReducer from "@/store/slices/documentSlice";
import transferDetailCartReducer from "@/store/slices/transferDetailCartSlice";

const reducer = {
  loginReducer,
  phoneReducer,
  hosxpReducer,
  numberReducer,
  carReducer,
  equipmentReducer,
  companyReducer,
  departmentReducer,
  categoryReducer,
  equipmentCartReducer,
  equipmentDetailReducer,
  productReducer,
  transferReducer,
  transferDetailReducer,
  documentReducer,
  transferDetailCartReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
