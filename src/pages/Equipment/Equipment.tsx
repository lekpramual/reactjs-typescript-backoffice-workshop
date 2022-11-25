import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// @mui
import { Box, Button, Breadcrumbs } from "@mui/material";
// @redux
import { useSelector, useDispatch } from "react-redux";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// @seletor
import {
  equipmentSelector,
  equipmentAll,
  equipmentDeleteById,
} from "@/store/slices/equipmentSlice";
// @mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
// @icons
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";

// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @day
import moment from "moment";
// @components
import EquipmentFormSearch from "./EquipmentFormSearch";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const MySwal = withReactContent(Swal);

export default function Equipment() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const equipmentReducer = useSelector(equipmentSelector);

  // คอลัมข้อมูลการแสดง
  const dataColumns = [
    {
      headerName: "เรื่องที่บันทึก",
      field: "equipment_title",
      // flex: 1,
      width: 428,
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
      // flex: 1,
      width: 428,
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
      minWidth: 164,
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
            {row.equipment_status === "รับเข้า" ? (
              <span>
                <Button
                  sx={{
                    minWidth: "30px",
                  }}
                  type="submit"
                  color="success"
                  variant="contained"
                  className="hover:text-[#fce805] w-[30px] h-[26px] mr-1"
                  size="small"
                  disabled
                >
                  <EditTwoToneIcon fontSize="inherit" />
                </Button>{" "}
              </span>
            ) : (
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
            )}
          </Tooltip>

          <Tooltip title="ยกเลิกข้อมูล">
            {row.equipment_status === "รับเข้า" ? (
              <span>
                <Button
                  sx={{
                    minWidth: "30px",
                  }}
                  type="submit"
                  color="error"
                  variant="contained"
                  className="hover:text-[#fce805] w-[30px] h-[26px]"
                  size="small"
                  disabled
                >
                  <DeleteTwoToneIcon fontSize="inherit" />
                </Button>
              </span>
            ) : (
              <Button
                sx={{
                  minWidth: "30px",
                }}
                type="submit"
                color="error"
                variant="contained"
                className="hover:text-[#fce805] w-[30px] h-[26px]"
                size="small"
                disabled={row.equipment_status === "รับเข้า" ? true : false}
                onClick={() => {
                  Swal.fire({
                    title: "คุณต้องการลบ ใช่ หรือ ไม่?",
                    text: `คุณไม่สามารถกู้คืนรายการ ${row.equipment_title} ที่ถูกลบได้.! `,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ใช่, ต้องการลบ!",
                    cancelButtonText: "ไม่, ยกเลิก!",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      console.log(row.equipment_id);
                      // ลบข้อมูล
                      dispatch(
                        equipmentDeleteById({ search: row.equipment_id })
                      );
                      // โหลดข้อมูลทั้งหมด
                      dispatch(equipmentAll());
                      MySwal.fire({
                        icon: "success",
                        title: "ลบข้อมูลเรียบร้อย",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  });
                }}
              >
                <DeleteTwoToneIcon fontSize="inherit" />
              </Button>
            )}
          </Tooltip>
        </Stack>
      ),
    },
  ];
  useEffect(() => {
    dispatch(equipmentAll());
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
        <EquipmentFormSearch />
        {/* <Formik
          validate={(values) => {
            let errors: any = {};

            return errors;
          }}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(equipmentSearch({ search: values, navigate: navigate }));
            setSubmitting(false);
          }}
        >
          {(props) => showFormSearch(props)}
        </Formik> */}
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

      {/* {showDialogRemove()} */}
    </Box>
  );
}
