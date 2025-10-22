import IncomingParcels from "@/pages/IncomingParcels";
import type { ISidebarItem } from "@/types";

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Incoming Parcels",
    items: [
      {
        title: "My Incoming Parcels",
        url: "my-incoming-parcels",
        component: IncomingParcels,
      },
    ],
  },
];