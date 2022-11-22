import React from "react";
// @mui
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// constats
import { server } from "@/constants";

// @day
import moment from "moment";

// @styles
import { BoxDataGrid } from "@/styles/AppStyle";
import { NumberWithCommas, CustomNoRowsOverlay } from "@/utils";
import { DataGrid } from "@mui/x-data-grid";

type MyProps = {
  // using `interface` is also ok
  dataEquipment: any;
  dataEquipmentDetail: any;
};

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

class EquipmentToPrint extends React.Component<MyProps> {
  state = {
    total: 0,
  };

  //   add = (totalNumber) => {
  //     this.setState({
  //       total: totalNumber,
  //     });
  //   };

  getTotal = () => {
    const { dataEquipmentDetail } = this.props;
    const totalEquipmentDetail = dataEquipmentDetail
      ? dataEquipmentDetail
          .map((item) => item.equipment_detail_price_total)
          .reduce((a, b) => a + b, 0)
      : 0;
    return totalEquipmentDetail;
  };

  render() {
    const { dataEquipment, dataEquipmentDetail } = this.props;
    const total = this.getTotal();
    const dataColumns = [
      {
        headerName: "ชื่อรายการ",
        field: "equipment_detail_title",
        flex: 1,
        // maxWidth: 356,
        // minWidth: 256,
        headerClassName: "bg-[#36474f] text-[#fff] text-[14px]",
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
        // maxWidth: 124,
        // minWidth: 124,
        headerClassName: "bg-[#36474f] text-[#fff] text-[14px] w-[15%]",
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
        // maxWidth: 156,
        // minWidth: 124,
        headerClassName: "bg-[#36474f] text-[#fff] text-[14px] w-[25%]",
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
        // maxWidth: 96,
        // width: 96,
        align: "center" as "center",
        headerAlign: "center" as "center",
        headerClassName: "bg-[#36474f] text-[#fff] text-[14px] w-[10%]",
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
        maxWidth: 96,
        // minWidth: 56,
        // width: 96,
        headerClassName: "bg-[#36474f] text-[#fff] text-[14px] w-[10%]",
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
        maxWidth: 96,
        // minWidth: 56,
        // width: 96,
        headerClassName: "bg-[#36474f] text-[#fff] text-[14px] w-[10%]",
        sortable: false,
        renderCell: ({ value }: any) => (
          <Typography variant="body1" className="text-[14px]">
            {NumberWithCommas(value)}
          </Typography>
        ),
      },
    ];
    // const dataTotal = this.getTotal(dataEquipmentDetail);
    return (
      <div style={{ width: "100%" }} className="w-full">
        {dataEquipment.map((data) => {
          return (
            <Grid
              container
              spacing={2}
              sx={{ p: 2 }}
              key={`grid-content-view-${data.equipment_no}`}
            >
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
            </Grid>
          );
        })}
        <Grid xs={12}>
          <BoxDataGrid>
            <DataGrid
              rowHeight={28}
              headerHeight={28}
              autoHeight
              components={{
                Footer: CustomFooterTotal,
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              componentsProps={{
                footer: { total },
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
              rows={dataEquipmentDetail ? dataEquipmentDetail : []}
              // rows={[]}
              columns={dataColumns}
              pageSize={10}
              hideFooterSelectedRowCount
              rowsPerPageOptions={[10]}
              disableColumnMenu={true}
              //   loading={dataEquipmentDetail.isFetching}
              getRowId={(row) => row.equipment_detail_id}
              localeText={{
                MuiTablePagination: {
                  labelDisplayedRows: ({ from, to, count }) =>
                    `${from} ถึง ${to} จาก ${NumberWithCommas(count)}`,
                },
              }}
            />
          </BoxDataGrid>
        </Grid>
      </div>
    );
  }
}

export default EquipmentToPrint;
