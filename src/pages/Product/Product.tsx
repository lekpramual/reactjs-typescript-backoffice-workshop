import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// @form
import { Formik, Form, Field } from "formik";
// @mui
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Breadcrumbs,
  Button,
} from "@mui/material";

// @type
import { PhoneSearch } from "@/types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function Product() {
  const navigate = useNavigate();

  // คอลัมข้อมูลการแสดง
  const dataValue = [
    {
      id: 1,
      name: "INV65090001",
      name1: "รอ 0032.102/97",
      depName: "C65080001",
      numberNo: "7440-001-0001/1308",
      dateCreated: "ศูนย์คอมพิวเตอร์/-",
      typeName: "คอมพิวเตอร์",
      companyName: "เครื่องคอมพิวเตอร์ สำหรับสำนักงาน จอขนาด 21.5 นิ้ว",
      status: 1,
      statusName: "ใช้การได้",
    },
    {
      id: 2,
      name: "INV65090001",
      name1: "รอ 0032.102/97",
      depName: "C65080002",
      numberNo: "-",
      dateCreated: "ศูนย์คอมพิวเตอร์/-",
      typeName: "คอมพิวเตอร์",
      companyName: "เครื่องคอมพิวเตอร์ สำหรับสำนักงาน จอขนาด 21.5 นิ้ว",
      status: 2,
      statusName: "ยกเลิกใช้งาน",
    },
  ];

  const dataColumns = [
    {
      headerName: "เลขที่ใบรับ",
      field: "name",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Link
          to={`/app3/equipment/view?id=${value}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
      ),
    },
    {
      headerName: "เลขทะเบียน",
      field: "depName",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Link
          to={`/app3/product/view?id=${value}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
      ),
    },
    {
      headerName: "เลขที่บันทึก",
      field: "name1",
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
      headerName: "เลขครุภัณฑ์",
      field: "numberNo",
      flex: 1,
      minWidth: 164,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ประเภทพัสดุ",
      field: "typeName",
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
      headerName: "รายการอุปกรณ์",
      field: "companyName",
      flex: 1,
      minWidth: 364,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px] " noWrap>
          {value}
        </Typography>
      ),
    },
    {
      headerName: "หน่วยงาน",
      field: "dateCreated",
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
    {
      headerName: "สถานะ",
      field: "statusName",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Typography
          variant="body1"
          className={
            row.status === 1
              ? "text-[14px] text-green-500"
              : "text-[14px] text-red-500"
          }
        >
          {value}
        </Typography>
      ),
    },
    {
      headerName: "จัดการ",
      field: ".",
      // flex: 1,
      width: 96,
      sortable: false,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName: "text-center bg-[#36474f] text-[#fff] text-[14px] ",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          <Tooltip title="ดูข้อมูล">
            <IconButton
              aria-label="view"
              size="small"
              onClick={() => {
                navigate("/app3/product/view?id=" + row.depName);
              }}
            >
              <VisibilityTwoToneIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>

          <Tooltip title="แก้ไขข้อมูล">
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => {
                console.log(row.id);
                // navigate("/stock/edit/" + row.id);
                navigate("/app3/product/edit?id=" + row.depName);
              }}
            >
              <EditTwoToneIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const initialValues: PhoneSearch = {
    keyword: "",
    type: 0,
    disposition: "ALL",
    dstchannel: "ALL",
    start: new Date(),
    end: new Date(),
  };

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

  const showFormSearch = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
    resetForm,
    values,
  }: any) => {
    return (
      <Form noValidate>
        <Grid container spacing={2} sx={{ pt: "6px", width: "100%" }}>
          <Grid xs={12} sm={6} md={3}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-keyword">
                เลขที่ใบรับ
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                startAdornment={
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เลขที่ใบรับ"
                size="small"
                placeholder="กรอก เลขที่ใบรับ"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} md={3.5}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-keyword">
                เลขทะเบียนครุภัณฑ์
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                startAdornment={
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เลขทะเบียนครุภัณฑ์"
                size="small"
                placeholder="กรอก เลขทะเบียนครุภัณฑ์"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} md={3.5}>
            <FormControl fullWidth sx={{ m: 1 }} size="small">
              <InputLabel id="select-small-type">ประเภทพัสดุ</InputLabel>
              <Field
                name="type"
                id="type"
                label="หน่วยงาน"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>ทั้งหมด</MenuItem>
                <MenuItem value={1}>เครื่องคอมพิวเตอร์</MenuItem>
                <MenuItem value={2}>ปริ้นเตอร์</MenuItem>
                <MenuItem value={3}>ปริ้นเตอร์</MenuItem>
                <MenuItem value={4}>ทีวี</MenuItem>
                <MenuItem value={5}>อื่นๅ</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <FormControl fullWidth sx={{ m: 1 }} size="small">
              <Stack direction="row" className="text-center ">
                <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="bg-[#36474f] text-[#fff] hover:text-[#fce805] mr-1 "
                >
                  <SearchIcon /> ค้นหา
                </Button>

                <Tooltip title="โหลดข้อมูล">
                  <IconButton
                    onClick={() => {
                      resetForm();
                    }}
                    size="small"
                    className="bg-[#36474f] text-[#fff] hover:text-[#fce805]"
                  >
                    <RefreshIcon color="inherit" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </FormControl>
          </Grid>
          {/* <Grid xs={12} md={4}>
                  <FormControl fullWidth sx={{ m: 1 }} size="small">
                    <InputLabel id="select-small-type">หน่วยงาน</InputLabel>
                    <Field
                      name="type"
                      id="type"
                      label="หน่วยงาน"
                      component={CustomizedSelectForFormik}
                    >
                      <MenuItem value={0}>ทั้งหมด</MenuItem>
                      <MenuItem value={1}>ศูนย์คอมพิวเตอร์</MenuItem>
                    </Field>
                  </FormControl>
                </Grid> */}
        </Grid>
      </Form>
    );
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" className="mb-1">
        <Typography
          color="text.primary"
          variant="subtitle2"
          component={Link}
          to="/app3/dashboard"
        >
          หน้าแรก
        </Typography>

        <Typography color="text.primary" variant="subtitle2">
          รายการอุปกรณ์
        </Typography>
      </Breadcrumbs>

      <Paper
        // 936 "100%"
        sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden", mb: "8px" }}
      >
        <Formik
          validate={(values) => {
            let errors: any = {};

            return errors;
          }}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            // moment(valuse.end).format("MM/dd/yyyy");
            // dispatch(loginUser({ user: values, navigate: navigate }));
            // dispatch(phoneSearch({ phone: values, navigate: navigate }));
            setSubmitting(false);
          }}
        >
          {(props) => showFormSearch(props)}
        </Formik>
      </Paper>

      <Paper
        sx={{
          maxWidth: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          className="h-[40px]"
        >
          <Toolbar className="pl-2 pr-2">
            <Grid container alignItems="center">
              <Grid xs={12}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{
                    display: "flex",
                    alignContent: "center",
                  }}
                >
                  <NoteAltTwoToneIcon /> รายการอุปกรณ์
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <BoxDataGrid>
          <DataGrid
            rowHeight={36}
            headerHeight={36}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              backgroundColor: "white",
              margin: "auto",
              overflow: "hidden",
              minHeight: 450,
              "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
                {
                  color: "#fff",
                  opacity: 0.5,
                },
            }}
            rows={dataValue ? dataValue : []}
            // rows={[]}
            columns={dataColumns}
            pageSize={20}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[20]}
            disableColumnMenu={true}
            // loading={hosxpReducer.isFetching}
            getRowId={(row) =>
              // parseInt(row.kskloginname) + Math.random() * (100 - 1)
              row.id
            }
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>
    </Box>
  );
}
