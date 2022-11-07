import React, { useEffect } from "react";
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

// @redux
import { useSelector, useDispatch } from "react-redux";

// @seletor
import {
  equipmentSelector,
  equipmentAll,
  equipmentSearch,
} from "@/store/slices/equipmentSlice";
import {
  departmentSelector,
  departmentAll,
} from "@/store/slices/departmentSlice";
// @mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// @icons
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @day
import moment from "moment";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function Equipment() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const equipmentReducer = useSelector(equipmentSelector);
  const departmentReducer = useSelector(departmentSelector);

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  // คอลัมข้อมูลการแสดง
  const dataColumns = [
    {
      headerName: "เรื่องที่บันทึก",
      field: "equipment_title",
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
      headerName: "หน่วยงาน",
      field: "dept_name",
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
      headerName: "เลขที่บันทึก",
      field: "equipment_no_txt",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "การซื้อ",
      field: "equipment_type",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ซื้อจาก",
      field: "company_name",
      flex: 1,
      minWidth: 256,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]" noWrap>
          {value}
        </Typography>
      ),
    },
    {
      headerName: "วันที่บันทึก",
      field: "equipment_date",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {moment(value).format("DD/MM/yyyy")}
        </Typography>
      ),
    },

    {
      headerName: "จัดการ",
      field: ".",
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      sortable: false,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName:
        "text-center bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          <Tooltip title="ดูข้อมูล">
            <Button
              sx={{
                minWidth: "30px",
              }}
              type="submit"
              color="info"
              variant="contained"
              className="hover:text-[#fce805] w-[30px] h-[26px] mr-1"
              size="small"
              onClick={() => {
                navigate("/app3/equipment/view?id=" + row.equipment_id);
              }}
            >
              <VisibilityTwoToneIcon fontSize="inherit" />
            </Button>
          </Tooltip>

          <Tooltip title="แก้ไขข้อมูล">
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
                navigate("/app3/equipment/edit?id=" + row.equipment_id);
              }}
            >
              <EditTwoToneIcon fontSize="inherit" />
            </Button>
          </Tooltip>

          <Tooltip title="ลบข้อมูล">
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
                console.log(row);
                setOpenDialog(true);
              }}
            >
              <DeleteTwoToneIcon fontSize="inherit" />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const initialValues: any = {
    no: "",
    title: "",
    depart: { name: "", id: null, state: "" },
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
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ pt: "6px", width: "100%" }}
        >
          <Grid item lg={3} md={6} xs={12}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-no">
                เลขที่บันทึก
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="no"
                name="no"
                startAdornment={
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เลขที่บันทึก"
                size="small"
                placeholder="กรอก เลขที่บันทึก"
              />
            </FormControl>
          </Grid>
          <Grid item lg={3.5} md={6} xs={12}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-title">
                เรื่องที่บันทึก
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="title"
                name="title"
                startAdornment={
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เรื่องที่บันทึก"
                size="small"
                placeholder="กรอก เรื่องที่บันทึก"
              />
            </FormControl>
          </Grid>
          <Grid item lg={3.5} md={6} xs={12}>
            <FormControl fullWidth size="small">
              <Autocomplete
                noOptionsText={"ไม่มีข้อมูล"}
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
                    value !== null ? value : initialValues.depart
                  );
                }}
                renderInput={(params) => (
                  <Field
                    sx={{ input: { marginTop: "-3px" } }}
                    {...params}
                    name="depart"
                    id="depart"
                    // margin="normal"
                    label={"หน่วยงาน"}
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
          <Grid item lg={2} md={6} xs={12}>
            <Stack direction="row" className="text-center">
              <Button
                size="small"
                type="submit"
                variant="contained"
                fullWidth
                className="bg-[#36474f] text-[#fff] hover:text-[#fce805] mr-1"
              >
                <SearchTwoToneIcon /> ค้นหา
              </Button>

              <Tooltip title="โหลดข้อมูล">
                <Button
                  type="submit"
                  variant="contained"
                  className="hover:text-[#fce805] w-[28px]"
                  size="small"
                  onClick={() => {
                    // โหลดข้อมูลทั้งหมด
                    dispatch(equipmentAll());
                    // รีเซตฟอร์ม
                    window.location.reload();
                  }}
                >
                  <RefreshIcon color="inherit" />
                </Button>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    );
  };

  // ฟังก์ชั่น ยืนยันการลบข้อมูล
  const handleDeleteConfirm = () => {
    // ปิด ป๊อปอัพ
    setOpenDialog(false);
  };

  const showDialogRemove = () => {
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
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            color="error"
            className="w-[96px] "
          >
            <CloseTwoToneIcon /> ปิด
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="success"
            className="w-[96px] "
          >
            <DoneTwoToneIcon /> ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(() => {
    dispatch(equipmentAll());
    dispatch(departmentAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {}, [equipmentReducer.isResult]);

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
        // sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden", mb: "8px" }}
        sx={{ margin: "auto", overflow: "hidden", mb: "8px" }}
      >
        <Formik
          validate={(values) => {
            let errors: any = {};

            return errors;
          }}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);

            dispatch(equipmentSearch({ search: values, navigate: navigate }));
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
      >
        <AppBar
          position="static"
          color="default"
          // elevation={0}
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
                  <NoteAltTwoToneIcon /> รายการอุปกรณ์
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
                  <AddTwoToneIcon />
                  เพิ่ม
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <BoxDataGrid>
          <DataGrid
            rowHeight={28}
            headerHeight={28}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              // backgroundColor: "white",
              // margin: "auto",
              // overflow: "hidden",
              minHeight: 450,
            }}
            rows={equipmentReducer.isResult ? equipmentReducer.isResult : []}
            // rows={[]}
            columns={dataColumns}
            pageSize={15}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[15]}
            disableColumnMenu={true}
            // loading={equipmentReducer.isFetching}
            getRowId={(row) => row.equipment_id}
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>

      {showDialogRemove()}
    </Box>
  );
}
