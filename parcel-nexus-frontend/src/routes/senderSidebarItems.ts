// import Bookings from "@/pages/User/Bookings";
import CreateParcel from "@/pages/CreateParcel";
import Parcels from "@/pages/Parcels";
import type { ISidebarItem } from "@/types";

export const senderSidebarItems: ISidebarItem[] = [
   {
      title: "Parcels",
      items: [
        {
          title: "View all created parcels and their status logs",
          url: "/parcels",
          component: Parcels,
        },
        {
          title: "Create Parcels",
          url: "/parcels",
          component: CreateParcel,
        },
      ],
    },
];