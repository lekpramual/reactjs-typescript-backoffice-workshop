import * as React from "react";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Card, CardActionArea, CardContent } from "@mui/material";

import FaxTwoToneIcon from "@mui/icons-material/FaxTwoTone";
import DvrTwoToneIcon from "@mui/icons-material/DvrTwoTone";
import HomeRepairServiceTwoToneIcon from "@mui/icons-material/HomeRepairServiceTwoTone";
// @style
import { styled } from "@mui/material/styles";
const classes = {
  breadcrumb: { display: "flex", alignItems: "center", justifyContent: "end" },
  cardcontentfix: {
    padding: 0,
  },
};

const iconCategory = {
  width: 64,
  height: 64,
  borderRadius: 16,
  bgcolor: "#36474f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ItemCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <React.Fragment>
      <Box id="app_title">
        <Grid
          item
          sx={{
            display: "flex",
            flexGrow: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">
            ระบบสารสนเทศเพื่อการบริหารจัดการภายในองค์กร
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexGrow: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">โรงพยาบาลร้อยเอ็ด</Typography>
        </Grid>
      </Box>

      {/* Content  */}
      <Box sx={{ flex: 1, py: 6 }} id="app_link">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 12 }}
        >
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card>
              <CardActionArea component={Link} to="/app1/dashboard">
                <ItemCard
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover, &:focus": {
                      bgcolor: "#455a64",
                    },
                  }}
                  className="hover:text-yellow-400 focus:text-yellow-400 "
                >
                  <CardContent style={classes.cardcontentfix}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          ...iconCategory,
                        }}
                      >
                        <FaxTwoToneIcon
                          sx={{
                            fontSize: 48,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">
                        ระบบรายงานโทรศัพท์
                      </Typography>
                    </Box>
                  </CardContent>
                </ItemCard>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card>
              <CardActionArea component={Link} to="/app2/dashboard">
                <ItemCard
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover, &:focus": {
                      bgcolor: "#455a64",
                    },
                  }}
                  className="hover:text-yellow-400 focus:text-yellow-400 "
                >
                  <CardContent style={classes.cardcontentfix}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          ...iconCategory,
                        }}
                      >
                        <HomeRepairServiceTwoToneIcon
                          sx={{
                            fontSize: 48,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">
                        ระบบบริการศูนย์คอมพิวเตอร์
                      </Typography>
                    </Box>
                  </CardContent>
                </ItemCard>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card>
              <CardActionArea component={Link} to="/app3/dashboard">
                <ItemCard
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    "&:hover, &:focus": {
                      bgcolor: "#455a64",
                    },
                  }}
                  className="hover:text-yellow-400 focus:text-yellow-400 "
                >
                  <CardContent style={classes.cardcontentfix}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          ...iconCategory,
                        }}
                      >
                        <DvrTwoToneIcon
                          sx={{
                            fontSize: 48,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">
                        ระบบบริหารคลังศูนย์คอมพิวเตอร์
                      </Typography>
                    </Box>
                  </CardContent>
                </ItemCard>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
