import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Tooltip from "@mui/material/Tooltip";
// @icons
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";

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
import {
  transferSelector,
  addTransfer,
  resetTransfer,
  deleteTransfer,
  transferAdd,
} from "@/store/slices/transferSlice";

import { companySelector, companyAll } from "@/store/slices/companySlice";
import { categoryAll } from "@/store/slices/categorySlice";
import {
  equipmentCartSelector,
  addEquipmentCartEdit,
  resetEquipmentCartEdit,
  deleteEquipmentCart,
  resetEquipmentCart,
} from "@/store/slices/equipmentCartSlice";

// @component cart
import TransferCreateForm from "./TransferCreateForm";
import { equipmentAdd } from "../../store/slices/equipmentSlice";

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
        รวม : {NumberWithCommas(props.total)}
      </Typography>
    </Box>
  );
}

interface FilmOptionType {
  inputValue?: string;
  label: string;
  value?: number;
}

const filter = createFilterOptions<FilmOptionType>();

export default function TransferCreate() {
  const formRef = useRef<any>();

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [total, setTotal] = React.useState(0);
  const [openDialogCreate, setOpenDialogCreate] =
    React.useState<boolean>(false);

  const departmentReducer = useSelector(departmentSelector);
  const companyReducer = useSelector(companySelector);

  const equipmentCartReducer = useSelector(equipmentCartSelector);
  const transferReducer = useSelector(transferSelector);

  const dataColumns = [
    {
      headerName: "เลขทะเบียน",
      field: "product_no",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "เลขครุภัณฑ์",
      field: "product_inventory_number",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value !== null ? value : "-"}
        </Typography>
      ),
    },
    {
      headerName: "เลขที่บันทึก",
      field: "equipment_no_txt",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "หมวดหมู่",
      field: "category_name",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "รายการอุปกรณ์",
      field: "product_title",
      flex: 1,
      minWidth: 364,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px] " noWrap>
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ที่อยู่เดิม",
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
      headerName: "จัดการ",
      field: ".",
      width: 64,
      sortable: false,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName:
        "text-center bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          <Tooltip title="ยกเลิกข้อมูล">
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
                  title: "คุณต้องการลบ ใช่ หรือ ไม่?",
                  text: `คุณไม่สามารถกู้คืนรายการ ${row.product_no} ที่ถูกลบได้.! `,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "ใช่, ต้องการลบ!",
                  cancelButtonText: "ไม่, ยกเลิก!",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteTransfer(row.product_id));
                    MySwal.fire({
                      icon: "success",
                      title: "ลบข้อมูลเรียบร้อย",
                      showConfirmButton: false,
                      timer: 1000,
                    });
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

  const initialTransferValues: any = {
    transfer_depart: {
      label: "--เลือกหน่วยงานที่บันทึก--",
      value: 0,
    }, // หน่วยงาน *

    transfer_title: "", // เรื่องที่บันทึก
    transfer_member: "", // ผู้บันทึกข้อความ
    transfer_date: new Date(), // วันที่บันทึก
    transfer_note: "", // รายละเอียด
    transfer_file: "-", // ไฟล์อัปโหลด
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  const reverseArrayInPlace = (departNew, productObj) => {
    return productObj.map((item) => {
      return {
        product_id: `${item.product_id}`,
        transfer_detail_default_depart: `${item.product_depart}`,
        transfer_detail_new_depart: `${departNew.value}`,
      };
    });
  };

  function optionNewDeparts() {
    const departs = [{ label: "--เลือกหน่วยงานที่บันทึก--", value: 0 }];
    if (departmentReducer.isResult) {
      departmentReducer.isResult.map((i, index) => {
        return departs.push({
          label: `(${i.CCID}) - ${i.dept_name}`,
          value: i.dept_id,
        });
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
          <Grid item lg={12} md={12} xs={12}>
            <FormControl
              fullWidth
              size="small"
              required
              error={errors.transfer_title && touched.transfer_title && true}
            >
              <InputLabel htmlFor="transfer_title">เรื่องที่บันทึก</InputLabel>
              <Field
                as={OutlinedInput}
                id="transfer_title"
                name="transfer_title"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                label="เรื่องที่บันทึก"
                size="small"
                placeholder="กรอก เรื่องที่บันทึก"
              />
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl
              fullWidth
              size="small"
              error={errors.transfer_depart && touched.transfer_depart && true}
            >
              <Autocomplete
                value={values.transfer_depart}
                noOptionsText={"ไม่มีข้อมูล"}
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
                    setFieldValue("transfer_depart", newValue);
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
                    name="transfer_depart"
                    id="transfer_depart"
                    label={"ที่เก็บใหม่"}
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
              fullWidth
              size="small"
              required
              error={errors.transfer_member && touched.transfer_member && true}
            >
              <InputLabel id="transfer_member">ผู้บันทึก</InputLabel>
              <Field
                as={OutlinedInput}
                id="transfer_member"
                name="transfer_member"
                label="ผู้บันทึก"
                size="small"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="กรอก ผู้บันทึกข้อความ"
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
                  label="วันที่บันทึก"
                  inputFormat="dd/MM/yyyy"
                  value={values.transfer_date}
                  onChange={(newValue: Date | null) => {
                    setFieldValue("transfer_date", newValue, true);
                  }}
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      name="transfer_date"
                      {...params}
                      size="small"
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item lg={12} md={12} xs={12}>
            <Field
              id="transfer_note"
              name="transfer_note"
              size="small"
              placeholder="รายละเอียดเพิ่มเติม"
              component={TextareaAutosize}
              minRows={2}
              style={{ width: "100%" }}
              onChange={(e) => {
                setFieldValue("transfer_note", e.target.value);
              }}
              value={values.transfer_note}
            />
            {/* <FormControl fullWidth size="small">
              <InputLabel htmlFor="transfer_note">รายละเอียด</InputLabel>
              <Field
                as={OutlinedInput}
                id="transfer_note"
                name="transfer_note"
                size="small"
                label="รายละเอียด"
                startAdornment={
                  <EditTwoToneIcon color="inherit" sx={{ display: "block" }} />
                }
                placeholder="รายละเอียดเพิ่มเติม"
              />
            </FormControl> */}
          </Grid>
          <Grid item lg={12} md={12} xs={12} sx={{ mb: 1 }}>
            <Box sx={{ flexDirection: "row" }}>
              <Button variant="contained" component="label" size="small">
                <AttachFileTwoToneIcon /> แนบไฟล์
                <Input
                  hidden
                  accept="application/pdf"
                  multiple
                  type="file"
                  name="transfer_file"
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
    } else if (values.transfer_file !== "-") {
      return (
        <a
          href={`${server.BACKOFFICE_URL_File}/${values.transfer_file}`}
          target="_blank"
          rel="noreferrer"
          className="ml-2"
        >
          <Typography variant="body2" component={"b"} className="ml-2">
            {values.transfer_file}
          </Typography>
        </a>
      );
    } else {
      return (
        <Typography variant="body2" component={"b"} className="ml-2">
          เลือกไฟล์ PDF
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); 

  useEffect(() => {
  }, [transferReducer.isResultView]);

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

        <Typography
          color="text.primary"
          variant="subtitle2"
          component={Link}
          to="/app3/equipment"
        >
          รายการโอนย้ายอุปกรณ์
        </Typography>

        <Typography color="text.primary" variant="subtitle2">
          เพิ่มรายการโอนย้ายอุปกรณ์
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
                  <AppRegistrationTwoToneIcon /> วิธีการได้มา
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
                  ย้อนกลับ
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Formik
          innerRef={formRef}
          validate={(values) => {
            let errors: any = {};

            if (values.transfer_depart === null) errors.transfer_depart = " ";

            if (!values.transfer_depart.value) {
              errors.transfer_depart = " ";
            }

            if (values.transfer_depart.value === 0) {
              errors.transfer_depart = " ";
            }

            if (!values.transfer_title)
              errors.transfer_title = "กรอกเรื่องที่บันทึก";

            if (!values.transfer_member)
              errors.transfer_member = "กรอกผู้บันทึกข้อความ";

            return errors;
          }}
          initialValues={initialTransferValues}
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            console.log(values);
            if (transferReducer.isResultView.length !== 0) {
              const newArrayProduct = reverseArrayInPlace(
                values.transfer_depart,
                transferReducer.isResultView
              );
              formData.append("transfer_title", values.transfer_title);
              formData.append("transfer_depart", values.transfer_depart.value);
              formData.append("transfer_member", values.transfer_member);
              formData.append(
                "transfer_date",
                moment(values.transfer_date).format("YYYY-MM-DD")
              );
              formData.append("transfer_note", values.transfer_note);
              formData.append("transfer_status", "รอดำเนินการ");
              formData.append("transfer_file", values.file);
              formData.append(
                "transfer_detail",
                JSON.stringify(newArrayProduct)
              );

              // บันทึกข้อมูล
              dispatch(transferAdd({ formData: formData, navigate: navigate }));
              dispatch(resetTransfer());
              resetForm();
            } else {
              let message = "กรุณาทำการเพิ่มรายการอุปกรณ์";
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

      {/* ตาราง: รายละเอียดโอนย้ายอุปกรณ์  */}
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
                  <AppRegistrationTwoToneIcon /> รายการอุปกรณ์
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
                  เพิ่ม
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <BoxDataGrid>
          <DataGrid
            autoHeight
            rowHeight={28}
            headerHeight={28}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            // sx={{
            //   minHeight: 505,
            // }}
            rows={
              transferReducer.isResultView ? transferReducer.isResultView : []
            }
            // rows={[]}
            columns={dataColumns}
            pageSize={15}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[15]}
            disableColumnMenu={true}
            // loading={hosxpReducer.isFetching}
            getRowId={(row) =>
              // parseInt(row.kskloginname) + Math.random() * (100 - 1)
              row.product_id
            }
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>

      {/* ปุ่ม: บันทึกโอนย้ายอุปกรณ์  */}
      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={6} className="text-right" item>
          <Button
            variant="contained"
            color="error"
            className="w-[128px] "
            onClick={() => resetForm()}
          >
            <RestartAltTwoToneIcon />
            ยกเลิก
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
            บันทึก
          </Button>
        </Grid>
      </Grid>
      <TransferCreateForm show={openDialogCreate} confirm={onConfirm} />
    </Box>
  );
}
