import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// redux
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

// Component
import Navigator from "@/layouts/Navigator";
import Header from "@/layouts/Header";
import Copyright from "@/layouts/Copyright";

const drawerWidth = 256;

function PrivateAppLayout() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  // const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log(isLgUp);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: {
            // sm: drawerWidth,
            xl: drawerWidth,
          },
          flexShrink: { xl: 0 },
        }}
      >
        {/* {isLgUp ? null : (
          <Navigator
            PaperProps={{
              style: {
                width: drawerWidth,
              },
            }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )} */}

        <Navigator
          PaperProps={{
            style: {
              width: drawerWidth,
            },
          }}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        />

        <Navigator
          PaperProps={{
            style: {
              width: drawerWidth,
            },
          }}
          sx={{ display: { xl: "block", xs: "none" } }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#eaeff1",
        }}
      >
        <Header onDrawerToggle={handleDrawerToggle} />

        <Box component="main" sx={{ flex: 1, py: 6, px: 4 }}>
          <Outlet />
        </Box>
        <Box component="footer" sx={{ mt: 3, p: 2 }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}

export default PrivateAppLayout;
