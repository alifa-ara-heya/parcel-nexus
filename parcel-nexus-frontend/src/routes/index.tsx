import App from "@/App";
import DashboardLayout from "@/components/ui/layouts/DashboardLayout";
import { role } from "@/constants/role";
// import AdminLayout from "@/components/ui/layouts/AdminLayout";
import About from "@/pages/About";
// import Analytics from "@/pages/Analytics";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: 'about'
      }
    ]
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/parcels",
    children: [
      { index: true, element: <Navigate to="/" /> },
      ...generateRoutes(senderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/parcels",
    children: [
      { index: true, element: <Navigate to="/" /> },
      ...generateRoutes(senderSidebarItems),
    ],
  },
  {
    Component: LoginPage,
    path: "/login",
  },
  {
    Component: RegisterPage,
    path: "/register",
  },
  // {
  //   Component: AdminLayout,
  //   path: "/admin",
  //   children: [
  //     {
  //       Component: Analytics,
  //       path: 'analytics'
  //     }
  //   ]
  // }
]);