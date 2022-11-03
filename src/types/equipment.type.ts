interface EquipmentDetail {
  equipment_id: string;
  equipment_no: string;
  equipment_no_txt: string;
  equipment_depart: string;
  equipment_type: string;
  equipment_title: string;
  equipment_member: string;
  equipment_member_get: string;
  equipment_date: string;
  equipment_date_get: string;
  equipment_company: string;
  equipment_note: string;
  equipment_file: string;
  equipment_created_at: string;
  equipment_updated_at: string;
  dept_name: string;
  company_name: string;
}

export interface EquipmentResult {
  result: string;
  message: string;
  data: EquipmentDetail[];
}

export interface EquipmentSearch {
  no: string;
  title: string;
  depart: string;
}
