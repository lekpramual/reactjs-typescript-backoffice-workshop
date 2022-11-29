import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// @mui
import { Box, Breadcrumbs, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
// @icons
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ContentPasteGoTwoToneIcon from "@mui/icons-material/ContentPasteGoTwoTone";
// @icons
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import ToggleOnTwoToneIcon from "@mui/icons-material/ToggleOnTwoTone";
// @redux
import { useSelector } from "react-redux";
// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @seletor
import { productSelector } from "@/store/slices/productSlice";
import TransferFormSearch from "./TransferFormSearch";
// @day
import moment from "moment";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function Transfer() {
  const navigate = useNavigate();
  const productReducer = useSelector(productSelector);

  useEffect(() => {}, [productReducer.isResult]);

  const rowData = [
    {
      transfer_id: 1,
      transfer_no: "TRA65110001",
      transfer_depart: "ศูนย์คอมพิวเตอร์",
      transfer_depart_move: "X-Ray ชั้น 2 ตึกจุฬาภรณ์",
      transfer_file: "TRA65110001.pdf",
      transfer_status: "โอนย้ายเรียบร้อย",
      transfer_date: "2022-10-18T04:39:02.000Z",
    },
    {
      transfer_id: 2,
      transfer_no: "TRA65110002",
      transfer_depart: "ศูนย์คอมพิวเตอร์",
      transfer_depart_move: "X-Ray ชั้น 2 ตึกจุฬาภรณ์",
      transfer_file: "TRA65110002.pdf",
      transfer_status: "โอนย้ายเรียบร้อย",
      transfer_date: "2022-10-18T04:39:02.000Z",
    },
  ];
  const dataColumns = [
    {
      headerName: "เลขที่ใบโอน",
      field: "transfer_no",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Link
          to={`/app3/equipment/view?id=${row.transfer_id}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
      ),
    },
    {
      headerName: "หน่วยงานที่เก็บเดิม",
      field: "transfer_depart",
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
      headerName: "หน่วยงานที่เก็บใหม่",
      field: "transfer_depart_move",
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
      headerName: "วันที่",
      field: "transfer_date",
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
      headerName: "สถานะ",
      field: "product_status",
      // flex: 1,
      width: 96,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Typography
          variant="body1"
          className={
            row.product_status === "เปิดใช้งาน"
              ? "text-[14px] text-green-500"
              : "text-[14px] text-red-500"
          }
        >
          {/* {value} */}
          {row.product_status === "เปิดใช้งาน" ? (
            <ToggleOnTwoToneIcon />
          ) : (
            <ToggleOffTwoToneIcon />
          )}
        </Typography>
      ),
    },
    {
      headerName: "จัดการ",
      field: ".",
      // flex: 1,
      width: 96,
      sortable: false,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName: "text-center bg-[#36474f] text-[#fff] text-[14px] ",
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
                navigate("/app3/product/view?id=" + row.product_id);
              }}
            >
              <VisibilityTwoToneIcon fontSize="inherit" />
            </Button>
          </Tooltip>
          {row.product_status === "เปิดใช้งาน" ? (
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
                  navigate("/app3/product/edit?id=" + row.product_id);
                }}
              >
                <EditTwoToneIcon fontSize="inherit" />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="ปิดการใช้งาน">
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
                </Button>
              </span>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ];

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
          รายการ โอน-ย้าย อุปกรณ์
        </Typography>
      </Breadcrumbs>

      <Paper
        // 936 "100%"
        sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden", mb: "8px" }}
      >
        <TransferFormSearch />
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
                  <ContentPasteGoTwoToneIcon /> รายการ โอน-ย้าย อุปกรณ์
                </Typography>
              </Grid>
              <Grid xs={6} className="text-right">
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mr: 1, mb: 1 }}
                  color="success"
                  className="w-[128px]"
                  component={Link}
                  to="/app3/transfer/create"
                >
                  <AddTwoToneIcon />
                  เพิ่มใบโอน
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* {JSON.stringify(productReducer.isResult)} */}
        <BoxDataGrid>
          <DataGrid
            rowHeight={28}
            headerHeight={28}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              minHeight: 505,
            }}
            rows={rowData ? rowData : []}
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
                  `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
              },
            }}
          />
        </BoxDataGrid>
      </Paper>
    </Box>
  );
}
