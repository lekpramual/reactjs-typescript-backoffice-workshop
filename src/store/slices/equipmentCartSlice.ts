import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// @store PayloadAction
import { RootState } from "@/store";
// We can safely reuse
// types created earlier:
type equipmentCartId = string;

type EquipmentCart = {
  id: equipmentCartId;
  equipment_detail_title: string;
  equipment_detail_category: string;
  equipment_detail_category_name: string;
  equipment_detail_material_type: string;
  equipment_detail_qty: number;
  equipment_detail_price: number;
  equipment_detail_price_total: number;
  equipment_detail_note: string;
};

type EquipmentCartState = {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isResult: EquipmentCart[];
  isResultEdit: EquipmentCart[];
  errorMessage: string;
};

const initialState: EquipmentCartState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  isResult: [],
  isResultEdit: [],
  errorMessage: "",
};

const equipmentCartSlice = createSlice({
  name: "equipmentCart",
  // initialState: initialState,
  initialState,
  reducers: {
    addEquipmentCartEdit: (
      state: EquipmentCartState,
      action: PayloadAction<EquipmentCart>
    ) => {
      console.log(action);
      state.isResultEdit.push(action.payload);
    },

    resetEquipmentCartEdit: (state: EquipmentCartState) => {
      state.isResultEdit = [];
    },

    updateEquipmentCartEdit: (
      state: EquipmentCartState,
      action: PayloadAction<EquipmentCart>
    ) => {
      const index = state.isResult.findIndex(
        ({ id }) => id === action.payload.id
      );

      state.isResult[index].equipment_detail_title =
        action.payload.equipment_detail_title;

      state.isResult[index].equipment_detail_category =
        action.payload.equipment_detail_category;

      state.isResult[index].equipment_detail_category_name =
        action.payload.equipment_detail_category_name;

      state.isResult[index].equipment_detail_material_type =
        action.payload.equipment_detail_material_type;

      state.isResult[index].equipment_detail_qty =
        action.payload.equipment_detail_qty;

      state.isResult[index].equipment_detail_price =
        action.payload.equipment_detail_price;

      state.isResult[index].equipment_detail_price_total =
        action.payload.equipment_detail_qty *
        action.payload.equipment_detail_price;

      state.isResult[index].equipment_detail_note =
        action.payload.equipment_detail_note;
    },
    addEquipmentCart: (
      state: EquipmentCartState,
      action: PayloadAction<EquipmentCart>
    ) => {
      state.isResult.push(action.payload);
    },

    deleteEquipmentCart: (
      state: EquipmentCartState,
      action: PayloadAction<equipmentCartId>
    ) => {
      state.isResult = state.isResult.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {},
});

// Export all of the actions:
export const {
  addEquipmentCart,
  addEquipmentCartEdit,
  resetEquipmentCartEdit,
  updateEquipmentCartEdit,
  deleteEquipmentCart,
} = equipmentCartSlice.actions;
export const equipmentCartSelector = (store: RootState) =>
  store.equipmentCartReducer;
export default equipmentCartSlice.reducer;
