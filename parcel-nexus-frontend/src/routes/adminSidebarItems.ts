
import AllParcels from "@/pages/Admin/AllParcels";
import Users from "@/pages/Admin/Users";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Analytics Dashboard",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "All Parcels",
        url: "/admin/all-parcels",
        component: AllParcels,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/users",
        component: Users,
      },
    ],
  },
];