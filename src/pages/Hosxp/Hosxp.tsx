import React, { useEffect } from "react";
// @router
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

// @day
import moment from "moment";

import { useDebounce } from "@react-hook/debounce";

import { Clear, Search } from "@mui/icons-material";

import DeleteIcon from "@mui/icons-material/Delete";

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
import { numberWithCommas } from "@/utils";
// @type
import { HosxpDelete } from "@/types";

import {
  Typography,
  Stack,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

import { Box, Button, FormControl } from "@mui/material";

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

export default function Hosxp() {
  const dispatch = useDispatch<any>();
  const hosxpReducer = useSelector(hosxpSelector);
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");
  const [selectedProduct, setSelectedProduct] =
    React.useState<HosxpDelete | null>(null);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

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
      headerName: "ชื่อผู้ใช้งาน",
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
      headerName: "ACTION",
      field: ".",
      width: 120,
      sortable: false,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          {/* <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              navigate("/stock/edit/" + row.id);
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton> */}
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              console.log(row);
              setSelectedProduct(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
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

  // ฟังก์ชั่น ยืนยันการลบข้อมูล
  const handleDeleteConfirm = () => {
    // ลบข้อมูล ตาม รหัส hosxp
    dispatch(hosxpDelete({ id: selectedProduct!.kskloginname! }));
    // รีโหลดข้อมูลใหม่
    dispatch(hosxpAll());
    // เคียสค่า การค้นหา
    setKeywordSearch("");
    // ปิด ป๊อปอัพ
    setOpenDialog(false);
  };

  const showDialog = () => {
    if (selectedProduct === null) {
      return "";
    }

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
          ยืนยันการ ปลดล็อก รหัส Hosxp? : {selectedProduct.kskloginname}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          คุณไม่สามารถกู้คืนผลิตภัณฑ์ที่ถูกลบได้.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            ยกเลิก
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      {/* 936  width: "100%"*/}
      <Box
        style={{ height: "100%", maxWidth: "100%" }}
        sx={{
          "& .MuiDataGrid-root .MuiDataGrid-columnHeaders": {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          },
          "& .MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer":
            {
              color: "#fff",
              width: "auto",
              visibility: "visible",
            },
          "& .MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon":
            {
              color: "#fff",
              opacity: 0.5,
            },

          "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
            {
              color: "#fff",
              opacity: 0.5,
            },
        }}
      >
        <DataGrid
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
          pageSize={20}
          rowHeight={36}
          headerHeight={36}
          hideFooterSelectedRowCount
          rowsPerPageOptions={[20]}
          disableColumnMenu={true}
          loading={hosxpReducer.isFetching}
          getRowId={(row) => parseInt(row.kskloginname) + Math.random() * (100 - 1)}
          localeText={{
            MuiTablePagination: {
              labelDisplayedRows: ({ from, to, count }) =>
                `${from} ถึง ${to} จาก ${numberWithCommas(count)}`,
            },
          }}
        />
      </Box>

      {showDialog()}
    </>
  );
}
