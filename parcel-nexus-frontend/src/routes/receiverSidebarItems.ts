// import Bookings from "@/pages/User/Bookings";
import Parcels from "@/pages/Parcels";
import type { ISidebarItem } from "@/types";

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Parcels",
    items: [
      {
        title: "Parcels",
        url: "/parcels",
        component: Parcels,
      },
    ],
  },
];