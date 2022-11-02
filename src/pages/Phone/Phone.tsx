import React, { useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridCsvExportOptions,
  GridToolbarContainerProps,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
} from "@mui/x-data-grid";

// @redux
import { useSelector, useDispatch } from "react-redux";
// @seletor
import {
  phoneSelector,
  phoneAll,
  phoneSearch,
} from "@/store/slices/phoneSlice";
// @component
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
// @type
import { PhoneSearch } from "@/types";
// @form
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ButtonProps } from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import FaxTwoToneIcon from "@mui/icons-material/FaxTwoTone";
import KeyboardDoubleArrowDownTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowDownTwoTone";
import KeyboardDoubleArrowUpTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowUpTwoTone";

// @router
import { useNavigate } from "react-router-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import thLocale from "date-fns/locale/th";

import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { BoxDataGrid } from "@/styles/AppStyle";

const localeMap = {
  th: thLocale,
};

const csvOptions: GridCsvExportOptions = {
  utf8WithBom: true,
  delimiter: ",",
  fileName: "รายงานการใช้งานโทรศัพท์",
  includeHeaders: true,
};

const CustomExportButton = (props: ButtonProps) => (
  <GridToolbarExportContainer {...props}>
    <GridCsvExportMenuItem options={csvOptions} />
  </GridToolbarExportContainer>
);

const CustomToolbar = (props: GridToolbarContainerProps) => (
  <GridToolbarContainer {...props}>
    <Stack
      sx={{
        flex: 1,
      }}
      justifyContent="space-between"
      direction="row"
      alignItems="baseline"
      spacing={2}
      className="pr-2 pb-1"
    >
      <Typography
        variant="subtitle1"
        component={"div"}
        sx={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <FaxTwoToneIcon /> รายการใช้งานโทรศัพท์
      </Typography>

      <CustomExportButton
        title="ส่งออก Excel"
        size="small"
        variant="contained"
        // color="primary"
        className="w-[96px] h-[28px] bg-cyan-500 hover:bg-cyan-600"
      />
    </Stack>
  </GridToolbarContainer>
);

export default function Phone() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const phoneReducer = useSelector(phoneSelector);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const phoneColumns = [
    {
      headerName: "วันที่และเวลา",
      field: "date",
      width: 164,
      headerClassName:
        "bg-[#36474f] text-[#fff] text-[14px] h-[36px]  fill-[#fff] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ต้นทาง",
      field: "src",
      width: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "หน่วยงาน-ต้นทาง",
      field: "src_name",
      width: 364,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ปลายทาง",
      field: "dst",
      width: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => {
        return (
          <Typography variant="body1" className="text-[14px]">
            {value}
          </Typography>
        );
      },
    },
    {
      headerName: "หน่วยงาน-ปลายทาง",
      field: "dst_name",
      width: 364,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "เวลา (s)",
      field: "duration",
      width: 110,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "สถานะคู่สาย",
      field: "disposition",
      width: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "โทรออกผ่าน",
      field: "dstchannel",
      width: 196,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      // flex: 1,
      // maxWidth: 196,
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
  ];

  useEffect(() => {
    dispatch(phoneAll());
  }, [dispatch]);

  useEffect(() => {}, [phoneReducer.isResult]);

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
          <Grid item lg={4} md={4} xs={6}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-keyword">
                ค้นหา
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="keyword"
                name="keyword"
                startAdornment={
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                }
                label="ค้นหา"
                size="small"
                placeholder="เบอร์โทรศัพท์,หน่วยงาน"
              />
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} size="small">
              <InputLabel id="select-small-type">ประเภท</InputLabel>
              <Field
                name="type"
                id="type"
                label="ประเภท"
                component={CustomizedSelectForFormik}
              >
                <MenuItem value={0}>ทั้งหมด</MenuItem>
                <MenuItem value={1}>เบอร์ - ต้นทาง</MenuItem>
                <MenuItem value={2}>เบอร์ - ปลายทาง</MenuItem>
                <MenuItem value={3}>หน่วยงาน - ต้นทาง</MenuItem>
                <MenuItem value={4}>หน่วยงาน - ปลายทาง</MenuItem>
              </Field>
            </FormControl>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} size="small">
              <Stack direction="row" className="text-center ">
                <Tooltip
                  title="ค้นหาขั้นสูง"
                  sx={{
                    marginRight: 1,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="hover:text-[#fce805] w-[28px]"
                    size="small"
                    sx={{
                      marginRight: 1,
                    }}
                    onClick={() => (open ? handleClose() : handleOpen())}
                  >
                    {open ? (
                      <KeyboardDoubleArrowUpTwoToneIcon
                        color="inherit"
                        sx={{ display: "block" }}
                      />
                    ) : (
                      <KeyboardDoubleArrowDownTwoToneIcon
                        color="inherit"
                        sx={{ display: "block" }}
                      />
                    )}
                  </Button>
                </Tooltip>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="hover:text-[#fce805]"
                  size="small"
                  sx={{
                    marginRight: 1,
                  }}
                >
                  ค้นหา
                </Button>

                <Tooltip title="โหลดข้อมูล">
                  <Button
                    type="submit"
                    variant="contained"
                    className="hover:text-[#fce805] w-[28px]"
                    size="small"
                    onClick={() => {
                      dispatch(phoneAll());
                      resetForm();
                      setOpen(false);
                    }}
                  >
                    <RefreshIcon color="inherit" />
                  </Button>
                </Tooltip>
              </Stack>
            </FormControl>
          </Grid>
        </Grid>

        {open && (
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ pt: "6px", width: "100%" }}
          >
            <Grid item lg={3} sm={6} xs={6}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={localeMap["th"]}
                >
                  <DatePicker
                    label="วันที่เริ่มต้น"
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
            <Grid item lg={3} sm={6} xs={6}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={localeMap["th"]}
                >
                  <DatePicker
                    label="วันที่สิ้นสุด"
                    inputFormat="dd/MM/yyyy"
                    value={values.end}
                    onChange={(newValue: Date | null) => {
                      setFieldValue("end", newValue, true);
                    }}
                    renderInput={(params) => (
                      <Field
                        component={TextField}
                        name="end"
                        {...params}
                        size="small"
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <FormControl fullWidth sx={{ m: 1 }} size="small">
                <InputLabel id="select-small-disposition">
                  สถานะคู่สาย
                </InputLabel>
                <Field
                  name="disposition"
                  id="disposition"
                  label="สถานะคู่สาย"
                  component={CustomizedSelectForFormik}
                >
                  <MenuItem value="ALL">ทั้งหมด</MenuItem>
                  <MenuItem value={"ANSWERED"}>ได้รับสาย</MenuItem>
                  <MenuItem value={"NO ANSWER"}>ไม่ได้รับสาย</MenuItem>
                  <MenuItem value={"BUSY"}>สายไม่ว่าง</MenuItem>
                </Field>
              </FormControl>
            </Grid>
            <Grid item lg={3} sm={6} xs={6}>
              <FormControl fullWidth sx={{ m: 1 }} size="small">
                <InputLabel id="select-small-dstchannel">โทรออกผ่าน</InputLabel>
                <Field
                  name="dstchannel"
                  id="dstchannel"
                  label="โทรออกผ่าน"
                  component={CustomizedSelectForFormik}
                >
                  <MenuItem value="ALL">ทั้งหมด</MenuItem>
                  <MenuItem value={"SIP/8000"}>SIP/8000</MenuItem>
                  <MenuItem value={"SIP/TOT SIP Out"}>SIP/TOT SIP Out</MenuItem>
                  <MenuItem value={"SIP/NEC_Out"}>SIP/NEC_Out</MenuItem>
                </Field>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Form>
    );
  };

  return (
    <>
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
            dispatch(phoneSearch({ phone: values, navigate: navigate }));
            setSubmitting(false);
          }}
        >
          {(props) => showFormSearch(props)}
        </Formik>
      </Paper>
      {/* 936  width: "100%"*/}
      <Paper
        sx={{
          maxWidth: "100%",
          // minHeight: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <BoxDataGrid>
          <DataGrid
            autoHeight
            rowHeight={28}
            headerHeight={28}
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              backgroundColor: "white",
              margin: "auto",
              overflow: "hidden",
              "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
                {
                  color: "#fff",
                  opacity: 0.5,
                },
            }}
            // rows={[]}
            getRowId={(row) => row.id}
            rows={phoneReducer.isResult ? phoneReducer.isResult : []}
            columns={phoneColumns}
            hideFooterSelectedRowCount
            pageSize={15}
            rowsPerPageOptions={[15]}
            disableColumnMenu={true}
            loading={phoneReducer.isFetching}
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
              },
              toolbarExport: "ส่งออก",
              toolbarExportCSV: "ดาวน์โหลด Excel",
            }}
            columnBuffer={2}
            columnThreshold={2}
          />
        </BoxDataGrid>
      </Paper>
    </>
  );
}
