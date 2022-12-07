export interface BasicTransferDetail {
  transfer_detail_id: number;
}

export interface TransferDetail extends BasicTransferDetail {
  transfer_id: string;
  transfer_no: string;
  transfer_detail_default_depart: string;
  transfer_detail_default_depart_name: string;
  transfer_detail_new_depart: string;
  transfer_detail_default_new_name: string;
  product_id: string;
  product_no: string;
  product_inventory_number: string;
  product_title: string;
}

export interface TransferDetailResult {
  result: string;
  message: string;
  data: TransferDetail[];
}

export type TransferDetailId = { id: string };
