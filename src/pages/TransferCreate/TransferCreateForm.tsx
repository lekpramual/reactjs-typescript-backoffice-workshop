import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// @form
import { Formik, Form, Field } from "formik";
// @mui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
// @type
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
// @icons
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";

import { BootstrapDialog } from "@/styles/AppStyle";
// @styles
import { makeStyles } from "@mui/styles";
import { BoxDataGridModel } from "@/styles/AppStyle";
// @redux
import { useSelector, useDispatch } from "react-redux";

import { categorySelector, categoryAll } from "@/store/slices/categorySlice";
import {
  equipmentCartSelector,
  addEquipmentCart,
  updateEquipmentCartEdit,
} from "@/store/slices/equipmentCartSlice";

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

  const categoryReducer = useSelector(categorySelector);
  const equipmentCartReducer = useSelector(equipmentCartSelector);
  const productReducer = useSelector(productSelector);

  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);

  const initialValues: any = {
    id: "",
    equipment_detail_title: "", // รายการ
    equipment_detail_category: 0, // หมวดหมู่รหัส *
    equipment_detail_category_name: "", // หมวดหมู่ชื่อ *
    equipment_detail_material_type: "empty", // ชนิดวัสดุ *
    equipment_detail_qty: "", // จำนวน
    equipment_detail_price: "", // ราคาต่อหน่วย
    equipment_detail_note: "", // รายละเอียด
  };

  const dataColumns = [
    {
      headerName: "เลขที่ใบรับ",
      field: "equipment_no",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Link
          to={`/app3/equipment/view?id=${row.product_equipment}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
      ),
    },
    {
      headerName: "เลขทะเบียน",
      field: "product_no",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Link
          to={`/app3/product/view?id=${row.product_id}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
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

  const CustomizedSelectForFormik = ({ children, form, field, label }: any) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    return (
      <Select
        label={label}
        name={name}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };

  const CustomizedSelectForFormikV2 = ({
    children,
    form,
    field,
    label,
  }: any) => {
    const { name, value } = field;
    const { setFieldValue } = form;
    return (
      <Select
        label={label}
        name={name}
        value={parseInt(value)}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };

  const handleProductSubmit = () => {
    if (formRefProduct.current) {
      formRefProduct.current.handleSubmit();
    }
  };

  const resetProductForm = () => {
    if (formRefProduct.current) {
      formRefProduct.current.resetForm();
    }
  };

  useEffect(() => {
    dispatch(categoryAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
            selectionModel={selectionModel}
            onSelectionModelChange={(selection) => {
              // const selectedIDs = new Set(ids);
              // const selectedRowData = productReducer.isResult.filter((row) =>
              //   selectedIDs.has(row.id.toString())
              // );
              setSelectionModel(selection);
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
            setSelectionModel([]);
            // ปิด ฟอร์ม
            confirm(false);
            // รีเซต ฟอร์ฒ
            resetProductForm();
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
            handleProductSubmit();
          }}
        >
          <DoneTwoToneIcon />
          ตกลง
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
