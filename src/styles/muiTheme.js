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
      fontSize: "16px",
    },
    subtitle2: {
      fontFamily: "Mitr-R",
      letterSpacing: 0.5,
      fontSize: "14px",
    },
    body1: {
      fontFamily: "Thonburi-R",
      letterSpacing: 0.5,
      fontSize: "14px",
    },
    body2: {
      fontFamily: "Thonburi-R",
      letterSpacing: 0.5,
      fontSize: "14px",
    },
    h5: {
      fontFamily: "Mitr-R",
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
          // backgroundColor: theme.palette.common.white,
          backgroundColor: "#fce805",
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
    // MuiDialog: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 0,
    //     },
    //   },
    // },
    // MuiDialogTitle: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#36474f",
    //       color: "#fff",
    //       textAlign: "center",
    //       padding: "5px",
    //       height: "40px",
    //     },
    //   },
    // },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // backgroundColor: "#36474f",
          // color: "#fff",
          height: "40px",
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          height: "28px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "28px",
          fontSize: "14px",
        },
        sizeSmall: {
          height: "28px",
          fontSize: "14px",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        // outlined: {
        //   borderRadius: "0",
        //   textTransform: "none",
        // },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
        sizeSmall: {
          height: "28px",
          fontSize: "14px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        outlined: {
          borderRadius: "0",
        },
        // sizeSmall: {
        //   height: "30px",
        //   fontSize: "14px",
        // },
      },
    },
  },
};

export default theme;
