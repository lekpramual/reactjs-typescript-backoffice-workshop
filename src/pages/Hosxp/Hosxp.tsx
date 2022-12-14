import React, { useEffect } from "react";
// @router
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @day
import moment from "moment";

import { useDebounce } from "@react-hook/debounce";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Clear, Search } from "@mui/icons-material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

// @redux
import { useSelector, useDispatch } from "react-redux";
// @seletor
import {
  hosxpSelector,
  hosxpAll,
  hosxpSearch,
  hosxpDelete,
} from "@/store/slices/hosxpSlice";

// @component
import { NumberWithCommas } from "@/utils";

import {
  Typography,
  Stack,
  IconButton,
  TextField,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  Tooltip,
} from "@mui/material";

//@icons
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";

import { Box, Button, FormControl } from "@mui/material";
import { BoxDataGrid } from "@/styles/AppStyle";
import { CustomNoRowsOverlay } from "@/utils";

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}
function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        // p: 0.5,
        pb: 1.5,
      }}
    >
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
          placeholder="ค้นหา รหัส Hosxp"
          size="small"
          InputProps={{
            startAdornment: <Search fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? "visible" : "hidden" }}
                onClick={props.clearSearch}
              >
                <Clear fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{
            width: {
              xs: 1,
              sm: "auto",
            },
            m: (theme) => theme.spacing(1, 0.5, 1.5),
            "& .MuiSvgIcon-root": {
              mr: 0.5,
            },
            "& .MuiInput-underline:before": {
              borderBottom: 1,
              borderColor: "divider",
            },
          }}
        />
      </FormControl>
    </Box>
  );
}

const MySwal = withReactContent(Swal);

export default function Hosxp() {
  const dispatch = useDispatch<any>();
  const hosxpReducer = useSelector(hosxpSelector);
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  // คอลัมข้อมูลการแสดง
  const hosxpColumns = [
    {
      headerName: "วันที่และเวลา",
      field: "ksklogintime",
      flex: 1,
      headerClassName:
        "bg-[#36474f] text-[#fff] text-[14px] h-[36px]  fill-[#fff] ",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {moment(value).format("DD/MM/YYYY HH:mm:ss")}
        </Typography>
      ),
    },
    {
      headerName: "รหัส Hosxp",
      field: "kskloginname",
      flex: 1,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ชื่อคอมพิวเตอร์",
      field: "loginname",
      flex: 1,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ชื่อผู้ใช้งาน",
      field: "full_name",
      flex: 1,
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
      minWidth: 70,
      maxWidth: 70,
      type: ".",
      align: "center" as "center",
      sortable: false,
      headerClassName: "text-center bg-[#36474f] text-[#fff] text-[14px]",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          <Tooltip title="ปลดล็อก">
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
                // setSelectedProduct(row);
                // console.log(row);
                // setOpenDialog(true);
                Swal.fire({
                  title: "คุณต้องปลดล็อก ใช่ หรือ ไม่?",
                  text: `ปลดล็อก รหัส : ${row.kskloginname} - ${row.full_name}.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "ใช่, ต้องการลบ!",
                  cancelButtonText: "ไม่, ยกเลิก!",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    // ลบข้อมูล ตาม รหัส hosxp
                    dispatch(hosxpDelete({ id: row.kskloginname }));
                    // รีโหลดข้อมูลใหม่
                    dispatch(hosxpAll());
                    // เคียสค่า การค้นหา
                    setKeywordSearch("");

                    MySwal.fire({
                      icon: "success",
                      title: "ปลดล็อกข้อมูลเรียบร้อย",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
              }}
            >
              <DeleteTwoToneIcon color="inherit" />
            </Button>
          </Tooltip>
        </Stack>
      ),
    },
  ];
  // โหลดข้อมูลเริ่มต้น
  useEffect(() => {
    dispatch(hosxpAll());
  }, [dispatch]);
  // โหลดข้อมูลการค้นหา
  useEffect(() => {
    // โหลดข้อมูล กรณี มีการค้นหาเท่านั้น
    if (keywordSearch !== "") {
      dispatch(hosxpSearch({ keyword: keywordSearch }));
    }
  }, [dispatch, keywordSearch]);

  return (
    <>
      <Paper
        sx={{
          maxWidth: "100%",
          // minHeight: "100%",
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
                  <LockOpenTwoToneIcon /> รายการเข้าใช้งาน (Hosxp)
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <BoxDataGrid>
          <DataGrid
            autoHeight
            components={{
              Toolbar: QuickSearchToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            componentsProps={{
              toolbar: {
                value: keywordSearchNoDelay,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setKeywordSearch(e.target.value);
                  setKeywordSearchNoDelay(e.target.value);
                },
                clearSearch: () => {
                  // รีโหลดข้อมูลทั้งหมดใหม่
                  dispatch(hosxpAll());
                  setKeywordSearch("");
                  setKeywordSearchNoDelay("");
                },
              },
            }}
            sx={{
              // border-top-left-radius
              backgroundColor: "white",
              // maxWidth: "100%",
              margin: "auto",
              overflow: "hidden",
              "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
                {
                  color: "#fff",
                  opacity: 0.5,
                },
            }}
            rows={hosxpReducer.isResult ? hosxpReducer.isResult : []}
            columns={hosxpColumns}
            pageSize={15}
            rowHeight={28}
            headerHeight={28}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[15]}
            disableColumnMenu={true}
            loading={hosxpReducer.isFetching}
            getRowId={(row) =>
              parseInt(row.kskloginname) + Math.random() * (100 - 1)
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
    </>
  );
}
