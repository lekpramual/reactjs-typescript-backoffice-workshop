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
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";

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
import ProductFormSearch from "./ProductFormSearch";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function Product() {
  const navigate = useNavigate();
  const productReducer = useSelector(productSelector);

  const dataColumns = [
    {
      headerName: "เลขที่ใบรับ",
      field: "equipment_no",
      flex: 1,
      minWidth: 128,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Link
          to={`/app3/equipment/view?id=${row.product_equipment}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
      ),
    },
    {
      headerName: "เลขทะเบียน",
      field: "product_no",
      flex: 1,
      minWidth: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Link
          to={`/app3/product/view?id=${row.product_id}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
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
  useEffect(() => {}, [productReducer.isResult]);

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
          รายการอุปกรณ์
        </Typography>
      </Breadcrumbs>

      <Paper
        // 936 "100%"
        sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden", mb: "8px" }}
      >
        <ProductFormSearch />
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
            <Grid container alignItems="center">
              <Grid xs={12}>
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
            rows={productReducer.isResult ? productReducer.isResult : []}
            // rows={[]}
            columns={dataColumns}
            pageSize={15}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[15]}
            disableColumnMenu={true}
            loading={productReducer.isFetching}
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
    </Box>
  );
}
