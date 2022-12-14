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
import TextareaAutosize from "@mui/base/TextareaAutosize";
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

import Tooltip from "@mui/material/Tooltip";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
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
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @redux
import { useSelector, useDispatch } from "react-redux";
import {
  departmentSelector,
  departmentAll,
} from "@/store/slices/departmentSlice";

import { companySelector, companyAll } from "@/store/slices/companySlice";
import { categoryAll } from "@/store/slices/categorySlice";
import {
  addEquipmentCartEdit,
  resetEquipmentCartEdit,
  resetEquipmentCart,
} from "@/store/slices/equipmentCartSlice";

// @component cart
import EquipmentCartForm from "./EquipmentCartForm";
import {
  equipmentSelector,
  equipmentSearchById,
  equipmentUpdateById,
} from "@/store/slices/equipmentSlice";

import {
  equipmentDetailSelector,
  equipmentDetailAll,
  equipmentDetailDeleteById,
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
        ????????? : {NumberWithCommas(props.total)}
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

export default function EquipmentEdit() {
  const formRef = useRef<any>();
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch<any>();
  const [total, setTotal] = React.useState(0);

  const [openDialogCreate, setOpenDialogCreate] =
    React.useState<boolean>(false);

  const departmentReducer = useSelector(departmentSelector);
  const companyReducer = useSelector(companySelector);
  const equipmentReducer = useSelector(equipmentSelector);
  const equipmentDetailReducer = useSelector(equipmentDetailSelector);

  const dataColumns = [
    {
      headerName: "??????????????????????????????",
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
      headerName: "????????????????????????",
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
      headerName: "???????????????????????????/????????????????????????",
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
      headerName: "???????????????",
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
      headerName: "????????????/???????????????",
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
      headerName: "?????????????????????",
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
    {
      headerName: "??????????????????",
      field: ".",
      flex: 1,
      minWidth: 96,
      sortable: false,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName:
        "text-center bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          <Tooltip title="?????????????????????????????????">
            <Button
              sx={{
                minWidth: "30px",
              }}
              type="submit"
              color="success"
              variant="contained"
              className="hover:text-[#fce805] w-[30px] h-[26px] mr-1"
              size="small"
              onClick={() => {
                dispatch(addEquipmentCartEdit(row));
                setOpenDialogCreate(true);
              }}
            >
              <EditTwoToneIcon fontSize="inherit" />
            </Button>
          </Tooltip>

          <Tooltip title="????????????????????????????????????">
            <Button
              sx={{
                minWidth: "30px",
              }}
              type="submit"
              color="error"
              variant="contained"
              className="hover:text-[#fce805] w-[30px] h-[26px]"
              size="small"
              onClick={() => {
                //setEquipmentCart(row);
                //console.log(row);
                Swal.fire({
                  title: "???????????????????????????????????? ????????? ???????????? ??????????",
                  text: `???????????????????????????????????????????????????????????????????????? ${row.equipment_detail_title} ?????????????????????????????????.! `,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "?????????, ???????????????????????????!",
                  cancelButtonText: "?????????, ??????????????????!",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    if (equipmentDetailReducer.isResult.length > 1) {
                      dispatch(equipmentDetailDeleteById({ search: row.id }));
                      dispatch(
                        equipmentDetailAll({ search: `${query.get("id")}` })
                      );
                      MySwal.fire({
                        icon: "success",
                        title: "???????????????????????????????????????????????????",
                        showConfirmButton: false,
                        timer: 1000,
                      });
                    } else {
                      MySwal.fire({
                        icon: "warning",
                        title: "????????????????????????????????????????????????????????????????????????????????????????????????",
                        showConfirmButton: false,
                      });
                    }
                  }
                });
              }}
            >
              <DeleteTwoToneIcon fontSize="inherit" />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const initialEquipmentValues: any = {
    id: "",
    equipment_no: "",
    equipment_depart: {
      label: "--??????????????????????????????????????????????????????????????????--",
      value: 0,
    }, // ???????????????????????? *
    equipment_no_txt: "", // ????????????????????????????????????
    equipment_type: "empty", // ??????????????????????????????????????? *
    equipment_title: "", // ?????????????????????????????????????????????
    equipment_member: "", // ????????????????????????????????????????????????
    equipment_member_get: "", // ????????????????????????????????????
    equipment_date: new Date(), // ?????????????????????????????????????????????????????????
    equipment_date_get: new Date(), // ?????????????????????????????????????????????
    equipment_company: "empty", // ??????????????????????????????????????? *
    equipment_note: "", // ?????????????????????????????? *
    equipment_file: "-", // ????????????????????????????????? *
  };

  const initialEquipmentEditValues = (values) => {
    // ???????????????????????????????????????????????????????????? ???????????????
    let initailObj = initialEquipmentValues;

    if (values) {
      // ???????????????????????????????????????????????????
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

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.resetForm();
      // window.location.reload();
      // formik.resetForm(initialEquipmentValues);
    }
  };

  function optionNewDeparts() {
    const departs = [{ label: "--??????????????????????????????????????????????????????????????????--", value: 0 }];
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
                noOptionsText={"?????????????????????????????????"}
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
                renderInput={(params) => (
                  <Field
                    required
                    sx={{ input: { marginTop: "-3px" } }}
                    {...params}
                    name="equipment_depart"
                    id="equipment_depart"
                    label={"???????????????????????????????????????????????????"}
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
              <InputLabel htmlFor="equipment_no_txt">????????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_no_txt"
                name="equipment_no_txt"
                label="????????????????????????????????????"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="?????? 0032.102/97"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl
              fullWidth
              size="small"
              required
              error={errors.equipment_type && touched.equipment_type && true}
            >
              <InputLabel id="equipment_type">???????????????????????????????????????</InputLabel>
              <Field
                name="equipment_type"
                id="equipment_type"
                label="???????????????????????????????????????"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={"empty"} key="empty">
                  --??????????????????????????????????????????????????????--
                </MenuItem>
                <MenuItem value={"???????????????????????????"} key="???????????????????????????">
                  ???????????????????????????
                </MenuItem>
                <MenuItem value={"??????????????????????????????"} key="??????????????????????????????">
                  ??????????????????????????????
                </MenuItem>
                <MenuItem value={"???????????????????????????"} key="???????????????????????????">
                  ???????????????????????????
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
              <InputLabel htmlFor="equipment_title">?????????????????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_title"
                name="equipment_title"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                label="?????????????????????????????????????????????"
                size="small"
                placeholder="?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
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
              <InputLabel id="equipment_member">????????????????????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_member"
                name="equipment_member"
                label="????????????????????????????????????????????????"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="???????????? ????????????????????????????????????????????????"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl
              fullWidth
              size="small"
              required
              error={
                errors.equipment_member_get &&
                touched.equipment_member_get &&
                true
              }
            >
              <InputLabel id="equipment_member_get">????????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_member_get"
                name="equipment_member_get"
                label="????????????????????????????????????"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="???????????? ????????????????????????????????????"
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
                  label="?????????????????????????????????????????????????????????"
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
                  label="?????????????????????????????????????????????"
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
              fullWidth
              size="small"
              required
              error={
                errors.equipment_company && touched.equipment_company && true
              }
            >
              <InputLabel id="equipment_company">??????????????????????????????????????????</InputLabel>
              <Field
                sx={{ input: { marginTop: "-3px" } }}
                name="equipment_company"
                id="equipment_company"
                label="??????????????????????????????????????????"
                component={CustomizedSelectForFormik}
                // placeholder="??????????????????????????????????????????"
                InputLabelProps={{
                  style: { marginTop: "-3px" },
                }}
              >
                <MenuItem value={"empty"}>--?????????????????????????????????--</MenuItem>
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
            <Field
              id="equipment_note"
              name="equipment_note"
              size="small"
              placeholder="?????????????????????????????????????????????????????????"
              component={TextareaAutosize}
              minRows={2}
              style={{ width: "100%" }}
              onChange={(e) => {
                setFieldValue("equipment_note", e.target.value);
              }}
              value={values.equipment_note}
            />

            {/* <FormControl fullWidth size="small">
              <InputLabel htmlFor="equipment_note">??????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="equipment_note"
                name="equipment_note"
                size="small"
                label="??????????????????????????????"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="?????????????????????????????????????????????????????????"
              />
            </FormControl> */}
          </Grid>
          <Grid item lg={12} md={12} xs={12} sx={{ mb: 1 }}>
            <Box sx={{ flexDirection: "row" }}>
              <Button variant="contained" component="label" size="small">
                <AttachFileTwoToneIcon /> ?????????????????????
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
                <AttachFileTwoToneIcon /> ?????????????????????
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
          ??????????????????????????? PDF
        </Typography>
      );
    }
  };

  const onConfirm = (msg) => {
    setOpenDialogCreate(msg);
    dispatch(resetEquipmentCartEdit());
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
          ?????????????????????
        </Typography>

        <Typography
          color="text.primary"
          variant="subtitle2"
          component={Link}
          to="/app3/equipment"
        >
          ???????????????????????????????????????
        </Typography>

        <Typography color="text.primary" variant="subtitle2">
          {equipmentReducer.isResultView
            ? equipmentReducer.isResultView.map((data) => data.equipment_no)
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
                  <AppRegistrationTwoToneIcon /> ????????????????????????????????????
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
                  ????????????????????????
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
              errors.equipment_no_txt = "????????????????????????????????????????????????";

            if (!values.equipment_title)
              errors.equipment_title = "?????????????????????????????????????????????????????????";

            if (!values.equipment_member)
              errors.equipment_member = "????????????????????????????????????????????????????????????";

            if (!values.equipment_member_get)
              errors.equipment_member_get = "????????????????????????????????????????????????";

            if (values.equipment_type === "empty")
              errors.equipment_type = "??????????????????????????????????????????????????????";

            if (values.equipment_company === "empty")
              errors.equipment_company = "?????????????????????????????????????????????????????????";
            return errors;
          }}
          // initialValues={initialEquipmentValues}
          enableReinitialize
          initialValues={
            equipmentReducer.isResultView
              ? initialEquipmentEditValues(equipmentReducer.isResultView)
              : initialEquipmentValues
          }
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            if (equipmentDetailReducer.isResult.length !== 0) {
              // const newArrayProduct = reverseArrayInPlace(
              //   equipmentCartReducer.isResult
              // );
              formData.append("equipment_no_txt", values.equipment_no_txt);
              formData.append("equipment_no", values.equipment_no);
              // formData.append(
              //   "equipment_detail",
              //   JSON.stringify(newArrayProduct)
              // );
              formData.append(
                "equipment_depart",
                values.equipment_depart.value
              );
              formData.append("equipment_title", values.equipment_title);
              formData.append("equipment_member", values.equipment_member);
              formData.append(
                "equipment_member_get",
                values.equipment_member_get
              );
              formData.append(
                "equipment_date",
                moment(values.equipment_date).format("YYYY-MM-DD")
              );
              formData.append(
                "equipment_date_get",
                moment(values.equipment_date_get).format("YYYY-MM-DD")
              );

              formData.append("equipment_company", values.equipment_company);
              // formData.append("equipment_file", values.file);
              if (values.file) {
                formData.append("equipment_file", values.file);
              } else {
                formData.append("equipment_file", values.equipment_file);
              }

              formData.append("equipment_type", values.equipment_type);
              formData.append("equipment_note", values.equipment_note);

              let id = query.get("id") || "";
              // ??????????????????????????????????????????
              dispatch(equipmentUpdateById({ formData: formData, id: id }));
              // ??????????????????????????????????????????
              dispatch(equipmentSearchById({ search: id }));
              // ????????????????????????
              dispatch(resetEquipmentCart());
              resetForm();
            } else {
              let message = "????????????????????????????????????????????????????????????????????????????????????";
              MySwal.fire({
                icon: "warning",
                title: message,
                showConfirmButton: false,
              });
            }

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
                  sx={{
                    display: "flex",
                    alignContent: "center",
                  }}
                >
                  <AppRegistrationTwoToneIcon /> ???????????????????????????????????????
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
                  ???????????????
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* {JSON.stringify(equipmentDetailReducer.isResult)} */}
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
                  `${from} ????????? ${to} ????????? ${NumberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>

      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={6} className="text-right" item>
          <Button
            variant="contained"
            color="error"
            className="w-[128px] "
            onClick={() => {
              navigate(-1);
            }}
          >
            <RestartAltTwoToneIcon />
            ??????????????????
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
            ??????????????????
          </Button>
        </Grid>
      </Grid>

      {/* {showDialog()} */}

      {/* {showDialogCreate()} */}
      <EquipmentCartForm
        show={openDialogCreate}
        confirm={onConfirm}
        equipment_id={query.get("id")}
      />
    </Box>
  );
}
