import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import carReducer from "@/store/slices/carSlice";
import loginReducer from "@/store/slices/loginSlice";
import phoneReducer from "@/store/slices/phoneSlice";
import hosxpReducer from "@/store/slices/hosxpSlice";
import numberReducer from "@/store/slices/numberSlice";

const reducer = {
  loginReducer,
  phoneReducer,
  hosxpReducer,
  numberReducer,
  carReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
