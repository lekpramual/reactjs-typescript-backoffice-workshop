import React, { useEffect } from "react";
// @router
import { DataGrid } from "@mui/x-data-grid";

import { useDebounce } from "@react-hook/debounce";

import { Clear, Search } from "@mui/icons-material";

// @redux
import { useSelector, useDispatch } from "react-redux";

// @seletor
import { carSelector, carAll, carSearch } from "@/store/slices/carSlice";

// @component
import { NumberWithCommas } from "@/utils";

import { Typography, IconButton, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, FormControl } from "@mui/material";
import { BoxDataGrid } from "@/styles/AppStyle";

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}
function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0.5,
      }}
    >
      <FormControl sx={{ p: 0 }} fullWidth>
        <TextField
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
          placeholder="ค้นหา ทะเบียน"
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

export default function Car() {
  const dispatch = useDispatch<any>();
  const carReducer = useSelector(carSelector);
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  // คอลัมข้อมูลการแสดง
  const hosxpColumns = [
    {
      headerName: "ทะเบียนรถ",
      field: "licenseplate",
      flex: 1,
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
      headerName: "รายละเอียด",
      field: "comment",
      flex: 1,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: true,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
  ];
  // โหลดข้อมูลเริ่มต้น
  useEffect(() => {
    dispatch(carAll());
  }, [dispatch]);
  // โหลดข้อมูลการค้นหา
  useEffect(() => {
    // โหลดข้อมูล กรณี มีการค้นหาเท่านั้น
    if (keywordSearch !== "") {
      dispatch(carSearch({ keyword: keywordSearch }));
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
          <Toolbar className="pl-5 pr-2">
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle2" component="span">
                  รายการทะเบียนรถ
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* 936  width: "100%"*/}
        <BoxDataGrid>
          <DataGrid
            autoHeight
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              toolbar: {
                value: keywordSearchNoDelay,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setKeywordSearch(e.target.value);
                  setKeywordSearchNoDelay(e.target.value);
                },
                clearSearch: () => {
                  // รีโหลดข้อมูลทั้งหมดใหม่
                  dispatch(carAll());
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
            rows={carReducer.isResult ? carReducer.isResult : []}
            columns={hosxpColumns}
            pageSize={15}
            rowHeight={36}
            headerHeight={36}
            hideFooterSelectedRowCount
            rowsPerPageOptions={[15]}
            disableColumnMenu={true}
            loading={carReducer.isFetching}
            getRowId={(row) => row.blacklistid + Math.random() * (100 - 1)}
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
