import React, { useEffect, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Link, Navigate, Route, Routes } from "react-router-dom";
// @layouts
import PublicLayout from "@/layouts/PublicLayout";
import PrivateAppLayout from "@/layouts/PrivateAppLayout";
import PrivateDefaultLayout from "@/layouts/PrivateDefaultLayout";
// @routers
import PublicRoute from "@/routes/PublicRoute";
import PrivateRoute from "@/routes/PrivateRoute";
// @pages
// import Car from "@/pages/Car";
// import Home from "@/pages/Home";
// import Phone from "@/pages/Phone";
// import Hosxp from "@/pages/Hosxp";
// import Number from "@/pages/Number";
// import Equipment from "@/pages/Equipment";
// import Dashboard from "@/pages/Dashboard";
// import SignInSide from "@/pages/SignInSide";
// import EquipmentCreate from "@/pages/EquipmentCreate";
// import EquipmentEdit from "@/pages/EquipmentEdit";
// import EquipmentView from "@/pages/EquipmentView";
// import Approved from "@/pages/Approved";
// import ApprovedEdit from "@/pages/ApprovedEdit";
// import TransferCreate from "@/pages/TransferCreate";
// import TransferEdit from "@/pages/TransferEdit";
// import TransferView from "@/pages/TransferView";
// import Product from "./pages/Product";
// import ProductView from "@/pages/ProductView";
// import ProductEdit from "@/pages/ProductEdit";
// import Transfer from "@/pages/Transfer";
// import Document from "@/pages/Document";
// @theme
import theme from "@/styles/MuiTheme";

const Car = React.lazy(() => import("@/pages/Car"));
const Home = React.lazy(() => import("@/pages/Home"));
const Phone = React.lazy(() => import("@/pages/Phone"));
const Hosxp = React.lazy(() => import("@/pages/Hosxp"));
const Number = React.lazy(() => import("@/pages/Number"));
const Equipment = React.lazy(() => import("@/pages/Equipment"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const SignInSide = React.lazy(() => import("@/pages/SignInSide"));
const EquipmentCreate = React.lazy(() => import("@/pages/EquipmentCreate"));
const EquipmentEdit = React.lazy(() => import("@/pages/EquipmentEdit"));
const EquipmentView = React.lazy(() => import("@/pages/EquipmentView"));
const Approved = React.lazy(() => import("@/pages/Approved"));
const ApprovedEdit = React.lazy(() => import("@/pages/ApprovedEdit"));
const Transfer = React.lazy(() => import("@/pages/Transfer"));
const TransferCreate = React.lazy(() => import("@/pages/TransferCreate"));
const TransferEdit = React.lazy(() => import("@/pages/TransferEdit"));
const TransferView = React.lazy(() => import("@/pages/TransferView"));
const Product = React.lazy(() => import("@/pages/Product"));
const ProductView = React.lazy(() => import("@/pages/ProductView"));
const ProductEdit = React.lazy(() => import("@/pages/ProductEdit"));
const Document = React.lazy(() => import("@/pages/Document"));
const DocumentCreate = React.lazy(() => import("@/pages/DocumentCreate"));
const DocumentEdit = React.lazy(() => import("@/pages/DocumentEdit"));

export default function App() {
  useEffect(() => {
    // dispatch(loginActions.restoreLogin());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <div className="flex h-screen">
            <div className="m-auto">
              <h3>โหลดข้อมูล ...</h3>
            </div>
          </div>
        }
      >
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<SignInSide />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* Protected routes */}
          <Route element={<PrivateDefaultLayout />}>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Route>

          {/* Protected routes */}
          <Route element={<PrivateAppLayout />}>
            <Route path="/app1" element={<PrivateRoute />}>
              <Route path="/app1" element={<Navigate to="/app1/dashboard" />} />
              <Route path="/app1/dashboard" element={<Dashboard />} />
              <Route path="/app1/phone" element={<Phone />} />
            </Route>
          </Route>

          {/* Protected app2 */}
          <Route element={<PrivateAppLayout />}>
            <Route path="/app2" element={<PrivateRoute />}>
              <Route path="/app2" element={<Navigate to="/app2/dashboard" />} />
              <Route path="/app2/dashboard" element={<Dashboard />} />
              <Route path="/app2/hosxp" element={<Hosxp />} />
              <Route path="/app2/number" element={<Number />} />
              <Route path="/app2/car" element={<Car />} />
            </Route>
          </Route>

          {/* Protected app3 */}
          <Route element={<PrivateAppLayout />}>
            <Route path="/app3" element={<PrivateRoute />}>
              <Route path="/app3" element={<Navigate to="/app3/dashboard" />} />
              <Route path="/app3/dashboard" element={<Dashboard />} />
              <Route path="/app3/equipment" element={<Equipment />} />
              <Route
                path="/app3/equipment/create"
                element={<EquipmentCreate />}
              />
              <Route path="/app3/equipment/edit" element={<EquipmentEdit />} />
              <Route path="/app3/equipment/view" element={<EquipmentView />} />

              <Route path="/app3/approved" element={<Approved />} />
              <Route path="/app3/approved/edit" element={<ApprovedEdit />} />
              <Route path="/app3/approved/view" element={<EquipmentView />} />

              <Route path="/app3/product" element={<Product />} />
              <Route path="/app3/product/view" element={<ProductView />} />
              <Route path="/app3/product/edit" element={<ProductEdit />} />

              <Route path="/app3/transfer" element={<Transfer />} />
              <Route
                path="/app3/transfer/create"
                element={<TransferCreate />}
              />
              <Route path="/app3/transfer/edit" element={<TransferEdit />} />
              <Route path="/app3/transfer/view" element={<TransferView />} />

              <Route path="/app3/document" element={<Document />} />
              <Route
                path="/app3/document/create"
                element={<DocumentCreate />}
              />
              <Route path="/app3/document/edit" element={<DocumentEdit />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);
