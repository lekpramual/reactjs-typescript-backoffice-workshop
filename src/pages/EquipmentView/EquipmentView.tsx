import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// @mui
import { Box, Button, Breadcrumbs } from "@mui/material";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
import Grid from "@mui/material/Unstable_Grid2";

import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";

// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
import { NumberWithCommas, CustomNoRowsOverlay, NumberWithPad } from "@/utils";
import { DataGrid } from "@mui/x-data-grid";

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

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function EquipmentView() {
  const navigate = useNavigate();
  let query = useQuery();

  const [total, setTotal] = React.useState(0);
  // คอลัมข้อมูลการแสดง
  const dataValue = [
    {
      id: 1,
      name: "เครื่องคอมพิวเตอร์ สำหรับสำนักงาน จอขนาด 21.5 นิ้ว",
      groupName: "คอมพิวเตอร์",
      typeName: "พัสดุ/มีเลขครุภัณฑ์",
      qty: 2,
      price: 14480,
      priceTotal: 28960,
    },
  ];

  const dataColumns = [
    {
      headerName: "ชื่อรายการ",
      field: "name",
      flex: 1,
      minWidth: 364,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "หมวดหมู่",
      field: "groupName",
      flex: 1,
      minWidth: 156,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ชนิดวัสดุ/ครุภัณฑ์",
      field: "typeName",
      flex: 1,
      minWidth: 156,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "จำนวน",
      field: "qty",
      type: "number",
      flex: 1,
      minWidth: 64,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
    {
      headerName: "ราคา/หน่วย",
      field: "price",
      flex: 1,
      minWidth: 96,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
    {
      headerName: "ราคารวม",
      field: "priceTotal",
      flex: 1,
      minWidth: 96,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] h-[36px]",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
  ];

  return (
    <Box>
      <Grid container>
        <Grid xs={8}>
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
              รายการอุปกรณ์
            </Typography>

            <Typography
              color="text.primary"
              variant="subtitle2"
              sx={{
                textAlign: "center",
                // display: { xs: "none", md: "block" },
              }}
            >
              {NumberWithPad(query.get("id"), 4)}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid xs={4} className="text-right">
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
            <ArrowBackTwoToneIcon /> ย้อนกลับ
          </Button>
        </Grid>
      </Grid>

      <Paper
        sx={{ maxWidth: "100%", margin: "auto", overflow: "hidden", mb: 2 }}
        square
      >
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              เรื่องที่บันทึก
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              ขออนุมัติซื้ออุปกรณ์ระบบคิวบริการผู้ป่วยนอก
            </Typography>
          </Grid>
          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              เลขที่บันทึก
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              รอ 0032.102/97
            </Typography>
          </Grid>

          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              ประเภทการซื้อ
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              ซื้อตามแผน
            </Typography>
          </Grid>
          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              หน่วยงานที่ซื้อ
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              ศูนย์คอมพิวเตอร์
            </Typography>
          </Grid>

          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              ผู้บันทึกข้อความ
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              นางสาวนันทนิจ มีสวัสดิ์
            </Typography>
          </Grid>
          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              ผู้รับสินค้า
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              นายมนต์ชัย ศรีทอง
            </Typography>
          </Grid>

          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              วันที่บันทึกข้อความ
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              19/09/2022
            </Typography>
          </Grid>
          <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              วันที่รับสินค้า
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              13/10/2022
            </Typography>
          </Grid>

          <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              ซื้อจาก
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              บริษัท กรุงทองคอมพิวเตอร์ จำกัด
            </Typography>
          </Grid>
          <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              ไฟล์แนบ
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              -
            </Typography>
          </Grid>
          <Grid xs={12} xsOffset={0} md={10} mdOffset={2}>
            <Typography component={"div"} variant={"body1"}>
              รายละเอียด
            </Typography>
            <Typography
              component={"div"}
              variant={"body2"}
              className="mt-[-2px] text-slate-500 hover:text-blue-600"
            >
              -
            </Typography>
          </Grid>

          <Grid xs={12}>
            <BoxDataGrid>
              <DataGrid
                autoHeight
                components={{
                  Footer: CustomFooterTotal,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                componentsProps={{
                  footer: { total },
                }}
                onStateChange={(state) => {
                  const total = dataValue
                    .map((item) => item.priceTotal)
                    .reduce((a, b) => a + b, 0);
                  // console.log(total);
                  setTotal(total);
                }}
                sx={{
                  backgroundColor: "white",
                  height: 250,
                  width: "100%",
                  margin: "auto",
                  overflow: "hidden",
                  "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
                    {
                      color: "#fff",
                      opacity: 0.5,
                    },
                }}
                rows={dataValue ? dataValue : []}
                // rows={[]}
                columns={dataColumns}
                pageSize={10}
                rowHeight={36}
                headerHeight={36}
                hideFooterSelectedRowCount
                rowsPerPageOptions={[10]}
                disableColumnMenu={true}
                // loading={hosxpReducer.isFetching}
                getRowId={(row) =>
                  // parseInt(row.kskloginname) + Math.random() * (100 - 1)
                  row.id
                }
                localeText={{
                  MuiTablePagination: {
                    labelDisplayedRows: ({ from, to, count }) =>
                      `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
                  },
                }}
              />
            </BoxDataGrid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={12} className="text-center">
          <Button
            variant="contained"
            className="w-[256px] bg-blue-500 hover:bg-blue-600"
          >
            <PrintTwoToneIcon /> ปริ้นรายการอุปกรณ์
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
