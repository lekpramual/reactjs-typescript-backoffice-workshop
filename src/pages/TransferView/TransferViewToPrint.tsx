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

import Barcode from "react-barcode";

type MyProps = {
  // using `interface` is also ok
  data: any;
  dataDetail: any;
  dataEquipment: any;
  dataEquipmentDetail: any;
};

function useBarcode(txtBarcode) {
  return <Barcode value={txtBarcode && txtBarcode} height={36} fontSize={14} />;
}

class TransferViewToPrint extends React.Component<MyProps> {
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
    const { data, dataDetail } = this.props;

    // const dataTotal = this.getTotal(dataEquipmentDetail);
    return (
      <div style={{ width: "100%" }} className="w-full">
        {data.map((data) => {
          return (
            <Grid
              container
              spacing={2}
              sx={{ p: 2 }}
              key={`grid-content-view-${data.transfer_no}`}
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
                  {useBarcode(data.transfer_no)}
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
                  ใบรายการโอน - ย้ายครุภัณฑ์
                </Typography>
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "16px",
                  }}
                >
                  ศูนย์งานศูนย์คอมพิวเตอร์
                </Typography>
              </Grid>
              <Grid
                xs={12}
                xsOffset={0}
                md={12}
                mdOffset={0}
                sx={{
                  textAlign: "right",
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
                  แบบ พ.3203
                </Typography>
              </Grid>
            </Grid>
          );
        })}

        <TableContainer>
          <Table
            // style={{
            //   borderCollapse: "collapse",
            //   border: "medium none",
            // }}
            sx={{ minWidth: 700 }}
            size="small"
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                    width: "15px",
                  }}
                >
                  ลำดับ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                    width: "156px",
                  }}
                >
                  เลขครุภัณฑ์
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                    minWidth: 130,
                  }}
                >
                  รายการ
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                    minWidth: 180,
                  }}
                >
                  ที่เก็บเดิม
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Sarabun-R",
                    fontSize: "14px",
                    minWidth: 180,
                  }}
                >
                  ที่เก็บใหม่
                </TableCell>
              </TableRow>
            </TableHead>
            {/* {JSON.stringify(dataEquipmentDetail)} */}
            <TableBody>
              {dataDetail.map((row, index) => {
                return (
                  <TableRow key={`data-table-${row.transfer_detail_id}`}>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "12px",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "12px",
                      }}
                    >{`${
                      row.product_inventory_number !== "" &&
                      row.product_inventory_number !== null
                        ? row.product_inventory_number
                        : "-"
                    }`}</TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "12px",
                      }}
                    >
                      {row.product_title}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "12px",
                      }}
                    >
                      {row.transfer_detail_default_depart_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Sarabun-R",
                        fontSize: "12px",
                      }}
                    >
                      {row.transfer_detail_default_new_name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid
            xs={12}
            xsOffset={0}
            md={12}
            mdOffset={0}
            sx={{
              textAlign: "left",
            }}
          >
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
                marginTop: -1,
              }}
            >
              ตรวจสอบถูกต้องแล้ว
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ p: 2, mt: 2 }}
          key={`grid-content-view-single`}
        >
          <Grid
            xs={4}
            xsOffset={0}
            md={4}
            mdOffset={0}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              ลงชื่อ .....................................
            </Typography>
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              ( นางสาวนันทนิจ มีสวัสดิ์ )
            </Typography>
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              ผู้เสนอขอโอนย้าย,แลกเปลี่ยน
            </Typography>
          </Grid>
          <Grid
            xs={4}
            xsOffset={0}
            md={4}
            mdOffset={0}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              ลงชื่อ .....................................
            </Typography>
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              ..........................................
            </Typography>
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              ผู้รับโอนเก็บรักษา
            </Typography>
          </Grid>
          <Grid
            xs={4}
            xsOffset={0}
            md={4}
            mdOffset={0}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              ลงชื่อ .....................................
            </Typography>
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              ( นางสุพัฒตรา บุญรินทร์ )
            </Typography>
            <Typography
              component={"div"}
              sx={{
                fontFamily: "Sarabun-R",
                fontSize: "14px",
              }}
            >
              นักวิชาการพัสดุ
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default TransferViewToPrint;
