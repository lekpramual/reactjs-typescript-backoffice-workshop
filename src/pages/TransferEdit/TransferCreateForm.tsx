import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// @mui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// @icons
import Typography from "@mui/material/Typography";

import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";

import { BootstrapDialog } from "@/styles/AppStyle";
// @styles
import { makeStyles } from "@mui/styles";
import { BoxDataGridModel } from "@/styles/AppStyle";
// @redux
import { useSelector, useDispatch } from "react-redux";

import { categorySelector, categoryAll } from "@/store/slices/categorySlice";
import {
  transferSelector,
  addTransfer,
  addSelectTransfer,
} from "@/store/slices/transferSlice";

import {
  addTransferDetailEdit,
  transferDetailDeleteById,
} from "@/store/slices/transferDetailSlice";

// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
// @seletor
import { productSelector } from "@/store/slices/productSlice";
import ProductFormSearch from "@/pages/Product/ProductFormSearch";
import { addTransferDetailCartEdit } from "../../store/slices/transferDetailCartSlice";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  "& .MuiDataGrid-root .MuiDataGrid-root": {
    borderRadius: "0px",
    heigh: "510px",
  },
  root: {
    "& .MuiDataGrid": {
      borderRadius: "0px",
      heigh: "510px",
    },
    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
      {
        display: "none",
      },
  },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle
      sx={{
        mt: 0,
        p: "2px",
        height: 40,
        backgroundColor: "#36474f",
        color: "#fff",
        textAlign: "center",
      }}
      {...other}
    >
      {children}
    </DialogTitle>
  );
};

export default function TransferCreateForm({ show, confirm }: any) {
  const classes = useStyles();
  const navigate = useNavigate();
  const formRefProduct = useRef<any>();

  const dispatch = useDispatch<any>();

  const productReducer = useSelector(productSelector);
  const transferReducer = useSelector(transferSelector);

  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<any>([]);

  const dataColumns = [
    {
      headerName: "เลขที่ใบรับ",
      field: "equipment_no",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "เลขครุภัณฑ์",
      field: "product_inventory_number",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value !== null && value !== "" ? value : "-"}
        </Typography>
      ),
    },
    {
      headerName: "เลขที่บันทึก",
      field: "equipment_no_txt",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "หมวดหมู่",
      field: "category_name",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "หน่วยงานเดิม",
      field: "dept_name",
      flex: 1,
      minWidth: 256,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]" noWrap>
          {value}
        </Typography>
      ),
    },
  ];

  function selectRowReducer() {
    const selectRows: any = [];
    // const departs = [{ label: "--เลือกหน่วยงานที่บันทึก--", value: 0 }];
    if (transferReducer.isResult) {
      transferReducer.isResult.map((row) => {
        return selectRows.push(row.product_id);
      });
      return selectRows;
    } else {
      return selectRows;
    }
  }

  function reverseArrayInPlaceProduct(dataProduct, dataTransfer) {
    console.log(dataProduct);
    console.log(dataTransfer);
    const products: any[] = [];
    if (dataProduct.length > 0) {
      const newDataTransfer = dataTransfer ? dataTransfer[0] : [];
      let row_transfer_id: any = newDataTransfer.transfer_id;
      let row_transfer_no: any = newDataTransfer.transfer_no;
      let row_transfer_detail_id: any = Date.now().toString();
      let row_transfer_detail_new_depart: any = newDataTransfer.transfer_depart;
      let row_transfer_detail_default_new_name: any =
        newDataTransfer.transfer_depart_name;

      dataProduct.map((row) => {
        let row_product_id: any = row.product_id;
        let row_product_no: any = row.product_no;
        let row_product_inventory_number: any = row.product_inventory_number;
        let row_product_title: any = row.product_title;
        let row_transfer_detail_default_depart: any = row.product_depart;
        let row_transfer_detail_default_depart_name: any = row.dept_name;

        // *"transfer_id": 6,
        // *"transfer_no": "TRA65120006",
        // *"transfer_detail_id": 15,
        // *"transfer_detail_default_depart": 362,
        // *"transfer_detail_default_depart_name": "งานบริการ Hos-XP",
        // *"transfer_detail_new_depart": 328,
        // *"transfer_detail_default_new_name": "งานรังสีรักษา",
        // "product_id": 26,
        // "product_no": "P65120026",
        // "product_inventory_number": "7440-009-0002/137",
        // "product_title": "Brother Scanner ADS-2200"

        return products.push({
          transfer_id: row_transfer_id,
          transfer_no: row_transfer_no,
          transfer_detail_id: row_transfer_detail_id,
          transfer_detail_default_depart: row_transfer_detail_default_depart,
          transfer_detail_default_depart_name:
            row_transfer_detail_default_depart_name,
          transfer_detail_new_depart: row_transfer_detail_new_depart,
          transfer_detail_default_new_name:
            row_transfer_detail_default_new_name,
          product_id: row_product_id,
          product_no: row_product_no,
          product_inventory_number: row_product_inventory_number,
          product_title: row_product_title,
        });
      });
      return products;
    } else {
      return products;
    }
  }
  return (
    <BootstrapDialog
      fullScreen
      // maxWidth="lg"
      open={show}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <BootstrapDialogTitle
        id="alert-dialog-slide-title"
        onClose={() => confirm(false)}
      >
        <Typography variant="subtitle1" component={"b"}>
          เพิ่มรายการอุปกรณ์
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <ProductFormSearch />

        <BoxDataGridModel>
          <DataGrid
            className={classes.root}
            rowHeight={28}
            headerHeight={28}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              minHeight: 350,
            }}
            rows={productReducer.isResult ? productReducer.isResult : []}
            // rows={[]}
            columns={dataColumns}
            pageSize={15}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[15]}
            disableColumnMenu={true}
            // loading={hosxpReducer.isFetching}
            getRowId={(row) =>
              // parseInt(row.kskloginname) + Math.random() * (100 - 1)
              row.product_id
            }
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
              },
            }}
            checkboxSelection
            selectionModel={
              transferReducer.isResultEdit ? transferReducer.isResultEdit : []
            }
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const productData = productReducer.isResult
                ? productReducer.isResult
                : [];
              const selectedRows = productData.filter((row) =>
                selectedIDs.has(row.product_id)
              );
              setSelectedRows(selectedRows);
              setSelectionModel(ids);
              // console.log(selectedRows);
              // const transferDetail = selectedRows[0];
              // if (transferDetail) {
              //   console.log(transferDetail);
              // }
              dispatch(addSelectTransfer(ids));
            }}
          />
        </BoxDataGridModel>
      </DialogContent>

      <DialogActions
        sx={{
          paddingRight: 24,
        }}
      >
        <Button
          onClick={() => {
            // setSelectedRows([]);
            // setSelectionModel([]);
            const selectedProduct = selectRowReducer();
            dispatch(addSelectTransfer(selectedProduct));
            // ปิด ฟอร์ม
            confirm(false);
          }}
          variant="contained"
          color="error"
          className="w-[96px] "
        >
          <CloseTwoToneIcon /> ปิด
        </Button>

        <Button
          variant="contained"
          color="success"
          className="w-[128px] "
          onClick={() => {
            console.log(selectedRows);

            const newSelectRows = reverseArrayInPlaceProduct(
              selectedRows,
              transferReducer.isResultView
            );

            console.log(newSelectRows);
            // dispatch(addTransferDetailCartEdit(newSelectRows));

            // confirm(false);
          }}
        >
          <DoneTwoToneIcon />
          ตกลง
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
