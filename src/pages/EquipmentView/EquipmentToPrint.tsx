import React from "react";
// @mui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// @constats
import { server } from "@/constants";
// @utils
import { NumberWithCommas } from "@/utils";
// @day
import moment from "moment";

import Barcode from "react-barcode";

type MyProps = {
  // using `interface` is also ok
  dataEquipment: any;
  dataEquipmentDetail: any;
};

function useBarcode(txtBarcode) {
  return <Barcode value={txtBarcode && txtBarcode} height={36} fontSize={14} />;
}

class EquipmentToPrint extends React.Component<MyProps> {
  state = {
    total: 0,
  };
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
              <Grid
                xs={12}
                xsOffset={0}
                md={12}
                mdOffset={0}
                sx={{
                  textAlign: "left",
                  marginTop: -2,
                }}
              >
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                >
                  {useBarcode(data.equipment_no)}
                </Typography>
              </Grid>

              <Grid
                xs={12}
                xsOffset={0}
                md={12}
                mdOffset={0}
                sx={{
                  textAlign: "center",
                  marginTop: -2,
                }}
              >
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  ใบตรวจรับอุปกรณ์
                </Typography>
              </Grid>

              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  เรื่องที่บันทึก
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {data.equipment_title}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  เลขที่บันทึก
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {data.equipment_no_txt}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  ประเภทการซื้อ
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {data.equipment_type}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  หน่วยงานที่ซื้อ
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {data.dept_name}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  ผู้บันทึกข้อความ
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {data.equipment_member}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  ผู้รับสินค้า
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {data.equipment_member_get}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  วันที่บันทึกข้อความ
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {moment(data.equipment_date).format("DD/MM/yyyy")}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  วันที่รับสินค้า
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {moment(data.equipment_date_get).format("DD/MM/yyyy")}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  ซื้อจาก
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {data.company_name}
                </Typography>
              </Grid>
              <Grid xs={6} xsOffset={0} md={4} mdOffset={2}>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  ไฟล์แนบ
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
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
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  รายละเอียด
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                  className="mt-[-2px] text-slate-500 hover:text-blue-600"
                >
                  {data.equipment_note}
                </Typography>
              </Grid>
            </Grid>
          );
        })}

        <TableContainer>
          <Table
            sx={{ minWidth: 700 }}
            size="small"
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={3}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  รายละเอียด
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  ราคา
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                >
                  ชื่อรายการ
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                >
                  จำนวน.
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                >
                  ราคา/หน่วย
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                  }}
                >
                  ราคารวม
                </TableCell>
              </TableRow>
            </TableHead>
            {/* {JSON.stringify(dataEquipmentDetail)} */}
            <TableBody>
              {dataEquipmentDetail.map((row) => {
                return (
                  <TableRow key={row.equipment_detail_title}>
                    <TableCell
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "14px",
                      }}
                    >
                      {row.equipment_detail_title}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "14px",
                      }}
                    >
                      {row.equipment_detail_qty}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "14px",
                      }}
                    >
                      {NumberWithCommas(row.equipment_detail_price | 0)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "14px",
                      }}
                    >
                      {NumberWithCommas(row.equipment_detail_price_total | 0)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell
                  colSpan={2}
                  align="right"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  รวม
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  {NumberWithCommas(total | 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default EquipmentToPrint;
