import {
  Button,
  ButtonProps,
  Divider,
  DividerProps,
  styled,
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
