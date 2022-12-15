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

// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
// @seletor
import { productSelector } from "@/store/slices/productSlice";
import ProductFormSearch from "@/pages/Product/ProductFormSearch";

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

  useEffect(() => {}, []);

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
              dispatch(addSelectTransfer(ids));

              // if (selection.length > 1) {
              //   const selectionSet = new Set(selectionModel);
              //   const result = selection.filter((s) => !selectionSet.has(s));

              //   setSelectionModel(result);
              // } else {
              //   setSelectionModel(selection);
              // }
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
            dispatch(addTransfer(selectedRows));
            confirm(false);
          }}
        >
          <DoneTwoToneIcon />
          ตกลง
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
