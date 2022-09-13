import { matchPath } from "react-router";
import { useLocation } from "react-router-dom";
// @link
import { usePrivateRouteDemo } from "@/components/usePrivateRouteDemo";

export function useMatchedRoute() {
  const { pathname } = useLocation();
  for (const route of usePrivateRouteDemo()) {
    for (const child of route.children) {
      if (matchPath({ path: child.path as string }, pathname)) {
        return route.id !== "" ? `${route.id} - ${child.id}` : `${child.id}`;
      }
    }
  }

  return pathname;
}
