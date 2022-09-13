import * as React from "react";
// @router
import { Link } from "react-router-dom";
// @form
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
// @mui
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

// @type
import { PhoneSearch } from "@/types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// @styles
import { styled } from "@mui/material/styles";

import thLocale from "date-fns/locale/th";
import { BoxDataGrid } from "@/styles/AppStyle";
import { numberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
const localeMap = {
  th: thLocale,
};

const Input = styled("input")({
  display: "none",
});

export default function EquipmentAdd() {
  // คอลัมข้อมูลการแสดง
  const equipmentValue = [
    {
      id: 1,
      name: "จอ 42 นิ้ว",
      groupName: "อื่นๆ",
    },
  ];
  const hosxpColumns = [
    {
      headerName: "ลำดับ",
      field: "id",
      flex: 1,
      headerClassName:
        "bg-[#36474f] text-[#fff] text-[14px] h-[36px]  fill-[#fff] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ชื่อรายการ",
      field: "name",
      flex: 1,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "หมวดหมู่",
      field: "groupName",
      flex: 1,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ACTION",
      field: ".",
      width: 120,
      sortable: false,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          {/* <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              navigate("/stock/edit/" + row.id);
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton> */}
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              console.log(row);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
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

  const showFormAdd = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
    resetForm,
    values,
  }: any) => {
    return (
      <Form noValidate>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            pt: "16px",
            px: "16px",
          }}
        >
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">หน่วยงานที่ซื้อ</InputLabel>
              <Field
                name="type"
                id="type"
                label="หน่วยงานที่ซื้อ"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>ศุนย์คอมพิวเตอร์</MenuItem>
                <MenuItem value={1}>เบอร์ - ต้นทาง</MenuItem>
                <MenuItem value={2}>เบอร์ - ปลายทาง</MenuItem>
                <MenuItem value={3}>หน่วยงาน - ต้นทาง</MenuItem>
                <MenuItem value={4}>หน่วยงาน - ปลายทาง</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="billnumber">เลขที่บันทึก</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="เลขที่บันทึก"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="รอ 0032.102/97"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ประเภทการซื้อ</InputLabel>
              <Field
                name="type"
                id="type"
                label="ประเภทการซื้อ"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>ซื้อตามแผน</MenuItem>
                <MenuItem value={1}>เบอร์ - ต้นทาง</MenuItem>
                <MenuItem value={2}>เบอร์ - ปลายทาง</MenuItem>
                <MenuItem value={3}>หน่วยงาน - ต้นทาง</MenuItem>
                <MenuItem value={4}>หน่วยงาน - ปลายทาง</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                เรื่องที่บันทึก
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เรื่องที่บันทึก"
                size="small"
                placeholder="ขออนุมัติซื้ออุปกรณ์ระบบคิวบริการผู้ป่วยนอก"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ผู้บันทึก</InputLabel>
              <Field
                name="type"
                id="type"
                label="ผู้บันทึก"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>นางสาวนันทนิจ มีสวัสดิ์</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ผู้รับสินค้า</InputLabel>
              <Field
                name="type"
                id="type"
                label="ผู้รับสินค้า"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>นายมนต์ชัย ศรีทอง</MenuItem>
              </Field>
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} xs={6}>
            <FormControl fullWidth size="small">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={localeMap["th"]}
              >
                <DatePicker
                  label="วันที่บันทึก"
                  inputFormat="dd/MM/yyyy"
                  value={values.start}
                  onChange={(newValue: Date | null) => {
                    setFieldValue("start", newValue, true);
                  }}
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      name="start"
                      {...params}
                      size="small"
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item lg={6} sm={6} xs={6}>
            <FormControl fullWidth size="small">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={localeMap["th"]}
              >
                <DatePicker
                  label="วันที่รับสินค้า"
                  inputFormat="dd/MM/yyyy"
                  value={values.start}
                  onChange={(newValue: Date | null) => {
                    setFieldValue("start", newValue, true);
                  }}
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      name="start"
                      {...params}
                      size="small"
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ซื้ิอจาก</InputLabel>
              <Field
                name="type"
                id="type"
                label="ซื้ิอจาก"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>บริษัท กรุงทองคอมพิวเตอร์ จำกัด</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                รายละเอียด
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                size="small"
                label="รายละเอียด"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="รายละเอียดเพิ่มเติม"
              />
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12} sx={{ mb: 1 }}>
            <label htmlFor="icon-button-file">
              <Input
                accept="application/pdf"
                type="file"
                id="icon-button-file"
                name="image"
                onChange={(e) => {
                  e.preventDefault();
                  console.log("click ...");
                  // setFieldValue("file", e.target.files[0]); // for upload
                  // setFieldValue(
                  //   "file_obj",
                  //   URL.createObjectURL(e.target.files[0])
                  // ); // for preview image
                }}
              />
              <Tooltip title="แนบไฟล์">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AttachFileTwoToneIcon
                    color="inherit"
                    sx={{ display: "block" }}
                  />{" "}
                </IconButton>
              </Tooltip>
            </label>
            {/* <FormControl size="small" sx={{ mb: 2 }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                <AttachFileTwoToneIcon /> แนบไฟล์
              </span>

              <Input
                accept="application/pdf"
                type="file"
                id="icon-button-file"
                name="image"
                onChange={(e) => {
                  e.preventDefault();
                  console.log("click ...");
                  // setFieldValue("file", e.target.files[0]); // for upload
                  // setFieldValue(
                  //   "file_obj",
                  //   URL.createObjectURL(e.target.files[0])
                  // ); // for preview image
                }}
              />
            </FormControl> */}
          </Grid>
        </Grid>
      </Form>
    );
  };

  return (
    <>
      <Paper
        sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden", mb: 2 }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle2" component="span">
                  วิธีการได้มา
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Formik
          validate={(values) => {
            let errors: any = {};

            return errors;
          }}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            // moment(valuse.end).format("MM/dd/yyyy");
            // dispatch(loginUser({ user: values, navigate: navigate }));

            setSubmitting(false);
          }}
        >
          {(props) => showFormAdd(props)}
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
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle2" component="span">
                  รายการอุปกรณ์
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mr: 1 }}
                  component={Link}
                  to="/app3/equipment/add"
                >
                  <AddTwoToneIcon /> เพิ่ม
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <BoxDataGrid>
          <DataGrid
            sx={{
              // border-top-left-radius
              backgroundColor: "white",
              height: "450px",
              margin: "auto",
              overflow: "hidden",
              "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
                {
                  color: "#fff",
                  opacity: 0.5,
                },
            }}
            rows={equipmentValue ? equipmentValue : []}
            columns={hosxpColumns}
            pageSize={10}
            rowHeight={36}
            headerHeight={36}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[10]}
            disableColumnMenu={true}
            // loading={hosxpReducer.isFetching}
            getRowId={(row) =>
              // parseInt(row.kskloginname) + Math.random() * (100 - 1)
              row.id
            }
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} ถึง ${to} จาก ${numberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>
    </>
  );
}
