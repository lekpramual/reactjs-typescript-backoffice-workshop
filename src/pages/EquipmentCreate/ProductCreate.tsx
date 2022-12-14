import React, { useEffect } from "react";
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

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// @styles
import { styled } from "@mui/material/styles";
// @components
import ComputerCreate from "@/components/ComputerCreate";

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
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [total, setTotal] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openDialogCreate, setOpenDialogCreate] =
    React.useState<boolean>(false);

  const departmentReducer = useSelector(departmentSelector);

  // ??????????????????????????????????????????????????????
  const dataValue = [
    {
      id: 1,
      name: "?????????????????????????????????????????????????????? ?????????????????????????????????????????? ?????????????????? 21.5 ????????????",
      groupName: "?????????????????????????????????",
      typeName: "???????????????/???????????????????????????????????????",
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
      headerName: "??????????????????????????????",
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
      headerName: "????????????????????????",
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
      headerName: "???????????????????????????/????????????????????????",
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
      headerName: "???????????????",
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
      headerName: "????????????/???????????????",
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
      headerName: "?????????????????????",
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
      headerName: "??????????????????",
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
    depart: { name: "", id: null, state: "" },
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
              <InputLabel htmlFor="outlined-adornment-title">
                ?????????????????????????????????????????????
              </InputLabel>

              <Autocomplete
                noOptionsText={"?????????????????????????????????"}
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
                  console.log(value);
                  setFieldValue(
                    "depart",
                    value !== null ? value : initialEquipmentValues.depart
                  );
                }}
                renderInput={(params) => (
                  <Field
                    sx={{ input: { marginTop: "-3px" } }}
                    {...params}
                    name="depart"
                    id="depart"
                    // margin="normal"
                    label={"????????????????????????"}
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
              <InputLabel htmlFor="billnumber">????????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
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
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">???????????????????????????????????????</InputLabel>
              <Field
                name="type"
                id="type"
                label="???????????????????????????????????????"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>??????????????????????????????</MenuItem>
                <MenuItem value={1}>??????????????? - ??????????????????</MenuItem>
                <MenuItem value={2}>??????????????? - ?????????????????????</MenuItem>
                <MenuItem value={3}>???????????????????????? - ??????????????????</MenuItem>
                <MenuItem value={4}>???????????????????????? - ?????????????????????</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                ?????????????????????????????????????????????
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
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
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">????????????????????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
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
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">????????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="???????????????????????????"
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
                  label="?????????????????????????????????????????????"
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
              <InputLabel id="select-small-type">????????????????????????</InputLabel>
              <Field
                name="type"
                id="type"
                label="????????????????????????"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>?????????????????? ?????????????????????????????????????????????????????? ???????????????</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                ??????????????????????????????
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                size="small"
                label="??????????????????????????????"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="?????????????????????????????????????????????????????????"
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
              <Tooltip title="?????????????????????">
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
                <AttachFileTwoToneIcon /> ?????????????????????
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
              <InputLabel htmlFor="billnumber">??????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="??????????????????????????????"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="???????????? ??????????????????????????????"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">????????????????????????</InputLabel>
              <Field
                name="type"
                id="type"
                label="????????????????????????"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>?????????????????????????????????</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">
                ???????????????????????????/????????????????????????{" "}
              </InputLabel>
              <Field
                name="type"
                id="type"
                label="???????????????????????????/???????????????????????? "
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>??????????????? ???????????????????????????????????????</MenuItem>
                <MenuItem value={1}>??????????????? ????????????????????????????????????????????????</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                ???????????????
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                type="number"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                label="???????????????"
                size="small"
                placeholder="???????????? ???????????????"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">????????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="????????????????????????????????????"
                size="small"
                type="number"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="???????????? ????????????????????????????????????"
              />
            </FormControl>
          </Grid>

          <Grid item lg={12} md={12} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                ??????????????????????????????
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                size="small"
                label="??????????????????????????????"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="?????????????????????????????????????????????????????????"
              />
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Stack
              direction="row"
              sx={{
                flex: 1,
              }}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Typography variant="body2" component={"div"}>
                ???????????????????????????????????????????????????
              </Typography>
              <Switch defaultChecked color="success" />
              {/* <Typography variant="body2" component={"div"}>
                xxx
              </Typography> */}
            </Stack>
          </Grid>

          <ComputerCreate />
        </Grid>
      </Form>
    );
  };

  // ??????????????????????????? ???????????????????????????????????????????????????
  const handleDeleteConfirm = () => {
    // ????????? ?????????????????????
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
          ????????????????????????????????? ??????????????????????????????????????? : ?????? 42 ????????????
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ????????????????????????????????????????????????????????????????????????????????????????????????????????????.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            color="error"
            className="w-[96px] "
          >
            <CloseTwoToneIcon /> ?????????
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="success"
            className="w-[96px] "
          >
            <DoneTwoToneIcon /> ????????????
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showDialogCreate = () => {
    return (
      <BootstrapDialog
        maxWidth="lg"
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
            ??????????????????????????????????????????????????????
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
          <Button
            onClick={() => setOpenDialogCreate(false)}
            variant="contained"
            color="error"
            className="w-[96px] "
          >
            <CloseTwoToneIcon /> ?????????
          </Button>

          <Button variant="contained" color="success" className="w-[128px] ">
            <DoneTwoToneIcon />
            ????????????
          </Button>
        </DialogActions>
      </BootstrapDialog>
    );
  };

  useEffect(() => {
    dispatch(departmentAll());
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
          ??????????????????????????????????????????????????????
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
          validate={(values) => {
            let errors: any = {};

            return errors;
          }}
          initialValues={initialEquipmentValues}
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
                  `${from} ????????? ${to} ????????? ${NumberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>
      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={6} className="text-right" item>
          <Button variant="contained" color="error" className="w-[128px] ">
            <RestartAltTwoToneIcon />
            ??????????????????
          </Button>
        </Grid>
        <Grid xs={6} item>
          <Button variant="contained" color="success" className="w-[128px] ">
            <SaveTwoToneIcon />
            ??????????????????
          </Button>
        </Grid>
      </Grid>

      {showDialog()}
      {showDialogCreate()}
    </Box>
  );
}
