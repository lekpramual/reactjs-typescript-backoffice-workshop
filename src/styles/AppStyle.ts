import {
  Button,
  ButtonProps,
  Divider,
  DividerProps,
  styled,
  Box,
  BoxProps,
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
  width: "100%",
  height: "100%",
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
