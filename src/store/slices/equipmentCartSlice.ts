import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
// @type
import { reducerState } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const initialState: any = {
  numberCart: 0,
  Carts: [],
};

const equipmentCartSlice = createSlice({
  name: "equipmentCart",
  initialState: initialState,
  reducers: {
    getEquipmentCart: (state) => {
      return { ...state };
    },
    addEquipmentCart: (state: any, action: any) => {
      if (state.numberCart === 0) {
        let cart: any = {
          equipment_detail_title: action.payload.equipment_detail_title,
          equipment_detail_category: action.payload.equipment_detail_category,
          equipment_detail_material_type:
            action.payload.equipment_detail_material_type,
          equipment_detail_qty: action.payload.equipment_detail_qty,
          equipment_detail_price: action.payload.equipment_detail_price,
          equipment_detail_price_total:
            action.payload.equipment_detail_qty *
            action.payload.equipment_detail_price,
          equipment_detail_note: action.payload.equipment_detail_note,
        };
        state.Carts.push(cart);
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    },
    saveEquipmentCart: (state: any, action: any) => {
      console.log(action);
      if (state.numberCart === 0) {
        let cart: any = {
          equipment_detail_title: action.payload.equipment_detail_title,
          equipment_detail_category: action.payload.equipment_detail_category,
          equipment_detail_material_type:
            action.payload.equipment_detail_material_type,
          equipment_detail_qty: action.payload.equipment_detail_qty,
          equipment_detail_price: action.payload.equipment_detail_price,
          equipment_detail_price_total:
            action.payload.equipment_detail_qty *
            action.payload.equipment_detail_price,
          equipment_detail_note: action.payload.equipment_detail_note,
        };
        state.Carts.push(cart);
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    },
  },
  extraReducers: (builder) => {},
});

// Export all of the actions:
export const { getEquipmentCart } = equipmentCartSlice.actions;
export const equipmentCartSelector = (store: RootState) =>
  store.equipmentCartReducer;
export default equipmentCartSlice.reducer;
