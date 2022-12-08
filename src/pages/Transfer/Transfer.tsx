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
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ContentPasteGoTwoToneIcon from "@mui/icons-material/ContentPasteGoTwoTone";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";

// @redux
import { useSelector, useDispatch } from "react-redux";
// @constats
import { server } from "@/constants";
// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @seletor
import {
  transferSelector,
  transferAll,
  transferSearchById,
} from "@/store/slices/transferSlice";
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
  const dispatch = useDispatch<any>();
  const transferReducer = useSelector(transferSelector);

  const dataColumns = [
    {
      headerName: "เลขที่ใบโอน",
      field: "transfer_no",
      width: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Link
          to={`/app3/transfer/view?id=${row.transfer_id}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
      ),
    },
    {
      headerName: "เรื่องที่บันทึก",
      field: "transfer_title",
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
      headerName: "ผู้บันทึก",
      field: "transfer_member",
      flex: 1,
      minWidth: 164,
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
      field: "transfer_depart_name",
      flex: 1,
      minWidth: 512,
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
      width: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {moment(value).format("DD/MM/yyyy")}
        </Typography>
      ),
    },
    // {
    //   headerName: "สถานะ",
    //   field: "transfer_status",
    //   // flex: 1,
    //   width: 84,
    //   headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
    //   sortable: false,
    //   align: "center" as "center",
    //   headerAlign: "center" as "center",
    //   renderCell: ({ value, row }: any) => (
    //     <Typography
    //       variant="body1"
    //       className={
    //         row.transfer_status === "ยืนยันการโอน"
    //           ? "text-[14px] text-green-500"
    //           : "text-[14px] text-yellow-500"
    //       }
    //     >
    //       {/* {value} */}
    //       {row.transfer_status === "ยืนยันการโอน" ? (
    //         <CheckBoxTwoToneIcon />
    //       ) : (
    //         <CropDinTwoToneIcon />
    //       )}
    //     </Typography>
    //   ),
    // },
    {
      headerName: "จัดการ",
      field: ".",
      // flex: 1,
      width: 112,
      sortable: false,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName: "text-center bg-[#36474f] text-[#fff] text-[14px] ",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          <Tooltip title="ปริ้นข้อมูล">
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
                navigate("/app3/transfer/view?id=" + row.transfer_id);
              }}
            >
              <PrintTwoToneIcon fontSize="inherit" />
            </Button>
          </Tooltip>

          {row.transfer_file !== "" ? (
            <Tooltip title="ไฟล์แนบ">
              <a
                href={`${server.BACKOFFICE_URL_File}/${row.transfer_file}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  sx={{
                    minWidth: "30px",
                  }}
                  type="submit"
                  color="primary"
                  variant="contained"
                  className="hover:text-[#fce805] w-[30px] h-[26px] mr-1"
                  size="small"
                  onClick={() => {}}
                >
                  <AttachFileTwoToneIcon fontSize="inherit" />
                </Button>
              </a>
            </Tooltip>
          ) : (
            <Tooltip title="ไม่มีไฟล์แนบ">
              <span>
                <Button
                  sx={{
                    minWidth: "30px",
                  }}
                  type="submit"
                  color="primary"
                  variant="contained"
                  className="hover:text-[#fce805] w-[30px] h-[26px] mr-1"
                  size="small"
                  disabled
                >
                  <AttachFileTwoToneIcon fontSize="inherit" />
                </Button>
              </span>
            </Tooltip>
          )}

          <Tooltip title="ปรับปรุงข้อมูล">
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
                navigate("/app3/transfer/edit?id=" + row.transfer_id);
              }}
            >
              <EditTwoToneIcon fontSize="inherit" />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    dispatch(transferAll());
    dispatch(transferSearchById({ search: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
            rows={transferReducer.isResult ? transferReducer.isResult : []}
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
