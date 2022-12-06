export interface BasicTransfer {
  Transfer_id: number;
}

export interface Transfer extends BasicTransfer {
  transfer_no: string;
  transfer_title: string;
  transfer_member: string;
  transfer_date: string;
  transfer_note: string;
  transfer_status: string;
  transfer_file: string;
  transfer_depart: string;
  transfer_depart_name: string;
  transfer_created_at: string;
  transfer_updated_at: string;
}

export interface TransferResult {
  result: string;
  message: string;
  data: Transfer[];
}

export type TransferId = { id: string };
