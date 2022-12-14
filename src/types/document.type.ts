export interface BasicDocument {
  document_id: number;
}

export interface Document extends BasicDocument {
  document_no: string; // เลขที่ทะเบียน
  document_no_txt: string; // เลขที่หนังสือ
  document_title: string; // เรื่อง
  document_depart: string; // หน่วยงาน
  document_file: string; // ไฟล์
  document_date: string; // วันที่
  document_note: string; // รายละเอียด
  document_created_at: string;
  document_updated_at: string;
}

export interface DocumentView {
  document_id: string;
  document_no: string;
  document_no_txt: string;
  document_title: string;
  document_depart: string;
  document_depart_name: string;
  document_file: string;
  document_date: string;
  document_note: string;
  document_created_at: string;
  document_updated_at: string;
}

export type DocumentId = { id: string };
