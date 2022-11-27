import React, { useEffect } from "react";
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

import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import RestartAltTwoToneIcon from "@mui/icons-material/RestartAltTwoTone";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import Barcode from "react-barcode";

// @redux
import { useSelector, useDispatch } from "react-redux";

// @utils
import { CustomNoRowsOverlay } from "@/utils";

// @seletor
import {
  productSelector,
  productSearchById,
} from "@/store/slices/productSlice";

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

  let query = useQuery();
  let id = query.get("id") || "";
  // let barcode = useBarcode();
  const dispatch = useDispatch<any>();
  const productReducer = useSelector(productSelector);
  const categoryReducer = useSelector(categorySelector);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const initialProductValues: any = {
    product_no: "", // เลขทะเบียน
    product_title: "", // ชื่ออุปกรณ์
    product_note: "", // รายละเอียดเพิ่มเติม
    product_inventory_number: "", // เลขครุภัณฑ์
    product_status: true, // สถานะ
    product_category: 0, // ประเภทอุปกรณ์
    product_depart: "", // หน่วยงาน
    product_depart_name: "", // ชื่อหน่วยงาน
  };

  const initialProductEditValues = (values) => {
    // ตั้งค่าข้อมูลพื้นฐาน ฟอร์ม
    let initailObj = initialProductValues;
    if (values) {
      // มีการแก้ไข้ข้อมูล
      initailObj["product_no"] = values.product_no;
      initailObj["product_title"] = values.product_title;
      initailObj["product_inventory_number"] = values.product_inventory_number;
      initailObj["product_status"] =
        values.product_status === "เปิดใช้งาน" ? true : false;
      initailObj["product_category"] = values.product_category;
      initailObj["product_depart"] = values.product_depart;
      initailObj["product_depart_name"] = values.dept_name;
      initailObj["product_note"] = values.product_note;
      return initailObj;
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

  const renderOptions = (options) => {
    return options.map((option) => (
      <FormControlLabel
        key={option.category_id}
        value={option.category_id}
        control={<Radio color="success" />}
        label={option.category_name}
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
  }) => {
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
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="product_title">ชื่ออุปกรณ์</InputLabel>
              <Field
                as={OutlinedInput}
                id="product_title"
                name="product_title"
                label="ชื่ออุปกรณ์"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
              />
            </FormControl>
          </Grid>
          {/* <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="product_no">เลขทะเบียน</InputLabel>
              <Field
                disabled
                as={OutlinedInput}
                id="product_no"
                name="product_no"
                label="เลขทะเบียน"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
              />
            </FormControl>
          </Grid> */}

          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="product_inventory_number">
                เลขทะเบียนครุภัณฑ์
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="product_inventory_number"
                name="product_inventory_number"
                label="เลขทะเบียนครุภัณฑ์"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
              />
            </FormControl>
          </Grid>

          <Grid xs={12}>
            {/* <FormControlLabel htmlFor="product_inventory_number">
              หมวดหมู่
            </FormControlLabel> */}
            <FormControl fullWidth size="small">
              {/* <InputLabel htmlFor="product_category">หมวดหมู่</InputLabel> */}
              {JSON.stringify(values.product_category)}
              {JSON.stringify(categoryReducer.isResult)}
              <FormLabel
                component="legend"
                sx={{
                  marginBottom: "-6px",
                }}
              >
                หมวดหมู่
              </FormLabel>
              {/* <Field
                name="product_category"
                options={
                  categoryReducer.isResult ? categoryReducer.isResult : []
                }
                component={FormikRadioGroup}
                value={values.product_category}
              /> */}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl fullWidth size="small">
              <FormLabel
                component="legend"
                sx={{
                  marginBottom: "-6px",
                  marginTop: "6px",
                }}
              >
                สถานะ
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
                  label={"สถานะ"}
                  // labelPlacement="top"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          {/* <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">
                หน่วยงานที่รับผิดชอบ
              </InputLabel>
              <Field
                disabled
                as={OutlinedInput}
                id="product_depart_name"
                name="product_depart_name"
                size="small"
                label="หน่วยงานที่รับผิดชอบ"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="หน่วยงานที่รับผิดชอบ"
              />
            </FormControl>
          </Grid> */}

          <Grid
            xs={12}
            sx={{
              marginTop: "14px",
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                รายละเอียดเพิ่มเติม
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="product_note"
                name="product_note"
                size="small"
                label="รายละเอียดเพิ่มเติม"
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

  useEffect(() => {
    dispatch(categoryAll());
    dispatch(productSearchById({ search: id }));
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
              หน้าแรก
            </Typography>

            <Typography
              color="text.primary"
              variant="subtitle2"
              component={Link}
              to="/app3/product"
            >
              รายการอุปกรณ์
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
            <ArrowBackTwoToneIcon /> ย้อนกลับ
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
                  <AppRegistrationTwoToneIcon /> รายการอุปกรณ์
                </Typography>
              </Grid>
              <Grid xs={6} className="text-right">
                <Typography variant="subtitle2" component="span">
                  หน่วยงานที่รับผิดชอบ :{" "}
                  {productReducer.isResultView
                    ? productReducer.isResultView.dept_name
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* <Formik
          validate={(values) => {
            let errors: any = {};
            return errors;
          }}
          enableReinitialize
          initialValues={
            productReducer.isResultView
              ? initialProductEditValues(productReducer.isResultView)
              : initialProductValues
          }
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {(props) => showFormCreate(props)}
        </Formik> */}

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
                  รายละเอียดอุปกรณ์
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography variant="subtitle1" component="span">
                  BAR CODE และ ภาพ
                </Typography>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
      </Paper>

      <TabPanel value={value} index={0}>
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
                    <AppRegistrationTwoToneIcon /> รายละเอียดอุปกรณ์
                  </Typography>
                </Grid>
                <Grid xs={6} className="text-right">
                  <Typography variant="subtitle2" component="span">
                    เลขครุภัณฑ์พัสดุ: 7440-001-0001/1308
                  </Typography>
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
                    <AppRegistrationTwoToneIcon /> ประวัติ โอน-ย้าย
                  </Typography>
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
                <Grid xs={12}>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      display: "flex",
                      alignContent: "center",
                    }}
                  >
                    <AppRegistrationTwoToneIcon /> รายละเอียดอุปกรณ์
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          {/* <Formik
            validate={(values) => {
              let errors: any = {};

              return errors;
            }}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {(props) => showFormProductEdit(props)}
          </Formik> */}
        </Paper>

        <Grid container spacing={2} alignItems="center" className="mt-1">
          <Grid xs={6} className="text-right">
            <Button variant="contained" color="error" className="w-[128px] ">
              <RestartAltTwoToneIcon /> ยกเลิก
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button variant="contained" color="success" className="w-[128px] ">
              <SaveAsTwoToneIcon /> ปรับปรุง
            </Button>
          </Grid>
        </Grid>
      </TabPanel>

      {/* <TabPanel value={value} index={1}>
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
                    <LocalPrintshopTwoToneIcon /> ปริ้น
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={12} className="text-center">
              {useBarcode(query.get("id"))}
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
                    รูปภาพประกอบ
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
                      console.log("Update Images..");
                    }}
                  >
                    <AddPhotoAlternateTwoToneIcon /> เพิ่มรูป
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
                      อัพวันที่ 20 ก.ย. 65
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" variant="contained" color="error">
                    <DeleteTwoToneIcon /> ลบ
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
                      อัพวันที่ 20 ก.ย. 65
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" variant="contained" color="error">
                    <DeleteTwoToneIcon /> ลบ
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
                      อัพวันที่ 20 ก.ย. 65
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" variant="contained" color="error">
                    <DeleteTwoToneIcon /> ลบ
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel> */}
    </React.Fragment>
  );
}
