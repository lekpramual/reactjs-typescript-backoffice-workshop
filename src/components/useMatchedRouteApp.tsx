import { useLocation } from "react-router-dom";
// @link
import { usePrivateRouteApp } from "@/components/usePrivateRouteApp";

export function useMatchedRouteApp() {
  const { pathname } = useLocation();
  const str_app = pathname.substring(1, 5);

  for (const route of usePrivateRouteApp()) {
    if (route.id === str_app) {
      return {
        app: route.id,
        title: route.children.title,
        icon: route.children.icon,
      };
    }
  }
}
