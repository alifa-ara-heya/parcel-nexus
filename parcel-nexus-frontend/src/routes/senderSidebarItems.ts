// import Bookings from "@/pages/User/Bookings";
import CreateParcel from "@/pages/CreateParcel";
import MyParcels from "@/pages/MyParcels";
import type { ISidebarItem } from "@/types";

export const senderSidebarItems: ISidebarItem[] = [
   {
      title: "My Parcels",
      items: [
        {
          title: "View all created parcels and their status logs",
          url: "my-parcels",
          component: MyParcels,
        },
        {
          title: "Create Parcel",
          url: "create-parcel",
          component: CreateParcel,
        },
      ],
    },
];