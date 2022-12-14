import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// @form
import { Formik, Form, Field } from "formik";
// @mui
import {
  Box,
  Button,
  Breadcrumbs,
  Toolbar,
  AppBar,
  Tabs,
  Tab,
  Radio,
  Card,
  Switch,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  FormGroup,
  FormLabel,
  RadioGroup,
} from "@mui/material";

// import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import RestartAltTwoToneIcon from "@mui/icons-material/RestartAltTwoTone";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Barcode from "react-barcode";
// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
import { DataGrid } from "@mui/x-data-grid";
// @day
import moment from "moment";
// @redux
import { useSelector, useDispatch } from "react-redux";

// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";

// @seletor
import {
  productSelector,
  productSearchById,
  productUpdate,
} from "@/store/slices/productSlice";
import {
  transferDetailSelector,
  transferDetailSearchByProductId,
} from "@/store/slices/transferDetailSlice";

import { categorySelector, categoryAll } from "@/store/slices/categorySlice";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function useBarcode(txtBarcode) {
  return <Barcode value={txtBarcode && txtBarcode} height={64} />;
}

export default function ProductEdit() {
  const navigate = useNavigate();
  const formRef = useRef<any>();
  let query = useQuery();
  let id = query.get("id") || "";
  // let barcode = useBarcode();
  const dispatch = useDispatch<any>();
  const productReducer = useSelector(productSelector);
  const categoryReducer = useSelector(categorySelector);
  const transferDetailReducer = useSelector(transferDetailSelector);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dataColumns = [
    {
      headerName: "?????????????????????????????????",
      field: "transfer_no",
      width: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Link
          to={`/app3/transfer/view?id=${row.transfer_id}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
      ),
    },
    {
      headerName: "?????????????????????????????????????????????",
      field: "product_title",
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
      headerName: "?????????????????????????????????????????????????????????",
      field: "transfer_detail_default_new_name",
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
      headerName: "??????????????????",
      field: "transfer_date",
      width: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {moment(value).format("DD/MM/yyyy")}
        </Typography>
      ),
    },
  ];

  const initialProductValues: any = {
    product_no: "", // ??????????????????????????????
    product_title: "", // ?????????????????????????????????
    product_note: "", // ?????????????????????????????????????????????????????????
    product_inventory_number: "", // ?????????????????????????????????
    product_status: true, // ???????????????
    product_category: 0, // ???????????????????????????????????????
    product_depart: "", // ????????????????????????
    product_depart_name: "", // ????????????????????????????????????
  };

  const initialProductEditValues = (values) => {
    // ???????????????????????????????????????????????????????????? ???????????????
    let initailObj = initialProductValues;
    if (values) {
      // ???????????????????????????????????????????????????
      initailObj["product_no"] = values.product_no;
      initailObj["product_title"] = values.product_title;
      initailObj["product_inventory_number"] = values.product_inventory_number;
      initailObj["product_status"] =
        values.product_status === "??????????????????????????????" ? true : false;
      initailObj["product_category"] = parseInt(values.product_category);
      initailObj["product_depart"] = values.product_depart;
      initailObj["product_depart_name"] = values.dept_name;
      initailObj["product_note"] = values.product_note;
      return initailObj;
    }
    return initailObj;
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <FormControlLabel
        key={`${option.category_name} - ${option.category_id}`}
        value={parseInt(option.category_id)}
        control={<Radio color="success" />}
        label={option.category_name}
        disabled
      />
    ));
  };

  const FormikRadioGroup = ({
    field,
    form: { touched, errors },
    name,
    options,
    children,
    ...props
  }: any) => {
    const fieldName = name || field.name;

    return (
      <React.Fragment>
        <RadioGroup row {...field} {...props} name={fieldName}>
          {/* Here you either map over the props and render radios from them,
           or just render the children if you're using the function as a child*/}
          {options ? renderOptions(options) : children}
        </RadioGroup>

        {touched[fieldName] && errors[fieldName] && (
          <span style={{ color: "red", fontFamily: "sans-serif" }}>
            {errors[fieldName]}
          </span>
        )}
      </React.Fragment>
    );
  };

  const showFormCreate = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
    resetForm,
    values,
    errors,
    touched,
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
          <Grid xs={6}>
            <FormControl
              fullWidth
              size="small"
              error={errors.product_title && touched.product_title && true}
            >
              <InputLabel htmlFor="product_title">?????????????????????????????????</InputLabel>
              <Field
                as={OutlinedInput}
                id="product_title"
                name="product_title"
                label="?????????????????????????????????"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="???????????? ?????????????????????????????????"
              />
            </FormControl>
          </Grid>
          {/* <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="product_no">??????????????????????????????</InputLabel>
              <Field
                disabled
                as={OutlinedInput}
                id="product_no"
                name="product_no"
                label="??????????????????????????????"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
              />
            </FormControl>
          </Grid> */}
          {/* <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">
                ????????????????????????????????????????????????????????????
              </InputLabel>
              <Field
                disabled
                as={OutlinedInput}
                id="product_depart_name"
                name="product_depart_name"
                size="small"
                label="????????????????????????????????????????????????????????????"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="????????????????????????????????????????????????????????????"
              />
            </FormControl>
          </Grid> */}

          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="product_inventory_number">
                ??????????????????????????????????????????????????????
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="product_inventory_number"
                name="product_inventory_number"
                label="??????????????????????????????????????????????????????"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="???????????????????????? 7440-001-0001/99"
              />
            </FormControl>
          </Grid>

          <Grid
            xs={10}
            sx={{
              marginTop: "-14px",
            }}
          >
            <FormControl fullWidth size="small">
              <FormLabel
                component="legend"
                sx={{
                  marginBottom: "-8px",
                  marginTop: "5px",
                }}
              >
                ????????????????????????
              </FormLabel>
              <Field
                name="product_category"
                options={
                  categoryReducer.isResult ? categoryReducer.isResult : []
                }
                component={FormikRadioGroup}
              />
            </FormControl>
          </Grid>
          <Grid
            xs={2}
            sx={{
              marginTop: "-14px",
            }}
          >
            <FormControl fullWidth size="small">
              <FormLabel
                component="legend"
                sx={{
                  marginBottom: "-6px",
                  marginTop: "6px",
                }}
              >
                ??????????????????????????????????????????
              </FormLabel>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={
                    <Switch
                      name="product_status"
                      checked={values.product_status}
                      onChange={(event) => {
                        setFieldValue("product_status", event.target.checked);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                      color={"success"}
                    />
                  }
                  label={""}
                  // labelPlacement="top"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid
            xs={12}
            sx={{
              marginTop: "12px",
            }}
          >
            <Field
              id="product_note"
              name="product_note"
              size="small"
              placeholder="?????????????????????????????????????????????????????????"
              component={TextareaAutosize}
              minRows={2}
              style={{ width: "100%" }}
              onChange={(e) => {
                setFieldValue("product_note", e.target.value);
              }}
              value={values.product_note}
            />
          </Grid>
        </Grid>
      </Form>
    );
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    dispatch(categoryAll());
    dispatch(productSearchById({ search: id }));
    dispatch(transferDetailSearchByProductId({ search: id }));
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid xs={8}>
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
              to="/app3/product"
            >
              ???????????????????????????????????????
            </Typography>

            <Typography color="text.primary" variant="subtitle2">
              {productReducer.isResultView
                ? productReducer.isResultView.product_no
                : ""}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid xs={4} className="text-right">
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
            <ArrowBackTwoToneIcon /> ????????????????????????
          </Button>
        </Grid>
      </Grid>

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
            <Grid
              container
              sx={{
                width: "100%",
              }}
            >
              <Grid xs={6}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{
                    display: "flex",
                    alignContent: "center",
                  }}
                >
                  <AppRegistrationTwoToneIcon /> ????????????????????????????????????????????????????????????????????? :{" "}
                  {productReducer.isResultView
                    ? productReducer.isResultView.product_no
                    : ""}
                </Typography>
              </Grid>
              <Grid xs={6} className="text-right">
                <Typography variant="subtitle2" component="span">
                  ???????????????????????????????????????????????????????????? :{" "}
                  {productReducer.isResultView
                    ? productReducer.isResultView.dept_name
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Formik
          innerRef={formRef}
          validate={(values) => {
            let errors: any = {};
            if (!values.product_title) errors.product_title = "?????????????????????????????????????????????";

            return errors;
          }}
          enableReinitialize
          initialValues={
            productReducer.isResultView
              ? initialProductEditValues(productReducer.isResultView)
              : initialProductValues
          }
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            let formData = new FormData();
            formData.append("product_no", values.product_no);
            formData.append("product_title", values.product_title);
            formData.append(
              "product_note",
              values.product_note !== "" ? values.product_note : ""
            );
            formData.append(
              "product_inventory_number",
              values.product_inventory_number !== ""
                ? values.product_inventory_number
                : ""
            );
            formData.append(
              "product_status",
              values.product_status ? "??????????????????????????????" : "???????????????????????????"
            );
            formData.append("product_category", values.product_category);
            formData.append("product_depart", values.product_depart);

            dispatch(
              productUpdate({ formData: formData, id: id, navigate: navigate })
            );
            setSubmitting(false);
          }}
        >
          {(props) => showFormCreate(props)}
        </Formik>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab
              label={
                <Typography variant="subtitle1" component="div">
                  ???????????????????????????????????????????????????
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography variant="subtitle1" component="span">
                  BAR CODE ????????? ?????????
                </Typography>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
      </Paper>

      <TabPanel value={value} index={0}>
        <Paper
          key="product_trans"
          sx={{
            maxWidth: "100%",
            margin: "auto",
            overflow: "hidden",
            mb: 1,
            mt: 1,
          }}
        >
          <div>
            <AppBar
              position="static"
              color="default"
              elevation={0}
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
              className="h-[40px]"
            >
              <Toolbar className="pl-2 pr-2">
                <Grid
                  container
                  sx={{
                    width: "100%",
                  }}
                >
                  <Grid xs={6}>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      sx={{
                        display: "flex",
                        alignContent: "center",
                      }}
                    >
                      <AppRegistrationTwoToneIcon /> ???????????????????????????????????????????????????
                    </Typography>
                  </Grid>
                  <Grid xs={6} className="text-right">
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ mr: 1, mb: 1 }}
                      // color="success"
                      className="w-[128px] bg-green-500 hover:bg-green-600"
                      onClick={() => {
                        console.log("Update Images..");
                      }}
                    >
                      <AddTwoToneIcon /> ???????????????????????????
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>

            <Grid
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {CustomNoRowsOverlay()}
            </Grid>
          </div>
        </Paper>

        <Paper
          sx={{
            maxWidth: "100%",
            margin: "auto",
            overflow: "hidden",
            mb: 1,
            mt: 1,
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
              <Grid
                container
                sx={{
                  width: "100%",
                }}
              >
                <Grid xs={6}>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{
                      display: "flex",
                      alignContent: "center",
                    }}
                  >
                    <AppRegistrationTwoToneIcon /> ????????????????????? ?????????-????????????
                  </Typography>
                </Grid>
                <Grid xs={6} className="text-right">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mr: 1, mb: 1 }}
                    // color="success"
                    className="w-[128px] bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      navigate("/app3/transfer/create");
                    }}
                  >
                    <AddTwoToneIcon /> ??????????????????????????????
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <Grid
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BoxDataGrid>
              <DataGrid
                autoHeight
                rowHeight={28}
                headerHeight={28}
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                // sx={{
                //   minHeight: 450,
                // }}
                rows={
                  transferDetailReducer.isResult
                    ? transferDetailReducer.isResult
                    : []
                }
                columns={dataColumns}
                pageSize={15}
                hideFooterSelectedRowCount
                rowsPerPageOptions={[15]}
                disableColumnMenu={true}
                // loading={hosxpReducer.isFetching}
                getRowId={(row) =>
                  // parseInt(row.kskloginname) + Math.random() * (100 - 1)
                  row.transfer_id
                }
                localeText={{
                  MuiTablePagination: {
                    labelDisplayedRows: ({ from, to, count }) =>
                      `${from} ????????? ${to} ????????? ${NumberWithCommas(count)}`,
                  },
                }}
              />
            </BoxDataGrid>
          </Grid>
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Paper
          sx={{
            maxWidth: "100%",
            margin: "auto",
            overflow: "hidden",
            mb: 1,
            mt: 1,
          }}
        >
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
            className="h-[40px]"
          >
            <Toolbar className="pl-5 pr-2">
              <Grid
                container
                sx={{
                  width: "100%",
                }}
              >
                <Grid xs={6}>
                  <Typography variant="subtitle2" component="span">
                    Barcode
                  </Typography>
                </Grid>
                <Grid xs={6} className="text-right">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mr: 1, mb: 1 }}
                    // color="success"
                    className="w-[96px] bg-cyan-500 hover:bg-cyan-600"
                    onClick={() => {
                      console.log("Download..");
                    }}
                  >
                    <LocalPrintshopTwoToneIcon /> ???????????????
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={12} className="text-center">
              {useBarcode(
                productReducer.isResultView
                  ? productReducer.isResultView.product_no
                  : null
              )}
            </Grid>
          </Grid>
        </Paper>
        <Paper
          sx={{
            maxWidth: "100%",
            margin: "auto",
            overflow: "hidden",
            mb: 1,
          }}
        >
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
            className="h-[40px]"
          >
            <Toolbar className="pl-5 pr-2">
              <Grid
                container
                sx={{
                  width: "100%",
                }}
              >
                <Grid xs={6}>
                  <Typography variant="subtitle2" component="span">
                    ????????????????????????????????????
                  </Typography>
                </Grid>
                <Grid xs={6} className="text-right">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mr: 1, mb: 1 }}
                    // color="success"
                    className="w-[96px] bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      console.log("Update Images..");
                    }}
                  >
                    <AddPhotoAlternateTwoToneIcon /> ????????????????????????
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card sx={{ width: "345px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${process.env.PUBLIC_URL}/assets/img/no_image.png`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ST.1208.jpg
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ??????????????????????????? 20 ???.???. 65
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" variant="contained" color="error">
                    <DeleteTwoToneIcon /> ??????
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card sx={{ width: "345px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${process.env.PUBLIC_URL}/assets/img/no_image.png`}
                    alt="Burger"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ST.1209.jpg
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ??????????????????????????? 20 ???.???. 65
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" variant="contained" color="error">
                    <DeleteTwoToneIcon /> ??????
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card sx={{ width: "345px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${process.env.PUBLIC_URL}/assets/img/no_image.png`}
                    alt="Camera"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ST.1210.jpg
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ??????????????????????????? 20 ???.???. 65
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" variant="contained" color="error">
                    <DeleteTwoToneIcon /> ??????
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={6} className="text-right">
          <Button variant="contained" color="error" className="w-[128px] ">
            <RestartAltTwoToneIcon /> ??????????????????
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button
            variant="contained"
            color="success"
            className="w-[128px] "
            onClick={() => handleSubmit()}
          >
            <SaveAsTwoToneIcon /> ????????????????????????
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
