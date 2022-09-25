import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// @form
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
// @mui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  Breadcrumbs,
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
import CloseIcon from "@mui/icons-material/Close";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import RestartAltTwoToneIcon from "@mui/icons-material/RestartAltTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// @styles
import { styled } from "@mui/material/styles";

import thLocale from "date-fns/locale/th";
import { BootstrapDialog, BoxDataGrid } from "@/styles/AppStyle";
import { NumberWithCommas, CustomNoRowsOverlay } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
const localeMap = {
  th: thLocale,
};

const Input = styled("input")({
  display: "none",
});

interface CustomFooterTotalProps {
  total: number;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function CustomFooterTotal(props: CustomFooterTotalProps) {
  return (
    <Box
      sx={{
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
      }}
    >
      <Typography variant="subtitle2" component={"b"}>
        รวม : {NumberWithCommas(props.total)}
      </Typography>
    </Box>
  );
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, height: 48 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function EquipmentCreate() {
  const navigate = useNavigate();
  const [total, setTotal] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openDialogCreate, setOpenDialogCreate] =
    React.useState<boolean>(false);
  // คอลัมข้อมูลการแสดง
  const dataValue = [
    {
      id: 1,
      name: "เครื่องคอมพิวเตอร์ สำหรับสำนักงาน จอขนาด 21.5 นิ้ว",
      groupName: "คอมพิวเตอร์",
      typeName: "พัสดุ/มีเลขครุภัณฑ์",
      qty: 2,
      price: 14480,
      priceTotal: 28960,
    },
  ];

  const dataColumns = [
    // {
    //   headerName: "#",
    //   field: "id",
    //   flex: 1,
    //   minWidth: 32,
    //   headerClassName:
    //     "bg-[#36474f] text-[#fff] text-[14px]   fill-[#fff] ",
    //   sortable: false,
    //   renderCell: ({ value }: any) => (
    //     <Typography variant="body1" className="text-[14px]">
    //       {value}
    //     </Typography>
    //   ),
    // },
    {
      headerName: "ชื่อรายการ",
      field: "name",
      flex: 1,
      minWidth: 364,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
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
      minWidth: 156,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ชนิดวัสดุ/ครุภัณฑ์",
      field: "typeName",
      flex: 1,
      minWidth: 156,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "จำนวน",
      field: "qty",
      type: "number",
      flex: 1,
      minWidth: 64,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
    {
      headerName: "ราคา/หน่วย",
      field: "price",
      flex: 1,
      minWidth: 96,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
    {
      headerName: "ราคารวม",
      field: "priceTotal",
      flex: 1,
      minWidth: 96,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
    {
      headerName: "จัดการ",
      field: ".",
      flex: 1,
      minWidth: 96,
      sortable: false,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName: "text-center bg-[#36474f] text-[#fff] text-[14px] ",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => {
              console.log(row.id);
              setOpenDialogCreate(true);
              // navigate("/stock/edit/" + row.id);
            }}
          >
            <EditTwoToneIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              console.log(row);
              setOpenDialog(true);
            }}
          >
            <DeleteTwoToneIcon fontSize="inherit" />
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

  const showFormCreate = ({
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
              <InputLabel id="select-small-type">ผู้บันทึกข้อความ</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="ผู้บันทึกข้อความ"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="กรอก ผู้บันทึกข้อความ"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ผู้รับสินค้า</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="ผู้บันทึก"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="กรอก ผู้รับสินค้า"
              />
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} xs={6}>
            <FormControl fullWidth size="small">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={localeMap["th"]}
              >
                <DatePicker
                  label="วันที่บันทึกข้อความ"
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

  const showFormProductCreate = ({
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
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="billnumber">ชื่อรายการ</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="ชื่อรายการ"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="กรอก ชื่อรายการ"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">หมวดหมู่</InputLabel>
              <Field
                name="type"
                id="type"
                label="หมวดหมู่"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>อื่นๆ</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">
                ชนิดวัสดุ/ครุภัณฑ์{" "}
              </InputLabel>
              <Field
                name="type"
                id="type"
                label="ชนิดวัสดุ/ครุภัณฑ์ "
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>พัสดุ มีเลขครุภัณฑ์</MenuItem>
                <MenuItem value={1}>วัสดุ ไม่มีเลขครุภัณฑ์</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                จำนวน
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                type="number"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                label="จำนวน"
                size="small"
                placeholder="กรอก จำนวน"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ราคาต่อหน่วย</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="ราคาต่อหน่วย"
                size="small"
                type="number"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="กรอก ราคาต่อหน่วย"
              />
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
        </Grid>
      </Form>
    );
  };

  // ฟังก์ชั่น ยืนยันการลบข้อมูล
  const handleDeleteConfirm = () => {
    // ปิด ป๊อปอัพ
    setOpenDialog(false);
  };

  const showDialog = () => {
    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {/* <img
            src={`${imageUrl}/images/${
              selectedProduct.image
            }?dummy=${Math.random()}`}
            style={{ width: 100, borderRadius: "5%" }}
          /> */}
          <br />
          ยืนยันการลบ รายการอุปกรณ์ : จอ 42 นิ้ว
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            คุณไม่สามารถกู้คืนอุปกรณ์ที่ถูกลบได้.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showDialogCreate = () => {
    return (
      <BootstrapDialog
        open={openDialogCreate}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <BootstrapDialogTitle
          id="alert-dialog-slide-title"
          onClose={() => setOpenDialogCreate(false)}
        >
          <Typography variant="subtitle1" component={"b"}>
            เพิ่มรายการอุปกรณ์
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Formik
            validate={(values) => {
              let errors: any = {};

              return errors;
            }}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {(props) => showFormProductCreate(props)}
          </Formik>
        </DialogContent>
        <DialogActions
          sx={{
            paddingRight: 24,
          }}
        >
          <Button variant="contained" color="success" className="w-[128px] ">
            <SaveTwoToneIcon /> บันทึก
          </Button>
        </DialogActions>
      </BootstrapDialog>
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

        <Typography
          color="text.primary"
          variant="subtitle2"
          component={Link}
          to="/app3/equipment"
        >
          รายการอุปกรณ์
        </Typography>

        <Typography color="text.primary" variant="subtitle2">
          เพิ่มรายการอุปกรณ์
        </Typography>
      </Breadcrumbs>

      <Paper
        sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden", mb: 2 }}
        square
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          className="h-[40px]"
        >
          <Toolbar className="pl-5 pr-0">
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle2" component="span">
                  วิธีการได้มา
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mr: 1, mb: 1 }}
                  // color="success"
                  className="w-[96px] bg-cyan-500 hover:bg-cyan-600"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <ArrowBackTwoToneIcon /> ย้อนกลับ
                </Button>
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
            setSubmitting(false);
          }}
        >
          {(props) => showFormCreate(props)}
        </Formik>
      </Paper>

      <Paper
        sx={{
          maxWidth: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
        square
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          className="h-[40px]"
        >
          <Toolbar className="pl-5 pr-2">
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle2" component="span">
                  รายการอุปกรณ์
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mr: 1, mb: 1 }}
                  color="success"
                  className="w-[96px]"
                  onClick={() => {
                    setOpenDialogCreate(true);
                  }}
                >
                  <AddTwoToneIcon /> เพิ่ม
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <BoxDataGrid>
          <DataGrid
            rowHeight={26}
            headerHeight={26}
            autoHeight
            components={{
              Footer: CustomFooterTotal,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            componentsProps={{
              footer: { total },
            }}
            onStateChange={(state) => {
              const total = dataValue
                .map((item) => item.priceTotal)
                .reduce((a, b) => a + b, 0);
              // console.log(total);
              setTotal(total);
            }}
            sx={{
              backgroundColor: "white",
              height: 250,
              width: "100%",
              margin: "auto",
              overflow: "hidden",
              "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
                {
                  color: "#fff",
                  opacity: 0.5,
                },
            }}
            rows={dataValue ? dataValue : []}
            // rows={[]}
            columns={dataColumns}
            pageSize={10}
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
                  `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>
      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={6} className="text-right" item>
          <Button variant="contained" color="success" className="w-[128px] ">
            <SaveTwoToneIcon /> บันทึก
          </Button>
        </Grid>
        <Grid xs={6} item>
          <Button variant="contained" color="error" className="w-[128px] ">
            <RestartAltTwoToneIcon /> ยกเลิก
          </Button>
        </Grid>
      </Grid>

      {showDialog()}
      {showDialogCreate()}
    </Box>
  );
}
