import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// redux
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

// Component
import HeaderIndex from "@/layouts/HeaderIndex";
import Copyright from "@/layouts/Copyright";

function PrivateDefaultLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // console.log(isSmUp);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#eaeff1",
        }}
      >
        <HeaderIndex onDrawerToggle={handleDrawerToggle} />
        <Container
          maxWidth="xl"
          component="main"
          sx={{ flex: 1, py: 6, px: 4 }}
        >
          <Outlet />
        </Container>
        {/* <Box component="main" sx={{ flex: 1, py: 6, px: 4 }}>
          <Outlet />
        </Box> */}
        <Box component="footer" sx={{ mt: 3, p: 2 }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}

export default PrivateDefaultLayout;
