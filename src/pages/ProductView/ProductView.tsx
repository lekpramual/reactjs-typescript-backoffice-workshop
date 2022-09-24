import * as React from "react";
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
  CardActions,
  CardMedia,
} from "@mui/material";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

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

export default function ProductView() {
  const navigate = useNavigate();
  let query = useQuery();
  // let barcode = useBarcode();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
              {query.get("id")}
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
            <Grid
              container
              sx={{
                width: "100%",
              }}
            >
              <Grid xs={12}>
                <Typography variant="subtitle2" component="span">
                  รายการอุปกรณ์
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
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
              เครื่องคอมพิวเตอร์ สำหรับสำนักงาน จอขนาด 21.5 นิ้ว
            </Typography>
          </Grid>
          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              เลขทะเบียนครุภัณฑ์
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              {query.get("id")}
            </Typography>
          </Grid>

          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              สถานะ
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-green-500 hover:text-green-600"
            >
              ใช้การได้
            </Typography>
          </Grid>

          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              ประเภทพัสดุ
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              คอมพิวเตอร์
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
              ศูนย์คอมพิวเตอร์
            </Typography>
          </Grid>
        </Grid>

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
        {/* <Paper
          sx={{
            maxWidth: "100%",
            margin: "auto",
            overflow: "hidden",
            mb: 1,
            mt: 1,
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
              <Grid
                container
                sx={{
                  width: "100%",
                }}
              >
                <Grid xs={6}>
                  <Typography variant="subtitle2" component="span">
                    วิธีการได้มา
                  </Typography>
                </Grid>
                <Grid xs={6} className="text-right">
                  <Typography variant="subtitle2" component="span">
                    เลขที่ใบรับ : INV-0001
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                เรื่องที่บันทึก
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                ขออนุมัติซื้ออุปกรณ์ระบบคิวบริการผู้ป่วยนอก
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
                รอ 0032.102/97
              </Typography>
            </Grid>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                ประเภทการซื้อ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                ซื้อตามแผน
              </Typography>
            </Grid>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                หน่วยงานที่ซื้อ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                ศูนย์คอมพิวเตอร์
              </Typography>
            </Grid>

            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                ผู้บันทึกข้อความ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                นางสาวนันทนิจ มีสวัสดิ์
              </Typography>
            </Grid>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                ผู้รับสินค้า
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                นายมนต์ชัย ศรีทอง
              </Typography>
            </Grid>

            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                วันที่บันทึกข้อความ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                19/09/2022
              </Typography>
            </Grid>
            <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                วันที่รับสินค้า
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                13/10/2022
              </Typography>
            </Grid>

            <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                ซื้อจาก
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                บริษัท กรุงทองคอมพิวเตอร์ จำกัด
              </Typography>
            </Grid>
            <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                ไฟล์แนบ
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                -
              </Typography>
            </Grid>
            <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
              <Typography component={"div"} variant={"body1"}>
                รายละเอียด
              </Typography>
              <Typography
                component={"div"}
                variant={"body2"}
                className="mt-[-2px] text-slate-500 hover:text-blue-600"
              >
                -
              </Typography>
            </Grid>
          </Grid>
        </Paper> */}

        <Paper
          sx={{
            maxWidth: "100%",
            margin: "auto",
            overflow: "hidden",
            mb: 1,
            mt: 1,
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
              <Grid
                container
                sx={{
                  width: "100%",
                }}
              >
                <Grid xs={6}>
                  <Typography variant="subtitle2" component="span">
                    รายละเอียดอุปกรณ์
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
          <Grid container spacing={2} sx={{ p: 2 }}>
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
          </Grid>
        </Paper>

        <Grid container spacing={2} alignItems="center" className="mt-1">
          <Grid xs={10} xsOffset={2} className="text-center">
            <Button
              variant="contained"
              className="w-[256px] bg-blue-500 hover:bg-blue-600"
            >
              <PrintTwoToneIcon /> ปริ้นรายการอุปกรณ์
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
              <Grid
                container
                sx={{
                  width: "100%",
                }}
              >
                <Grid xs={12}>
                  <Typography variant="subtitle2" component="span">
                    Barcode
                  </Typography>
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
              <Grid
                container
                sx={{
                  width: "100%",
                }}
              >
                <Grid xs={12}>
                  <Typography variant="subtitle2" component="span">
                    รูปภาพประกอบ
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
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
                  <Button size="small" color="primary">
                    ลบ
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
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
                  <Button size="small" color="primary">
                    ลบ
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1522770179533-24471fcdba45"
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
                  <Button size="small" color="primary">
                    ลบ
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
