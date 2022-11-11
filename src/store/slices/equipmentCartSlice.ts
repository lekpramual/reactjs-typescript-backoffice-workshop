import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
// @type
import { reducerState } from "@/types";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// We can safely reuse
// types created earlier:
type TodoId = string;

// let cart: any = {
//   equipment_detail_title: action.payload.equipment_detail_title,
//   equipment_detail_category: action.payload.equipment_detail_category,
//   equipment_detail_material_type:
//     action.payload.equipment_detail_material_type,
//   equipment_detail_qty: action.payload.equipment_detail_qty,
//   equipment_detail_price: action.payload.equipment_detail_price,
//   // equipment_detail_price_total:
//   //   action.payload.equipment_detail_qty *
//   //   action.payload.equipment_detail_price,
//   equipment_detail_note: action.payload.equipment_detail_note,
// };

type Todo = {
  id: TodoId;
  equipment_detail_title: string;
  equipment_detail_category: string;
  equipment_detail_category_name: string;
  equipment_detail_material_type: string;
  equipment_detail_qty: number;
  equipment_detail_price: number;
  equipment_detail_price_total: number;
  equipment_detail_note: string;
};

type TodosState = {
  list: Todo[];
};

const initialState: TodosState = {
  list: [],
};

const equipmentCartSlice = createSlice({
  name: "equipmentCart",
  // initialState: initialState,
  initialState,
  reducers: {
    addEquipmentCart: (state: TodosState, action: PayloadAction<Todo>) => {
      state.list.push(action.payload);
    },
    deleteEquipmentCart: (state: TodosState, action: PayloadAction<TodoId>) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {},
});

// Export all of the actions:
export const { addEquipmentCart, deleteEquipmentCart } =
  equipmentCartSlice.actions;
export const equipmentCartSelector = (store: RootState) =>
  store.equipmentCartReducer;
export default equipmentCartSlice.reducer;
