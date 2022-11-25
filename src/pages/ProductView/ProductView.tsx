import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  CardMedia,
} from "@mui/material";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";

import Barcode from "react-barcode";

// @redux
import { useSelector, useDispatch } from "react-redux";
// @day
import moment from "moment";
// @utils
import { CustomNoRowsOverlay } from "@/utils";
// @seletor
import {
  productSelector,
  productSearchById,
} from "@/store/slices/productSlice";

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

export default function ProductView() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const productReducer = useSelector(productSelector);

  let query = useQuery();
  let id = query.get("id") || "";
  // let barcode = useBarcode();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(productSearchById({ search: id }));
  }, [dispatch, id]);

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
            <ArrowBackTwoToneIcon />
            ย้อนกลับ
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
              <Grid xs={12}>
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
            </Grid>
          </Toolbar>
        </AppBar>
        {productReducer.isResultView ? (
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                ชื่ออุปกรณ์
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                {productReducer.isResultView.product_title}
              </Typography>
            </Grid>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                เลขทะเบียน/เลขทะเบียนครุภัณฑ์
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                {`${productReducer.isResultView.product_no}/${
                  productReducer.isResultView.product_inventory_number !== null
                    ? productReducer.isResultView.product_inventory_number
                    : "-"
                }`}
              </Typography>
            </Grid>

            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                เลขที่บันทึก
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                {productReducer.isResultView.equipment_no_txt}
              </Typography>
            </Grid>

            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                หมวดหมู่
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                {productReducer.isResultView.category_name}
              </Typography>
            </Grid>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                หน่วยงานที่รับผิดชอบ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                {productReducer.isResultView.dept_name}
              </Typography>
            </Grid>

            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                วันที่รับอุปกรณ์
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                {moment(productReducer.isResultView.product_create_at).format(
                  "DD/MM/yyyy"
                )}
              </Typography>
            </Grid>

            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                สถานะ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className={
                  productReducer.isResultView.product_status === "เปิดใช้งาน"
                    ? "text-[14px] mt-[-2px] text-green-500 hover:text-green-600"
                    : "text-[14px] mt-[-2px] text-red-500 hover:text-red-600"
                }
              >
                {productReducer.isResultView.product_status}
              </Typography>
            </Grid>
            <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                รายละเอียดเพิ่มเติม
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                {productReducer.isResultView.product_note !== null
                  ? productReducer.isResultView.product_note
                  : "-"}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab
              label={
                <Typography variant="subtitle1" component="span">
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
                {/* <Grid xs={6} className="text-right">
                  <Typography variant="subtitle2" component="span">
                    เลขครุภัณฑ์พัสดุ: 7440-001-0001/1308
                  </Typography>
                </Grid> */}
              </Grid>
            </Toolbar>
          </AppBar>
          {/* <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                รายการ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                REH831
              </Typography>
            </Grid>

            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                ยี่ห้อ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                Lenovo / Intel Core i5-10500
              </Typography>
            </Grid>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                แรม
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                DDR4 / 8GB
              </Typography>
            </Grid>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                ฮาร์ดดิสก์
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                SSD / 256B
              </Typography>
            </Grid>
            <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                รายละเอียดเพิ่มเติม
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                -
              </Typography>
            </Grid>
          </Grid> */}
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
        {/* <Grid container spacing={2} alignItems="center" className="mt-1">
          <Grid xs={12} className="text-center">
            <Button
              variant="contained"
              className="w-[256px] bg-blue-500 hover:bg-blue-600"
            >
              <PrintTwoToneIcon />
              ปริ้นรายการอุปกรณ์
            </Button>
          </Grid>
        </Grid> */}
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
                    <AppRegistrationTwoToneIcon /> Barcode
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={12} className="text-center">
              {useBarcode(
                productReducer.isResultView
                  ? productReducer.isResultView.product_no
                  : ""
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
                    <AppRegistrationTwoToneIcon /> รูปภาพประกอบ
                  </Typography>
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
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </Box>
  );
}
