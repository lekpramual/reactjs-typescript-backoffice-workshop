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

// @day
import moment from "moment";
// @type
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// @icons
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import RestartAltTwoToneIcon from "@mui/icons-material/RestartAltTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Tooltip from "@mui/material/Tooltip";
// @icons
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";

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
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @redux
import { useSelector, useDispatch } from "react-redux";
import {
  departmentSelector,
  departmentAll,
} from "@/store/slices/departmentSlice";
import {
  transferSelector,
  addTransfer,
  resetTransfer,
  deleteTransfer,
  transferAdd,
} from "@/store/slices/transferSlice";

import { companySelector, companyAll } from "@/store/slices/companySlice";
import {
  documentCreate,
  documentSelector,
  documentSearchById,
  documentUpdateById,
} from "@/store/slices/documentSlice";
import {
  equipmentCartSelector,
  addEquipmentCartEdit,
  resetEquipmentCartEdit,
  deleteEquipmentCart,
  resetEquipmentCart,
} from "@/store/slices/equipmentCartSlice";

// @component cart

import { equipmentAdd } from "../../store/slices/equipmentSlice";

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

interface FilmOptionType {
  inputValue?: string;
  label: string;
  value?: number;
}

const filter = createFilterOptions<FilmOptionType>();

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function DocumentEdit() {
  const formRef = useRef<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [total, setTotal] = React.useState(0);
  const [openDialogCreate, setOpenDialogCreate] =
    React.useState<boolean>(false);

  const departmentReducer = useSelector(departmentSelector);
  const companyReducer = useSelector(companySelector);

  const equipmentCartReducer = useSelector(equipmentCartSelector);
  const transferReducer = useSelector(transferSelector);
  const documentReducer = useSelector(documentSelector);

  let query = useQuery();
  let id = query.get("id") || "";

  const initialCreateValues: any = {
    document_no: "",
    document_depart: {
      label: "--เลือกหน่วยงานที่บันทึก--",
      value: 0,
    }, // หน่วยงาน *

    document_title: "", // เรื่องที่บันทึก
    document_no_txt: "", // เลขที่หนังสือ
    document_date: new Date(), // วันที่บันทึก
    document_note: "", // รายละเอียด
    document_file: "-", // ไฟล์อัปโหลด
  };

  const initialEditValues = (values) => {
    let initailObj = initialCreateValues;
    if (values) {
      values.map((res) => {
        initailObj["document_no"] = res.document_no;
        initailObj["document_depart"] = {
          label: res.document_depart_name,
          value: res.document_depart,
        }; // หน่วยงาน *
        initailObj["document_title"] = res.document_title; // เรื่องที่บันทึก
        initailObj["document_no_txt"] = res.document_no_txt; // ผู้บันทึกข้อความ
        initailObj["document_date"] = res.document_date; // วันที่บันทึก
        initailObj["document_note"] = res.document_note; // รายละเอียด
        initailObj["document_file"] = res.document_file; // ไฟล์อัปโหลด
        return initailObj;
      });
    }
    return initailObj;
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  const reverseArrayInPlace = (departNew, productObj) => {
    return productObj.map((item) => {
      return {
        product_id: `${item.product_id}`,
        transfer_detail_default_depart: `${item.product_depart}`,
        transfer_detail_new_depart: `${departNew.value}`,
      };
    });
  };

  function optionNewDeparts() {
    const departs = [{ label: "--เลือกหน่วยงานที่บันทึก--", value: 0 }];
    if (departmentReducer.isResult) {
      departmentReducer.isResult.map((i, index) => {
        return departs.push({
          label: `(${i.CCID}) - ${i.dept_name}`,
          value: i.dept_id,
        });
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
          <Grid item lg={12} md={12} xs={12}>
            <FormControl
              fullWidth
              size="small"
              required
              error={errors.document_title && touched.document_title && true}
            >
              <InputLabel htmlFor="document_title">เรื่องที่บันทึก</InputLabel>
              <Field
                as={OutlinedInput}
                id="document_title"
                name="document_title"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เรื่องที่บันทึก"
                size="small"
                placeholder="กรอก เรื่องที่บันทึก"
              />
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl
              fullWidth
              size="small"
              error={errors.document_depart && touched.document_depart && true}
            >
              <Autocomplete
                value={values.document_depart}
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
                    setFieldValue("document_depart", newValue);
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
                renderInput={(params) => (
                  <Field
                    required
                    sx={{ input: { marginTop: "-3px" } }}
                    {...params}
                    name="document_depart"
                    id="document_depart"
                    label={"ที่เก็บใหม่"}
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
              fullWidth
              size="small"
              required
              error={errors.document_no_txt && touched.document_no_txt && true}
            >
              <InputLabel id="document_no_txt">เลขที่หนังสือ</InputLabel>
              <Field
                as={OutlinedInput}
                id="document_no_txt"
                name="document_no_txt"
                label="เลขที่หนังสือ"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="กรอก เลขที่หนังสือ"
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
                  label="วันที่บันทึก"
                  inputFormat="dd/MM/yyyy"
                  value={values.document_date}
                  onChange={(newValue: Date | null) => {
                    setFieldValue("document_date", newValue, true);
                  }}
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      name="document_date"
                      {...params}
                      size="small"
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item lg={12} md={12} xs={12}>
            <Field
              id="document_note"
              name="document_note"
              size="small"
              placeholder="รายละเอียดเพิ่มเติม"
              component={TextareaAutosize}
              minRows={2}
              style={{ width: "100%" }}
              onChange={(e) => {
                setFieldValue("document_note", e.target.value);
              }}
              value={values.document_note}
            />
            {/* <FormControl fullWidth size="small">
              <InputLabel htmlFor="document_note">รายละเอียด</InputLabel>
              <Field
                as={OutlinedInput}
                id="document_note"
                name="document_note"
                size="small"
                label="รายละเอียด"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="รายละเอียดเพิ่มเติม"
              />
            </FormControl> */}
          </Grid>
          <Grid item lg={12} md={12} xs={12} sx={{ mb: 1 }}>
            <Box sx={{ flexDirection: "row" }}>
              <Button variant="contained" component="label" size="small">
                <AttachFileTwoToneIcon /> แนบไฟล์
                <Input
                  hidden
                  accept="application/pdf"
                  multiple
                  type="file"
                  name="document_file"
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
    } else if (values.document_file !== "-") {
      return (
        <a
          href={`${server.BACKOFFICE_URL_File}/${values.document_file}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2"
        >
          <Typography variant="body2" component={"b"} className="ml-2">
            {values.document_file}
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
    dispatch(documentSearchById({ search: id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {}, [documentReducer.isResultView]);

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
          รายการเอกสาร
        </Typography>

        <Typography color="text.primary" variant="subtitle2">
          {documentReducer.isResultView
            ? documentReducer.isResultView.map((row) => row.document_no)
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
                  <AppRegistrationTwoToneIcon /> ปรับปรุงรายการ
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

            if (values.document_depart === null) errors.document_depart = " ";

            if (!values.document_depart.value) {
              errors.document_depart = " ";
            }

            if (values.document_depart.value === 0) {
              errors.document_depart = " ";
            }

            if (!values.document_title)
              errors.document_title = "กรอกเรื่องที่บันทึก";

            if (!values.document_no_txt)
              errors.document_no_txt = "กรอกเลขที่หนังสือ";

            return errors;
          }}
          enableReinitialize
          initialValues={
            documentReducer.isResultView
              ? initialEditValues(documentReducer.isResultView)
              : initialCreateValues
          }
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("document_no", values.document_no);
            formData.append("document_no_txt", values.document_no_txt);
            formData.append("document_title", values.document_title);
            formData.append("document_depart", values.document_depart.value);
            if (values.file) {
              formData.append("document_file", values.file);
            } else {
              formData.append("document_file", values.document_file);
            }
            formData.append(
              "document_date",
              moment(values.document_date).format("YYYY-MM-DD")
            );
            formData.append("document_note", values.document_note);

            // บันทึกข้อมูล
            dispatch(documentUpdateById({ formData: formData, id: id }));
            resetForm();
            setSubmitting(false);
          }}
        >
          {(props) => showFormCreate(props)}
        </Formik>
      </Paper>

      {/* ปุ่ม: บันทึกโอนย้ายอุปกรณ์  */}
      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={6} className="text-right" item>
          <Button
            variant="contained"
            color="error"
            className="w-[128px] "
            onClick={() => resetForm()}
          >
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
            ปรับปรุง
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
