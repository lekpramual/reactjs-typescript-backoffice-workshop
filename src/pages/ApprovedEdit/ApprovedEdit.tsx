import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Breadcrumbs,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// @type
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// @icons
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// @styles
import { styled } from "@mui/material/styles";

// constats
import { server } from "@/constants";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import thLocale from "date-fns/locale/th";
import { BoxDataGrid } from "@/styles/AppStyle";
import { NumberWithCommas, CustomNoRowsOverlay } from "@/utils";
import { DataGrid } from "@mui/x-data-grid";
// @redux
import { useSelector, useDispatch } from "react-redux";
import {
  departmentSelector,
  departmentAll,
} from "@/store/slices/departmentSlice";

import { companySelector, companyAll } from "@/store/slices/companySlice";
import { categoryAll } from "@/store/slices/categorySlice";

import {
  equipmentApproved,
  equipmentSelector,
  equipmentSearchById,
} from "@/store/slices/equipmentSlice";

import {
  equipmentDetailSelector,
  equipmentDetailAll,
} from "@/store/slices/equipmentDetailSlice";

const MySwal = withReactContent(Swal);

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

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface FilmOptionType {
  inputValue?: string;
  label: string;
  value?: number;
}

const filter = createFilterOptions<FilmOptionType>();

export default function ApprovedEdit() {
  const formRef = useRef<any>();
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch<any>();
  const [total, setTotal] = React.useState(0);

  const departmentReducer = useSelector(departmentSelector);
  const companyReducer = useSelector(companySelector);
  const equipmentReducer = useSelector(equipmentSelector);
  const equipmentDetailReducer = useSelector(equipmentDetailSelector);

  const dataColumns = [
    {
      headerName: "ชื่อรายการ",
      field: "equipment_detail_title",
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
      field: "category_name",
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
      field: "equipment_detail_material_type",
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
      field: "equipment_detail_qty",
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
      field: "equipment_detail_price",
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
      field: "equipment_detail_price_total",
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
  ];

  const initialEquipmentValues: any = {
    id: "",
    equipment_no: "",
    equipment_depart: {
      label: "--เลือกหน่วยงานที่บันทึก--",
      value: 0,
    }, // หน่วยงาน *
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

  const initialEquipmentEditValues = (values) => {
    // ตั้งค่าข้อมูลพื้นฐาน ฟอร์ม
    let initailObj = initialEquipmentValues;
    if (values) {
      // มีการแก้ไข้ข้อมูล
      values.map((res) => {
        initailObj["id"] = res.equipment_id;
        initailObj["equipment_no"] = res.equipment_no;
        initailObj["equipment_depart"] = {
          label: res.dept_name,
          value: res.equipment_depart,
        };
        initailObj["equipment_no_txt"] = res.equipment_no_txt;
        initailObj["equipment_type"] = res.equipment_type;
        initailObj["equipment_title"] = res.equipment_title;
        initailObj["equipment_member"] = res.equipment_member;
        initailObj["equipment_member_get"] = res.equipment_member_get;
        initailObj["equipment_date"] = res.equipment_date;
        initailObj["equipment_date_get"] = res.equipment_date_get;
        initailObj["equipment_company"] = res.equipment_company;
        initailObj["equipment_note"] = res.equipment_note;
        initailObj["equipment_file"] = res.equipment_file;
        return initailObj;
      });
    }
    return initailObj;
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

  function optionNewDeparts() {
    const departs = [{ label: "--เลือกหน่วยงานที่บันทึก--", value: 0 }];
    if (departmentReducer.isResult) {
      departmentReducer.isResult.map((i) => {
        return departs.push({ value: i.dept_id, label: i.dept_name });
      });
      return departs;
    } else {
      return departs;
    }
  }

  const departOption = optionNewDeparts();

  const showFormCreate = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
    resetForm,
    errors,
    touched,
    values,
  }: any) => {
    return (
      <Form noValidate key={"EquipmentCreate"}>
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
            <FormControl
              fullWidth
              size="small"
              error={
                errors.equipment_depart && touched.equipment_depart && true
              }
            >
              <Autocomplete
                value={values.equipment_depart}
                noOptionsText={"ไม่มีข้อมูล"}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    console.log("if");
                    // timeout to avoid instant validation of the dialog's form.
                    // setTimeout(() => {
                    //   toggleOpen(true);
                    //   setDialogValue({
                    //     title: newValue,
                    //     year: "",
                    //   });
                    // });
                  } else if (newValue && newValue.inputValue) {
                    console.log("else if");
                    // toggleOpen(true);
                    // setDialogValue({
                    //   title: newValue.inputValue,
                    //   year: "",
                    // });
                  } else {
                    setFieldValue("equipment_depart", newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  // const filtered = options.filter(row => row.label === params.inputValue)
                  const filtered = filter(options, params);
                  // if (params.inputValue !== "") {
                  //   filtered.push({
                  //     inputValue: params.inputValue,
                  //     title: `Add "${params.inputValue}"`,
                  //   });
                  // }
                  return filtered;
                }}
                id="free-solo-dialog-demo"
                options={departOption}
                getOptionLabel={(option) => {
                  // e.g value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.label;
                }}
                isOptionEqualToValue={(option: any, value: any) =>
                  option.value === value.value && option.label === value.label
                }
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => (
                  <li {...props}>{option.label}</li>
                )}
                disabled
                renderInput={(params) => (
                  <Field
                    required
                    sx={{ input: { marginTop: "-3px" } }}
                    {...params}
                    name="equipment_depart"
                    id="equipment_depart"
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
            <FormControl
              required
              error={
                errors.equipment_no_txt && touched.equipment_no_txt && true
              }
              fullWidth
              size="small"
            >
              <InputLabel htmlFor="equipment_no_txt">เลขที่บันทึก</InputLabel>
              <Field
                disabled
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
            <FormControl
              disabled
              fullWidth
              size="small"
              required
              error={errors.equipment_type && touched.equipment_type && true}
            >
              <InputLabel id="equipment_type">ประเภทการซื้อ</InputLabel>
              <Field
                disabled
                name="equipment_type"
                id="equipment_type"
                label="ประเภทการซื้อ"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={"empty"} key="empty">
                  --เลือกประเภทการซื้อ--
                </MenuItem>
                <MenuItem value={"ซื้อในแผน"} key="ซื้อในแผน">
                  ซื้อในแผน
                </MenuItem>
                <MenuItem value={"ซื้อนอกแผน"} key="ซื้อนอกแผน">
                  ซื้อนอกแผน
                </MenuItem>
                <MenuItem value={"ซื้อทดแทน"} key="ซื้อทดแทน">
                  ซื้อทดแทน
                </MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl
              fullWidth
              size="small"
              required
              error={errors.equipment_title && touched.equipment_title && true}
            >
              <InputLabel htmlFor="equipment_title">เรื่องที่บันทึก</InputLabel>
              <Field
                disabled
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
            <FormControl
              fullWidth
              size="small"
              required
              error={
                errors.equipment_member && touched.equipment_member && true
              }
            >
              <InputLabel id="equipment_member">ผู้บันทึกข้อความ</InputLabel>
              <Field
                disabled
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
            <FormControl
              disabled
              fullWidth
              size="small"
              required
              error={
                errors.equipment_member_get &&
                touched.equipment_member_get &&
                true
              }
            >
              <InputLabel id="equipment_member_get">ผู้รับสินค้า</InputLabel>
              <Field
                disabled
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
                  disabled
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
                  disabled
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
            <FormControl
              disabled
              fullWidth
              size="small"
              required
              error={
                errors.equipment_company && touched.equipment_company && true
              }
            >
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
                <MenuItem value={"empty"}>--เลือกบริษัท--</MenuItem>
                {companyReducer.isResult
                  ? companyReducer.isResult.map((row) => {
                      return (
                        <MenuItem value={row.company_id} key={row.company_id}>
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
                disabled
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
            <Box sx={{ flexDirection: "row" }}>
              <Button
                variant="contained"
                component="label"
                size="small"
                disabled
              >
                <AttachFileTwoToneIcon /> แนบไฟล์
                <Input
                  hidden
                  accept="application/pdf"
                  multiple
                  type="file"
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
              </Button>
              {showPreviewImage(values)}
            </Box>

            {/* <label htmlFor="icon-button-file" className="w-[64px] h-[64px]">
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
            </label> */}

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

  const showPreviewImage = (values) => {
    if (values.file_obj) {
      return (
        <a
          href={values.file_obj}
          target="_blank"
          rel="noreferrer"
          className="ml-2"
        >
          <Typography variant="body2" component={"b"} className="ml-2">
            {values.file.name}
          </Typography>
        </a>
      );
    } else if (values.equipment_file !== "-") {
      return (
        <a
          href={`${server.BACKOFFICE_URL_File}/${values.equipment_file}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2"
        >
          <Typography variant="body2" component={"b"} className="ml-2">
            {values.equipment_file}
          </Typography>
        </a>
      );
    } else {
      return (
        <Typography variant="body2" component={"b"} className="ml-2">
          เลือกไฟล์ PDF
        </Typography>
      );
    }
  };

  useEffect(() => {
    dispatch(departmentAll());
    dispatch(companyAll());
    dispatch(categoryAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let id = query.get("id") || "";
    dispatch(equipmentSearchById({ search: id }));
    dispatch(equipmentDetailAll({ search: id }));
  }, [dispatch, query]);
  useEffect(() => {}, [equipmentDetailReducer.isResult]);

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
          to="/app3/approved"
        >
          ตรวจรับอุปกรณ์
        </Typography>

        <Typography color="text.primary" variant="subtitle2">
          {equipmentReducer.isResultEdit
            ? equipmentReducer.isResultEdit.map((data) => data.equipment_no)
            : ""}
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
          validate={(values) => {
            let errors: any = {};

            if (values.equipment_depart === null) errors.equipment_depart = " ";

            if (!values.equipment_depart.value) {
              errors.equipment_depart = " ";
            }

            if (values.equipment_depart.value === 0) {
              errors.equipment_depart = " ";
            }

            if (!values.equipment_no_txt)
              errors.equipment_no_txt = "กรอกเลขที่บันทึก";

            if (!values.equipment_title)
              errors.equipment_title = "กรอกเรื่องที่บันทึก";

            if (!values.equipment_member)
              errors.equipment_member = "กรอกผู้บันทึกข้อความ";

            if (!values.equipment_member_get)
              errors.equipment_member_get = "กรอกผู้รับสินค้า";

            if (values.equipment_type === "empty")
              errors.equipment_type = "เลือกประเภทการซื้อ";

            if (values.equipment_company === "empty")
              errors.equipment_company = "เลือกซื้ิอจากบริษัท";
            return errors;
          }}
          // initialValues={initialEquipmentValues}
          enableReinitialize
          initialValues={
            equipmentReducer.isResultEdit
              ? initialEquipmentEditValues(equipmentReducer.isResultEdit)
              : initialEquipmentValues
          }
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
                  // sx={{
                  //   display: "flex",
                  //   alignContent: "center",
                  // }}
                >
                  <AppRegistrationTwoToneIcon /> รายการอุปกรณ์
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <BoxDataGrid key={`dataList-EquipmentDetail`}>
          <DataGrid
            rowHeight={28}
            headerHeight={28}
            autoHeight
            components={{
              Footer: CustomFooterTotal,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            componentsProps={{
              footer: { total },
            }}
            onStateChange={(state) => {
              const total = equipmentDetailReducer.isResult
                ? equipmentDetailReducer.isResult
                    .map((item) => item.equipment_detail_price_total)
                    .reduce((a, b) => a + b, 0)
                : 0;
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
            rows={
              equipmentDetailReducer.isResult
                ? equipmentDetailReducer.isResult
                : []
            }
            // rows={[]}
            columns={dataColumns}
            pageSize={10}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[10]}
            disableColumnMenu={true}
            loading={equipmentDetailReducer.isFetching}
            getRowId={(row) => row.equipment_detail_id}
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>

      <Grid container spacing={2} alignItems="center" className="mt-2">
        <Grid xs={12} className="text-center">
          {equipmentReducer.isResultEdit ? (
            equipmentReducer.isResultEdit.map((data) => {
              if (data.equipment_status === "รับเข้า") {
                return (
                  <span>
                    <Button
                      sx={{
                        minWidth: "30px",
                      }}
                      variant="contained"
                      className="w-[256px] bg-green-500 hover:bg-green-600"
                      disabled
                    >
                      <CheckBoxTwoToneIcon /> ตรวจรับรายการอุปกรณ์เรียบร้อย
                    </Button>
                  </span>
                );
              } else {
                return (
                  <Button
                    variant="contained"
                    className="w-[256px] bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      const equipment_no: any = data.equipment_no
                        ? data.equipment_no
                        : null;
                      const equipment_id: any = data.equipment_id
                        ? data.equipment_id
                        : null;
                      const equipment_depart: any = data.equipment_depart
                        ? data.equipment_depart
                        : null;
                      Swal.fire({
                        title: "ตรวจรับอุปกรณ์ ใช่ หรือ ไม่?",
                        text: `คุณต้องการยืนยันตรวจรับอุปกรณ์ : ${equipment_no}`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "ใช่, ต้องการ!",
                        cancelButtonText: "ไม่, ยกเลิก!",
                        reverseButtons: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          if (
                            equipment_id === null &&
                            equipment_depart === null
                          ) {
                            MySwal.fire({
                              icon: "warning",
                              title: "ไม่สามารถตรวจรับอุปกรณ์ได้กรุณาตรวจสอบ",
                              showConfirmButton: false,
                            });
                          } else {
                            let formData = new FormData();
                            const newArrayProduct =
                              equipmentDetailReducer.isResult
                                ? equipmentDetailReducer.isResult
                                : [];
                            formData.append(
                              "equipment_detail",
                              JSON.stringify(newArrayProduct)
                            );
                            formData.append(
                              "equipment_depart",
                              equipment_depart
                            );
                            formData.append("equipment_id", equipment_id);
                            dispatch(
                              equipmentApproved({
                                formData: formData,
                                navigate: navigate,
                              })
                            );

                            dispatch(
                              equipmentSearchById({ search: equipment_id })
                            );
                            // dispatch(equipmentDetailAll({ search: equipment_id }));
                          }
                        }
                      });
                    }}
                  >
                    <CheckBoxTwoToneIcon /> ตรวจรับรายการอุปกรณ์
                  </Button>
                );
              }
            })
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
