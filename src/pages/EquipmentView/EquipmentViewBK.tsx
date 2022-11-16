import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// @mui
import { Box, Button, Breadcrumbs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

// @icons
// import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

// constats
import { server } from "@/constants";
// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
import { NumberWithCommas, CustomNoRowsOverlay } from "@/utils";
import { DataGrid } from "@mui/x-data-grid";

// @day
import moment from "moment";

// @redux
import { useSelector, useDispatch } from "react-redux";

// @seletor
import {
  equipmentSelector,
  equipmentSearchById,
  equipmentSearchByIdV2,
} from "@/store/slices/equipmentSlice";

import {
  equipmentDetailSelector,
  equipmentDetailAll,
} from "@/store/slices/equipmentDetailSlice";

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
  const dispatch = useDispatch<any>();
  const equipmentReducer = useSelector(equipmentSelector);

  const [total, setTotal] = React.useState(0);

  const dataColumns = [
    {
      headerName: "ชื่อรายการ",
      field: "equipment_detail_title",
      flex: 1,
      minWidth: 364,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
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
      minWidth: 156,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "ชนิดวัสดุ/ครุภัณฑ์",
      field: "equipment_detail_material_type",
      flex: 1,
      minWidth: 156,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {value}
        </Typography>
      ),
    },
    {
      headerName: "จำนวน",
      field: "equipment_detail_qty",
      type: "number",
      flex: 1,
      minWidth: 64,
      align: "center" as "center",
      headerAlign: "center" as "center",
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
    {
      headerName: "ราคา/หน่วย",
      field: "equipment_detail_price",
      flex: 1,
      minWidth: 96,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
    {
      headerName: "ราคารวม",
      field: "equipment_detail_price_total",
      flex: 1,
      minWidth: 96,
      headerClassName: "bg-[#36474f] text-[#fff] text-[14px] ",
      sortable: false,
      renderCell: ({ value }: any) => (
        <Typography variant="body1" className="text-[14px]">
          {NumberWithCommas(value)}
        </Typography>
      ),
    },
  ];

  useEffect(() => {
    let id = query.get("id") || "";
    dispatch(equipmentSearchById({ search: id }));
  }, [dispatch, query]);

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
              {equipmentReducer.isResult
                ? equipmentReducer.isResult.map((data) => data.equipment_no)
                : ""}
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
            <ArrowBackTwoToneIcon />
            ย้อนกลับ
          </Button>
        </Grid>
      </Grid>

      {equipmentReducer.isResult
        ? equipmentReducer.isResult.map((data) => {
            return (
              <Paper
                sx={{
                  maxWidth: "100%",
                  margin: "auto",
                  overflow: "hidden",
                  mb: 2,
                }}
                key={data.equipment_id}
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
                      {data.equipment_title}
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
                      {data.equipment_no_txt}
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
                      {data.equipment_type}
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
                      {data.dept_name}
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
                      {data.equipment_member}
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
                      {data.equipment_member_get}
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
                      {moment(data.equipment_date).format("DD/MM/yyyy")}
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
                      {moment(data.equipment_date_get).format("DD/MM/yyyy")}
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
                      {data.company_name}
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
                      {data.equipment_file !== "" ? (
                        <a
                          href={`${server.BACKOFFICE_URL_File}/${data.equipment_file}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.equipment_file}
                        </a>
                      ) : (
                        "-"
                      )}
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
                      {data.equipment_note}
                    </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <BoxDataGrid>
                      <DataGrid
                        rowHeight={26}
                        headerHeight={26}
                        autoHeight
                        components={{
                          Footer: CustomFooterTotal,
                          NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        componentsProps={{
                          footer: { total },
                        }}
                        onStateChange={(state) => {
                          const total = data.equipment_detail
                            ? data.equipment_detail
                                .map(
                                  (item) => item.equipment_detail_price_total
                                )
                                .reduce((a, b) => a + b, 0)
                            : // console.log(total);
                              0;
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
                        rows={
                          data.equipment_detail ? data.equipment_detail : []
                        }
                        columns={dataColumns}
                        pageSize={10}
                        hideFooterSelectedRowCount
                        rowsPerPageOptions={[10]}
                        disableColumnMenu={true}
                        // loading={equipmentReducer.isFetching}
                        getRowId={(row) =>
                          // parseInt(row.kskloginname) + Math.random() * (100 - 1)
                          row.equipment_detail_id
                        }
                        localeText={{
                          MuiTablePagination: {
                            labelDisplayedRows: ({ from, to, count }) =>
                              `${from} ถึง ${to} จาก ${NumberWithCommas(
                                count
                              )}`,
                          },
                        }}
                      />
                    </BoxDataGrid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })
        : []}

      {/* <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={12} className="text-center">
          <Button
            variant="contained"
            className="w-[256px] bg-blue-500 hover:bg-blue-600"
          >
            <PrintTwoToneIcon />
            ปริ้นรายการอุปกรณ์
          </Button>
        </Grid>
      </Grid> */}
    </Box>
  );
}
