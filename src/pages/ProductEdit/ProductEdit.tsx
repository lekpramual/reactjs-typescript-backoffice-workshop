import * as React from "react";
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
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
// @type
import { PhoneSearch } from "@/types";

import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
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
  // let barcode = useBarcode();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const initialValues: PhoneSearch = {
    keyword: "-",
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
          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="billnumber">ชื่ออุปกรณ์</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="ชื่ออุปกรณ์"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
              />
            </FormControl>
          </Grid>

          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">สถานะ</InputLabel>
              <Field
                name="type"
                id="type"
                label="ซื้ิอจาก"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>ใช้งานได้</MenuItem>
                <MenuItem value={1}>ยกเลิกใช้งาน</MenuItem>
              </Field>
            </FormControl>
          </Grid>

          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ประเภทพัสดุ</InputLabel>
              <Field
                name="type"
                id="type"
                label="ประเภทการซื้อ"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>คอมพิวเตอร์</MenuItem>
              </Field>
            </FormControl>
          </Grid>

          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">
                หน่วยงานที่รับผิดชอบ
              </InputLabel>
              <Field
                name="type"
                id="type"
                label="หน่วยงานที่รับผิดชอบ"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>ศุนย์คอมพิวเตอร์</MenuItem>
              </Field>
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                รายละเอียดเพิ่มเติม
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
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

  const showFormProductEdit = ({
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
              <InputLabel htmlFor="billnumber">เลขครุภัณฑ์พัสดุ</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="เลขครุภัณฑ์พัสดุ"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
              />
            </FormControl>
          </Grid>
          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="billnumber">รายการ</InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                label="รายการ"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
              />
            </FormControl>
          </Grid>

          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ยี่ห้อ</InputLabel>
              <Field
                name="type"
                id="type"
                label="ยี่ห้อ"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>Lenovo</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">สเปก</InputLabel>
              <Field
                name="type"
                id="type"
                label="สเปก"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>I 5</MenuItem>
              </Field>
            </FormControl>
          </Grid>

          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">แรม</InputLabel>
              <Field
                name="type"
                id="type"
                label="แรม"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>DDR4</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ความจุแรม</InputLabel>
              <Field
                name="type"
                id="type"
                label="ความจุแรม"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>2 GB</MenuItem>
              </Field>
            </FormControl>
          </Grid>

          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ฮาร์ดดิสก์</InputLabel>
              <Field
                name="type"
                id="type"
                label="ฮาร์ดดิสก์"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>SSD</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-small-type">ความจุฮาร์ดดิสก์</InputLabel>
              <Field
                name="type"
                id="type"
                label="ความจุฮาร์ดดิสก์"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>250 GB</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid
            xs={12}
            sx={{
              mb: 2,
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-keyword">
                รายละเอียดเพิ่มเติม
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
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

  return (
    <Box>
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
              ดูรายการอุปกรณ์ : {query.get("id")}
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
                  เลขทะเบียนครุภัณฑ์ : {query.get("id")}
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
            {(props) => showFormProductEdit(props)}
          </Formik>
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
      </TabPanel>
    </Box>
  );
}
