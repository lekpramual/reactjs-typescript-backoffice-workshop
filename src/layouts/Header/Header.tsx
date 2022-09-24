import React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
// @router
import { useNavigate } from "react-router-dom";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
// @seletor
import { isLogout } from "@/store/slices/loginSlice";
// @components
import { useMatchedRoute } from "@/components/useMatchedRoute";
import { useMatchedRouteApp } from "@/components/useMatchedRouteApp";
import { Typography } from "@mui/material";

const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;
  const navigate = useNavigate();
  const route = useMatchedRoute();
  const routeApp = useMatchedRouteApp();

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { xl: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            {/* <Grid item xs /> */}
            <Grid item sx={{ display: { xl: "none", xs: "block" } }}>
              {/* <IconButton
                color="inherit"
                className="hover:text-yellow-400 focus:text-yellow-400"
              >
                <SearchTwoToneIcon />
              </IconButton> */}
              <Typography variant="subtitle1" component={"span"}>
                &nbsp;{routeApp?.title}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                href="/"
                variant="body2"
                sx={{
                  display: { lg: "block", xs: "none" },
                  textDecoration: "none",
                  color: lightColor,
                  "&:hover": {
                    color: "common.white",
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                {route || "หน้าแรก"}
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="ออกจากระบบ">
                <IconButton
                  color="inherit"
                  className="hover:text-yellow-400 focus:text-yellow-400"
                  onClick={() => isLogout(navigate)}
                  component={Link}
                  sx={{
                    padding: "12px",
                    "& svg": {
                      color: "rgba(255,255,255,0.8)",
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        color: "#fce805",
                        transform: "translateX(-4px) rotate(-0deg)",
                      },
                      "& svg:last-of-type": {
                        color: "#fce805",
                        right: 0,
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <MeetingRoomTwoToneIcon />
                  <ArrowRightTwoToneIcon
                    sx={{
                      position: "absolute",
                      right: 4,
                      opacity: 0,
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
