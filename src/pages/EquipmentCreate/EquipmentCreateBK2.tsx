import React, { useEffect, useRef } from "react";
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
  Autocomplete,
  Avatar,
} from "@mui/material";

// @type
import { PhoneSearch } from "@/types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// @icons
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import RestartAltTwoToneIcon from "@mui/icons-material/RestartAltTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import UploadFileSharpIcon from "@mui/icons-material/UploadFileSharp";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";

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

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// @styles
import { styled } from "@mui/material/styles";

// constats
import { server } from "@/constants";

import thLocale from "date-fns/locale/th";
import { BootstrapDialog, BoxDataGrid } from "@/styles/AppStyle";
import { NumberWithCommas, CustomNoRowsOverlay } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @redux
import { useSelector, useDispatch } from "react-redux";
import {
  departmentSelector,
  departmentAll,
} from "@/store/slices/departmentSlice";

import { companySelector, companyAll } from "@/store/slices/companySlice";

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

export default function EquipmentCreate() {
  const formRef = useRef<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [total, setTotal] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openDialogCreate, setOpenDialogCreate] =
    React.useState<boolean>(false);

  const departmentReducer = useSelector(departmentSelector);
  const companyReducer = useSelector(companySelector);

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

  const initialEquipmentValues: any = {
    equipment_depart: { name: "", id: null, state: "" }, // หน่วยงาน *
    equipment_no_txt: "", // เลขที่บันทึก
    equipment_type: "empty", // ประเภทการซื้อ *
    equipment_title: "", // เรื่องที่บันทึก
    equipment_member: "", // ผู้บันทึกข้อความ
    equipment_member_get: "", // ผู้รับสินค้า
    equipment_date: new Date(), // วันที่บันทึกข้อความ
    equipment_date_get: new Date(), // วันที่รับสินค้า
    equipment_company: "empty", // ซื้อจากบริษัท *
    equipment_note: "", // รายละเอียด *
    equipment_file: "-", // ไฟล์อัปโหลด *
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

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
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
              <Autocomplete
                noOptionsText={"ไม่มีข้อมูล"}
                disableListWrap
                size="small"
                options={
                  departmentReducer.isResult
                    ? departmentReducer.isResult.map((i, index) => {
                        return {
                          name: `(${i.CCID}) - ${i.dept_name}`,
                          id: index + 1,
                          state: i.dept_id,
                        };
                      })
                    : []
                }
                isOptionEqualToValue={(option: any, value: any) =>
                  option.state === value.state && option.id === value.id
                }
                getOptionLabel={(option) => `${option.name}`}
                onChange={(e, value) => {
                  setFieldValue(
                    "equipment_depart",
                    value !== null
                      ? value
                      : initialEquipmentValues.equipment_depart
                  );
                }}
                renderInput={(params) => (
                  <Field
                    sx={{ input: { marginTop: "-3px" } }}
                    {...params}
                    name="equipment_depart"
                    id="equipment_depart"
                    // margin="normal"
                    label={"หน่วยงานที่บันทึก"}
                    component={TextField}
                    size="small"
                    InputLabelProps={{
                      style: { marginTop: "-3px" },
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="equipment_no_txt">เลขที่บันทึก</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_no_txt"
                name="equipment_no_txt"
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
              <InputLabel id="equipment_type">ประเภทการซื้อ</InputLabel>
              <Field
                name="equipment_type"
                id="equipment_type"
                label="ประเภทการซื้อ"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={"empty"}>เลือกประเภทการซื้อ</MenuItem>
                <MenuItem value={"ซื้อในแผน"}>ซื้อในแผน</MenuItem>
                <MenuItem value={"ซื้อนอกแผน"}>ซื้อนอกแผน</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="equipment_title">เรื่องที่บันทึก</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_title"
                name="equipment_title"
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
              <InputLabel id="equipment_member">ผู้บันทึกข้อความ</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_member"
                name="equipment_member"
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
              <InputLabel id="equipment_member_get">ผู้รับสินค้า</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_member_get"
                name="equipment_member_get"
                label="ผู้รับสินค้า"
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
                  value={values.equipment_date}
                  onChange={(newValue: Date | null) => {
                    setFieldValue("equipment_date", newValue, true);
                  }}
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      name="equipment_date"
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
                  value={values.equipment_date_get}
                  onChange={(newValue: Date | null) => {
                    setFieldValue("equipment_date_get", newValue, true);
                  }}
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      name="equipment_date_get"
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
              <InputLabel id="equipment_company">ซื้ิอจากบริษัท</InputLabel>
              <Field
                sx={{ input: { marginTop: "-3px" } }}
                name="equipment_company"
                id="equipment_company"
                label="ซื้ิอจากบริษัท"
                component={CustomizedSelectForFormik}
                // placeholder="ซื้ิอจากบริษัท"
                InputLabelProps={{
                  style: { marginTop: "-3px" },
                }}
              >
                <MenuItem value={"empty"}>เลือกบริษัท</MenuItem>
                {companyReducer.isResult
                  ? companyReducer.isResult.map((row) => {
                      return (
                        <MenuItem value={row.company_id}>
                          {row.company_name}
                        </MenuItem>
                      );
                    })
                  : []}
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="equipment_note">รายละเอียด</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_note"
                name="equipment_note"
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
            <label htmlFor="icon-button-file" className="w-[64px] h-[64px]">
              {showPreviewImage(values)}
              <Input
                accept="application/pdf"
                type="file"
                id="icon-button-file"
                name="equipment_file"
                onChange={(e: any) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
              />
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
                <MenuItem value={0}>คอมพิวเตอร์</MenuItem>
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
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            color="error"
            className="w-[96px] "
          >
            <CloseTwoToneIcon /> ปิด
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="success"
            className="w-[96px] "
          >
            <DoneTwoToneIcon /> ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showDialogCreate = () => {
    return (
      <BootstrapDialog
        maxWidth="md"
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
            key={"formproductcreate"}
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
          <Button
            onClick={() => setOpenDialogCreate(false)}
            variant="contained"
            color="error"
            className="w-[96px] "
          >
            <CloseTwoToneIcon /> ปิด
          </Button>

          <Button variant="contained" color="success" className="w-[128px] ">
            <DoneTwoToneIcon />
            ตกลง
          </Button>
        </DialogActions>
      </BootstrapDialog>
    );
  };

  const showPreviewImage = (values) => {
    if (values.file_obj) {
      return (
        <>
          <Avatar
            variant="square"
            sx={{
              width: 64,
              height: 64,
              marginBottom: "5px",
            }}
          >
            <PictureAsPdfSharpIcon />
          </Avatar>
          <a href={values.file_obj} target="_blank" rel="noreferrer">
            {values.file.name}
          </a>
        </>
      );
    } else if (values.equipment_file !== "-") {
      return (
        <>
          <Avatar
            variant="square"
            sx={{
              width: 64,
              height: 64,
              marginBottom: "5px",
            }}
          >
            <PictureAsPdfSharpIcon />
          </Avatar>
          <a
            href={`${server.BACKOFFICE_URL_File}/${values.equipment_file}`}
            target="_blank"
            rel="noreferrer"
          >
            {values.equipment_file}
          </a>
        </>
      );
    } else {
      return (
        <Box
          sx={{
            width: 64,
            height: 64,
          }}
        >
          <Tooltip title="แนบไฟล์ PDF" className="w-[64px]">
            <Avatar
              variant="square"
              sx={{
                width: 64,
                height: 64,
                marginBottom: "5px",
              }}
            >
              <UploadFileSharpIcon />
            </Avatar>
          </Tooltip>
        </Box>
      );
    }
  };

  useEffect(() => {
    dispatch(departmentAll());
    dispatch(companyAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar className="pl-2 pr-2">
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{
                    display: "flex",
                    alignContent: "center",
                  }}
                >
                  <AppRegistrationTwoToneIcon /> วิธีการได้มา
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
                  <ArrowBackTwoToneIcon />
                  ย้อนกลับ
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Formik
          innerRef={formRef}
          key={"formcreate"}
          validate={(values) => {
            let errors: any = {};

            return errors;
          }}
          initialValues={initialEquipmentValues}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {(props) => showFormCreate(props)}
        </Formik>
      </Paper>

      {/* <Paper
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
          <Toolbar className="pl-2 pr-2">
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{
                    display: "flex",
                    alignContent: "center",
                  }}
                >
                  <AppRegistrationTwoToneIcon /> รายการอุปกรณ์
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
                  <AddTwoToneIcon />
                  เพิ่ม
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
      </Paper> */}

      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={6} className="text-right" item>
          <Button variant="contained" color="error" className="w-[128px] ">
            <RestartAltTwoToneIcon />
            ยกเลิก
          </Button>
        </Grid>
        <Grid xs={6} item>
          <Button
            variant="contained"
            color="success"
            className="w-[128px] "
            onClick={() => handleSubmit()}
          >
            <SaveTwoToneIcon />
            บันทึก
          </Button>
        </Grid>
      </Grid>

      {showDialog()}
      {showDialogCreate()}
    </Box>
  );
}
