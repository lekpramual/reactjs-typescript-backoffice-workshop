/**
 * theme for MUI
 * TODO: create a theme object as per designs
 */
import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      light: "#36474f",
      main: "#36474f",
      dark: "#36474f",
    },
  },
  typography: {
    fontFamily: "Thonburi-R",
    subtitle1: {
      fontFamily: "Mitr-R",
      letterSpacing: 0.5,
    },
    subtitle2: {
      fontFamily: "Mitr-R",
      letterSpacing: 0.5,
    },
    h5: {
      fontFamily: "Mitr-R",
      // fontWeight: 500,
      // fontSize: 24,
      letterSpacing: 0.5,
    },
    h6: {
      fontFamily: "Thonburi-R",
      // fontWeight: 500,
      // fontSize: 18,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "3px solid rgba(0, 0, 0, 0.12)",
          borderColor: "#7d898d",
          backgroundColor: "#36474f",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "&.MuiDataGrid-sortIcon": {
            backgroundColor: "#465a65",
            borderRight: "6px solid rgba(0, 0, 0, 0.12)",
            borderColor: "#fce805",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected, &.Mui-selected:hover, &:active": {
            backgroundColor: "#465a65",
            borderRight: "6px solid rgba(0, 0, 0, 0.12)",
            borderColor: "#fce805",
          },
          "&.active": {
            backgroundColor: "#465a65",
            borderRight: "6px solid rgba(0, 0, 0, 0.12)",
            borderColor: "#fce805",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontFamily: "Mitr-R",
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          backgroundColor: "#fce805",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 24,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       height: "36px",
    //     },
    //   },
    // },
    MuiInputBase: {
      styleOverrides: {
        // root: {
        //   height: "36px",
        //   fontSize: "14px",
        // },
        sizeSmall: {
          height: "36px",
          fontSize: "14px",
        },
      },
    },
  },
};

export default theme;
