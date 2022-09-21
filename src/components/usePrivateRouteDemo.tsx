// @router
import { useLocation } from "react-router-dom";
// @mui components
import Box from "@mui/material/Box";

// @mui icons
import FaxTwoToneIcon from "@mui/icons-material/FaxTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import ContactPhoneTwoToneIcon from "@mui/icons-material/ContactPhoneTwoTone";
import DirectionsCarTwoToneIcon from "@mui/icons-material/DirectionsCarTwoTone";
import NoteAltTwoToneIcon from "@mui/icons-material/NoteAltTwoTone";
import MoveDownTwoToneIcon from "@mui/icons-material/MoveDownTwoTone";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";

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

  // @App 1 URL
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

  // @App 2 URL
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

  // @App 3 URL
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
          id: "รายการรับอุปกรณ์",
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
          id: "รายการอุปกรณ์",
          icon: (
            <Box
              sx={{
                ...iconCategory,
              }}
            >
              <InventoryTwoToneIcon
                sx={{
                  fontSize: 28,
                }}
              />
            </Box>
          ),
          path: "/app3/product",
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
          id: "แก้รายการอุปกรณ์",
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
          path: "/app3/equipment/edit",
          show: false,
        },
        {
          id: "ดูรายการอุปกรณ์",
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
          path: "/app3/equipment/view",
          show: false,
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
