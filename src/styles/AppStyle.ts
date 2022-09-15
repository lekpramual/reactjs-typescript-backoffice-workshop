import {
  Button,
  ButtonProps,
  Divider,
  DividerProps,
  styled,
  Box,
  BoxProps,
  Dialog,
} from "@mui/material";
import { green, purple, yellow } from "@mui/material/colors";

export const CMButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: 300,
  backgroundColor: yellow[500],
  color: purple[500],
}));

export const CMDivider = styled(Divider)<DividerProps>(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: green[500],
}));

export const BoxDataGrid = styled(Box)<BoxProps>(({ theme }) => ({
  // display: "flex",
  width: "100%",
  height: "100%",
  // maxHeight:"450px",

  "& .MuiDataGrid-root": {
    borderRadius: "0px",
  },
  "& .MuiDataGrid-root .MuiDataGrid-columnHeaders": {
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  },
  "& .MuiDataGrid-root .MuiDataGrid-columnHeaderTitle": {
    fontFamily: "Mitr-R",
    fontSize: "14px",
  },
  "& .MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer":
    {
      color: "#fff",
      width: "auto",
      visibility: "visible",
    },
  "& .MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon": {
    color: "#fff",
    opacity: 0.5,
  },
  "& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
    {
      color: "#fff",
      opacity: 0.5,
    },
}));

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));
