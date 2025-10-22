import CreateParcel from "@/pages/CreateParcel";
import MyParcels from "@/pages/MyParcels";
import type { ISidebarItem } from "@/types";

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Parcel Management",
    items: [
      {
        title: "My Parcels",
        url: "my-parcels",
        component: MyParcels,
      },
      {
        title: "Create New Parcel",
        url: "create-parcel",
        component: CreateParcel,
      },
    ],
  },
];