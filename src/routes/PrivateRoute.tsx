import React from "react";
import { isLoggedIn } from "@/store/slices/loginSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const auth = isLoggedIn();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
