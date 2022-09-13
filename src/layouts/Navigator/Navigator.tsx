import React from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Tooltip, Typography } from "@mui/material";
// @link
import { Link, NavLink } from "react-router-dom";
// @icon
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";

import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
// @components
import { usePrivateRouteDemo } from "@/components/usePrivateRouteDemo";
import { useMatchedRouteApp } from "@/components/useMatchedRouteApp";

const iconCategory = {
  width: 36,
  height: 36,
  borderRadius: 8,
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "#36474f",
  ml: "-5px",
};

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "#455a64",
  },
  height: 40,
};

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({ isActive }) =>
      `${props.className} ${isActive ? props.activeClassName : ""}`
    }
  >
    {props.children}
  </NavLink>
));

// const itemCategory = {
//   boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
//   py: 1.5,
//   px: 3,
// };

export default function Navigator(props: DrawerProps) {
  const routeApp = useMatchedRouteApp();
  const route = usePrivateRouteDemo();

  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: 22,
            color: "#cfd8dc",
            height: "120px",
            mt: "12px",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/logoReh.png`}
              alt="logo-reh"
              style={{ width: "84px", height: "80px" }}
            />
            {/* {routeApp?.icon} */}
          </Box>
          <Box sx={{ flexGrow: 1, mt: "-24px" }}>
            <Typography variant="subtitle1" component="span">
              &nbsp; {routeApp?.title}
            </Typography>
          </Box>
        </Box>
        <Divider />

        <ListItem
          component="div"
          disablePadding
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover, &:focus": {
              bgcolor: "#455a64",
            },
          }}
        >
          <ListItemButton
            className="hover:text-yellow-400 focus:text-yellow-400"
            sx={{ height: 56, ml: "8px" }}
            component={Link}
            to="/home"
          >
            <ListItemIcon>
              <Box
                sx={{
                  ...iconCategory,
                }}
              >
                <HomeTwoToneIcon style={{ fontSize: "28px" }} />
              </Box>
            </ListItemIcon>
            <ListItemText>หน้าแรก</ListItemText>
          </ListItemButton>
          <Tooltip title="ตั้งค่า • ข้อมูลส่วนตัว">
            <IconButton
              className="hover:text-yellow-400"
              component={Link}
              to="/profile"
              size="large"
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
                    transform: "translateX(-4px) rotate(-20deg)",
                  },
                  "& svg:last-of-type": {
                    color: "#fce805",
                    right: 0,
                    opacity: 1,
                  },
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  height: "80%",
                  display: "block",
                  left: 0,
                  width: "2px",
                  bgcolor: "#7d898d",
                },
              }}
            >
              <SettingsTwoToneIcon />
              <ArrowRightTwoToneIcon
                sx={{
                  position: "absolute",
                  right: 4,
                  opacity: 0,
                }}
              />
            </IconButton>
          </Tooltip>
        </ListItem>
        <Divider sx={{ mb: 1 }} />
        {route.length > 0 &&
          route.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: "#36474f" }}>
              {id !== "" ? (
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
                </ListItem>
              ) : (
                ""
              )}
              {children.map(
                ({ id: childId, icon, path, show }) =>
                  show && (
                    <ListItem disablePadding key={childId}>
                      <ListItemButton
                        sx={item}
                        className="hover:text-yellow-400"
                        to={`${path}`}
                        component={MyNavLink}
                        activeClassName="active"
                      >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  )
              )}
              {/* <Divider sx={{ mt: 2 }} /> */}
            </Box>
          ))}
      </List>
    </Drawer>
  );
}
