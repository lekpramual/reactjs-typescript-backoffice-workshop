import FaxTwoToneIcon from "@mui/icons-material/FaxTwoTone";
import DvrTwoToneIcon from "@mui/icons-material/DvrTwoTone";
import HomeRepairServiceTwoToneIcon from "@mui/icons-material/HomeRepairServiceTwoTone";

export function usePrivateRouteApp() {
  const privateapps = [
    {
      id: "app1",
      children: {
        title: "ระบบรายงานโทรศัพท์",
        icon: (
          <FaxTwoToneIcon
            sx={{
              fontSize: 48,
            }}
          />
        ),
      },
    },
    {
      id: "app2",
      children: {
        title: "ระบบบริการศูนย์คอมพิวเตอร์",
        icon: (
          <HomeRepairServiceTwoToneIcon
            sx={{
              fontSize: 48,
            }}
          />
        ),
      },
    },
    {
      id: "app3",
      children: {
        title: "ระบบบริหารคลังศูนย์คอมพิวเตอร์",
        icon: (
          <DvrTwoToneIcon
            sx={{
              fontSize: 48,
            }}
          />
        ),
      },
    },
  ];

  return privateapps;
}
