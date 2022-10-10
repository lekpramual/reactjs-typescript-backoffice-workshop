import React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
// @router
import { useNavigate } from "react-router-dom";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
// @seletor
import { isLogout } from "@/store/slices/loginSlice";
// @components
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function HeaderIndex(props: HeaderProps) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar
        color="primary"
        position="sticky"
        elevation={0}
        sx={{
          height: "52px",
        }}
      >
        <Toolbar>
          <Container maxWidth="xl">
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/img/logoReh.png`}
                  alt="logo-reh"
                  style={{ width: "48px", height: "48px", marginTop: "5px" }}
                />
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexGrow: 1,
                }}
              >
                <Grid container direction="column">
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      className="hover:text-yellow-400 focus:text-yellow-400"
                    >
                      REH Backoffice {process.env.REACT_APP_VERSION}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      className="hover:text-yellow-400 focus:text-yellow-400 "
                    >
                      โรงพยาบาลร้อยเอ็ด
                    </Typography>
                  </Grid>
                </Grid>
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
          </Container>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
