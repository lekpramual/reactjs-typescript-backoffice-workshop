import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "@react-hook/debounce";
// @mui
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
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
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";
// @redux
import { useSelector, useDispatch } from "react-redux";
// @constats
import { server } from "@/constants";
// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
// @alert
import { Clear, Search } from "@mui/icons-material";

// @utils
import { CustomNoRowsOverlay, NumberWithCommas } from "@/utils";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
// @seletor
import {
  documentSelector,
  documentAll,
  documentSearch,
} from "@/store/slices/documentSlice";
// @day
import moment from "moment";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

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
          placeholder="ค้นหา เลขที่หนังสือ, เรื่อง, หน่วยงาน"
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

export default function Document() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const documentReducer = useSelector(documentSelector);

  const dataColumns = [
    {
      headerName: "เลขที่เอกสาร",
      field: "document_no",
      width: 124,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: true,
      renderCell: ({ value, row }: any) => (
        <Link
          to={`/app3/document/edit?id=${row.document_id}`}
          className="text-cyan-500 hover:text-cyan-600"
        >
          {value}
        </Link>
      ),
    },
    {
      headerName: "เลขที่หนังสือ",
      field: "document_no_txt",
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
      headerName: "เรื่อง",
      field: "document_title",
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
      field: "document_depart_name",
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
      headerName: "วันที่จัดเก็บเอกสาร",
      field: "document_date",
      width: 124,
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
      // flex: 1,
      width: 112,
      sortable: false,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName: "text-center bg-[#36474f] text-[#fff] text-[14px] ",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row" className="text-center">
          {row.document_file !== "" ? (
            <Tooltip title="ไฟล์แนบ">
              <a
                href={`${server.BACKOFFICE_URL_File}/${row.document_file}`}
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
                navigate("/app3/document/edit?id=" + row.document_id);
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
    dispatch(documentAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // โหลดข้อมูลการค้นหา
  useEffect(() => {
    // โหลดข้อมูล กรณี มีการค้นหาเท่านั้น
    if (keywordSearch !== "") {
      dispatch(documentSearch({ keyword: keywordSearch }));
    }
  }, [dispatch, keywordSearch]);

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
          รายการ เอกสาร
        </Typography>
      </Breadcrumbs>

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
                  <PostAddTwoToneIcon /> รายการ เอกสาร
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
                  to="/app3/document/create"
                >
                  <AddTwoToneIcon />
                  สร้างใหม่
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
                  dispatch(documentAll());
                  setKeywordSearch("");
                  setKeywordSearchNoDelay("");
                },
              },
            }}
            sx={{
              minHeight: 505,
            }}
            rows={documentReducer.isResult ? documentReducer.isResult : []}
            columns={dataColumns}
            pageSize={15}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[15]}
            disableColumnMenu={true}
            loading={documentReducer.isFetching}
            getRowId={(row) => row.document_id}
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
