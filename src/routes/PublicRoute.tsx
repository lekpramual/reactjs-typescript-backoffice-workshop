import React from "react";
import { isLoggedIn } from "@/store/slices/loginSlice";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = (props: any) => {
  const auth = isLoggedIn();
  return auth ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
