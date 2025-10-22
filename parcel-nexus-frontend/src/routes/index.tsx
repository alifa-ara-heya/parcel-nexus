import App from "@/App";
import DashboardLayout from "@/components/ui/layouts/DashboardLayout";
import { role } from "@/constants/role";
// import AdminLayout from "@/components/ui/layouts/AdminLayout";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
// import Analytics from "@/pages/Analytics";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import IncomingParcels from "@/pages/IncomingParcels";
import MyParcels from "@/pages/MyParcels";
import ParcelTracking from "@/pages/ParcelTracking";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: ''
      },
      {
        Component: About,
        path: 'about'
      },
      {
        Component: Contact,
        path: 'contact'
      },
      {
        Component: ParcelTracking,
        path: 'track',
      },
      {
        Component: ParcelTracking,
        path: 'track/:trackingNumber',
      }
    ]
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" replace /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/parcels",
    children: [
      { index: true, element: <MyParcels /> },
      ...generateRoutes(senderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/incoming-parcels",
    children: [
      { index: true, element: <IncomingParcels /> },
      ...generateRoutes(receiverSidebarItems),
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
  // },
  {
    Component: NotFound,
    path: "*",
  }
]);