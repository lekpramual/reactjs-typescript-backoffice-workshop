import Box from "@mui/material/Box";
import FaxTwoToneIcon from "@mui/icons-material/FaxTwoTone";

export function usePrivateRoute() {
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

  const privateroutes = [
    {
      id: "โทรศัพท์",
      children: [
        {
          id: "รายงาน",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <FaxTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app1/phone",
        },
      ],
    },
  ];

  return privateroutes;
}
