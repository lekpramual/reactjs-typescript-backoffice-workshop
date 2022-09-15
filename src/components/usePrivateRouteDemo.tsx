import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import FaxTwoToneIcon from "@mui/icons-material/FaxTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import ContactPhoneTwoToneIcon from "@mui/icons-material/ContactPhoneTwoTone";
import DirectionsCarTwoToneIcon from "@mui/icons-material/DirectionsCarTwoTone";
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";
import DisabledByDefaultTwoToneIcon from "@mui/icons-material/DisabledByDefaultTwoTone";
import MoveDownTwoToneIcon from "@mui/icons-material/MoveDownTwoTone";

export function usePrivateRouteDemo() {
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

  const app1 = [
    {
      id: "",
      children: [
        {
          id: "ภาพรวม",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <DashboardTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app1/dashboard",
          show: true,
        },
      ],
    },
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
          show: true,
        },
      ],
    },
  ];

  const app2 = [
    {
      id: "",
      children: [
        {
          id: "ภาพรวม",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <DashboardTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app2/dashboard",
          show: true,
        },
      ],
    },
    {
      id: "บริการ",
      children: [
        {
          id: "ปลดล็อก (Hosxp)",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <LockOpenTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app2/hosxp",
          show: true,
        },
        {
          id: "เบอร์ภายใน",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <ContactPhoneTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app2/number",
          show: true,
        },
        {
          id: "ทะเบียนรถ",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <DirectionsCarTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app2/car",
          show: true,
        },
      ],
    },
  ];

  const app3 = [
    {
      id: "",
      children: [
        {
          id: "ภาพรวม",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <DashboardTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app3/dashboard",
          show: true,
        },
      ],
    },
    {
      id: "อุปกรณ์",
      children: [
        {
          id: "รายการอุปกรณ์",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <NoteAltTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app3/equipment",
          show: true,
        },
        {
          id: "เพิ่มอุปกรณ์",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <NoteAltTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app3/equipment/create",
          show: false,
        },
        {
          id: "ตัดจำหน่ายอุปกรณ์",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <DisabledByDefaultTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app3/remove",
          show: true,
        },
        {
          id: "โอนย้ายอุปกรณ์",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <MoveDownTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app3/move",
          show: true,
        },
      ],
    },
  ];

  const { pathname } = useLocation();
  const str_app = pathname.substring(1, 5);

  if (str_app === "app1") {
    return app1;
  }

  if (str_app === "app2") {
    return app2;
  }

  if (str_app === "app3") {
    return app3;
  }

  return app1;
}
