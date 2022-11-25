import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// @mui
import { Box, Button, Breadcrumbs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

// @icons
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

// @redux
import { useSelector, useDispatch } from "react-redux";

// @pdf---
import ReactToPrint from "react-to-print";
// @seletor
import {
  equipmentSelector,
  equipmentSearchById,
} from "@/store/slices/equipmentSlice";

import {
  equipmentDetailSelector,
  equipmentDetailAll,
} from "@/store/slices/equipmentDetailSlice";

import EquipmentToPrint from "./EquipmentToPrint";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function EquipmentView() {
  const componentRef = useRef(null);

  const navigate = useNavigate();
  let query = useQuery();
  // const printRef = React.useRef<any>();

  const dispatch = useDispatch<any>();
  const equipmentReducer = useSelector(equipmentSelector);
  const equipmentDetailReducer = useSelector(equipmentDetailSelector);

  useEffect(() => {
    let id = query.get("id") || "";
    dispatch(equipmentSearchById({ search: id }));
    dispatch(equipmentDetailAll({ search: id }));
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
            ></Typography>
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
      <Paper
        sx={{
          maxWidth: "100%",
          margin: "auto",
          overflow: "hidden",
          mb: 2,
        }}
        key={"paper-views"}
      >
        <EquipmentToPrint
          ref={componentRef}
          dataEquipment={
            equipmentReducer.isResultEdit ? equipmentReducer.isResultEdit : []
          }
          dataEquipmentDetail={
            equipmentDetailReducer.isResult
              ? equipmentDetailReducer.isResult
              : []
          }
        />
      </Paper>

      <Grid container spacing={2} alignItems="center" className="mt-1">
        <Grid xs={12} className="text-center">
          <ReactToPrint
            trigger={() => (
              <Button
                variant="contained"
                className="w-[256px] bg-blue-500 hover:bg-blue-600"
              >
                <PrintTwoToneIcon />
                ปริ้นรายการอุปกรณ์
              </Button>
            )}
            content={() => componentRef.current}
            pageStyle="@page { size:A4 landscape } "
          />
        </Grid>
      </Grid>
    </Box>
  );
}
