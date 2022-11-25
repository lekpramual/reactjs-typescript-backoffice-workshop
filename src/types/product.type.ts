export interface BasicTypeProduct {
  id: number;
}
export interface ProductType extends BasicTypeProduct {
  product_id: string;
  product_no: string;
  product_title: string;
  product_note: string;
  product_inventory_number: string;
  product_status: string;
  product_category: string;
  product_depart: string;
  product_equipment: string;
  product_create_at: string;
  product_update_at: string;
  equipment_no: string;
  equipment_no_txt: string;
  category_name: string;
  dept_name: string;
}

export interface ProductTypeResult {
  result: string;
  message: string;
  data: ProductType[];
}

export type ProductTypeSearch = {
  no_txt: string;
  no: string;
  category: number;
};
export type ProductTypeId = { id: string };
