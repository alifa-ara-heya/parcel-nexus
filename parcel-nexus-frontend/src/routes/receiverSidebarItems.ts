// import Bookings from "@/pages/User/Bookings";
import IncomingParcels from "@/pages/IncomingParcels";
import type { ISidebarItem } from "@/types";

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Parcels",
    items: [
      {
        title: "Parcels",
        url: "my-incoming-parcels",
        component: IncomingParcels,
      },
    ],
  },
];