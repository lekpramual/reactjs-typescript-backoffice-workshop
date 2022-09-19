import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// @form
import { Formik, Form, Field } from "formik";
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
} from "@mui/material";

// @type
import { PhoneSearch } from "@/types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

// @styles
import { BootstrapDialog, BoxDataGrid } from "@/styles/AppStyle";
// @utils
import { CustomNoRowsOverlay, numberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2, height: 48 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function Equipment() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openDialogCreate, setOpenDialogCreate] =
    React.useState<boolean>(false);
  // คอลัมข้อมูลการแสดง
  const dataValue = [
    {
      id: 1,
      name: "ขออนุมัติซื้อเครื่องคอมพิวเตอร์",
      depName: "ศูนย์คอมพิวเตอร์",
      numberNo: "รอ. 0032.102/92",
      dateCreated: "27/09/2022",
      dateUpdated: "13/10/2022",
      userCreated: "นางสาวนันทนิจ มีสวัสดิ์",
      userUpdated: "นายมนต์ชัย ศรีทอง",
      type: 1,
      typeName: "ซื้อนอกแผน",
      company: 1,
      companyName: "บริษัท กรุงทองคอมพิวเตอร์ จำกัด",
      comment: "คอมเมนต์",
      fileName: "ไฟล์",
    },
  ];

  const dataColumns = [
    {
      headerName: "เรื่องที่บันทึก",
      field: "name",
      flex: 1,
      minWidth: 364,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "หน่วยงาน",
      field: "depName",
      flex: 1,
      minWidth: 256,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "เลขที่บันทึก",
      field: "numberNo",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ประเภทการซื้อ",
      field: "typeName",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ซื้อจาก",
      field: "companyName",
      flex: 1,
      minWidth: 256,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "วันที่บันทึก",
      field: "dateCreated",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ผู้บันทึก",
      field: "userCreated",
      flex: 1,
      minWidth: 156,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
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
      headerClassName:
        "text-center bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          <Tooltip title="ดูข้อมูล">
            <IconButton
              aria-label="view"
              size="small"
              onClick={() => {
                console.log(row.id);
                setOpenDialogCreate(true);
                navigate("/app3/equipment/view?id=" + row.id);
              }}
            >
              <VisibilityTwoToneIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>

          <Tooltip title="แก้ไขข้อมูล">
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => {
                console.log(row.id);
                setOpenDialogCreate(true);
                // navigate("/stock/edit/" + row.id);
                navigate("/app3/equipment/edit?id=" + row.id);
              }}
            >
              <EditTwoToneIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>

          <Tooltip title="ลบข้อมูล">
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
          </Tooltip>
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
                <MenuItem value={0}>อื่นๆ</MenuItem>
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

  const showFormSearch = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
    resetForm,
    values,
  }: any) => {
    return (
      <Form noValidate>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center" sx={{ pt: "6px" }}>
              <Grid item lg={2} xs={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-keyword">
                    เลขที่บันทึก
                  </InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="keyword"
                    name="keyword"
                    startAdornment={
                      <SearchIcon color="inherit" sx={{ display: "block" }} />
                    }
                    label="เลขที่บันทึก"
                    size="small"
                    placeholder="กรอก เลขที่บันทึก"
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} xs={8}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-keyword">
                    เรื่องที่บันทึก
                  </InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="keyword"
                    name="keyword"
                    startAdornment={
                      <SearchIcon color="inherit" sx={{ display: "block" }} />
                    }
                    label="เรื่องที่บันทึก"
                    size="small"
                    placeholder="กรอก เรื่องที่บันทึก"
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} xs={6}>
                <FormControl fullWidth sx={{ m: 1 }} size="small">
                  <InputLabel id="select-small-type">หน่วยงาน</InputLabel>
                  <Field
                    name="type"
                    id="type"
                    label="หน่วยงาน"
                    component={CustomizedSelectForFormik}
                  >
                    <MenuItem value={0}>ทั้งหมด</MenuItem>
                    <MenuItem value={1}>ศูนย์คอมพิวเตอร์</MenuItem>
                  </Field>
                </FormControl>
              </Grid>

              <Grid item lg={1} xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="hover:text-[#fce805]"
                >
                  ค้นหา
                </Button>
              </Grid>
              <Grid
                item
                lg={1}
                xs={2}
                sx={{
                  textAlign: "center",
                  display: { xs: "none", md: "block" },
                }}
              >
                <Tooltip title="โหลดข้อมูล">
                  <IconButton
                    onClick={() => {
                      resetForm();
                    }}
                    className="bg-[#36474f] text-[#fff] hover:text-[#fce805]"
                  >
                    <RefreshIcon color="inherit" sx={{ display: "block" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
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
          <Button onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const showDialogCreate = () => {
    return (
      <BootstrapDialog
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
          <Button variant="contained" color="success" className="w-[128px] ">
            <SaveTwoToneIcon /> บันทึก
          </Button>
        </DialogActions>
      </BootstrapDialog>
    );
  };

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

        <Typography color="text.primary" variant="subtitle2">
          รายการรับอุปกรณ์
        </Typography>
      </Breadcrumbs>

      <Paper
        // 936 "100%"
        sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden", mb: "8px" }}
      >
        <Formik
          validate={(values) => {
            let errors: any = {};

            return errors;
          }}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            // moment(valuse.end).format("MM/dd/yyyy");
            // dispatch(loginUser({ user: values, navigate: navigate }));
            // dispatch(phoneSearch({ phone: values, navigate: navigate }));
            setSubmitting(false);
          }}
        >
          {(props) => showFormSearch(props)}
        </Formik>
      </Paper>

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
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle2" component="span">
                  รายการอุปกรณ์
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mr: 1, mb: 1 }}
                  color="success"
                  className="w-[96px]"
                  component={Link}
                  to="/app3/equipment/create"
                >
                  <AddTwoToneIcon /> เพิ่ม
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <BoxDataGrid>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              backgroundColor: "white",
              margin: "auto",
              overflow: "hidden",
              minHeight: 450,
              "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
                {
                  color: "#fff",
                  opacity: 0.5,
                },
            }}
            rows={dataValue ? dataValue : []}
            // rows={[]}
            columns={dataColumns}
            pageSize={20}
            rowHeight={36}
            headerHeight={36}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[20]}
            disableColumnMenu={true}
            // loading={hosxpReducer.isFetching}
            getRowId={(row) =>
              // parseInt(row.kskloginname) + Math.random() * (100 - 1)
              row.id
            }
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} ถึง ${to} จาก ${numberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>

      {showDialog()}
      {showDialogCreate()}
    </Box>
  );
}
