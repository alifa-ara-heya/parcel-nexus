// import AddDivision from "@/pages/Admin/AddDivision";
// import AddTour from "@/pages/Admin/AddTour";
// import AddTourType from "@/pages/Admin/AddTourType";
// import Analytics from "@/pages/Admin/Analytics";
import Users from "@/pages/Admin/Users";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "User Management",
        url: "/admin/users",
        component: Users,
      },
    ],
  },
];