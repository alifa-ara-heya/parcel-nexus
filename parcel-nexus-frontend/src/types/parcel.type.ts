export type TParcelStatus =
  | "PENDING"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "ON_HOLD";

export type TRecipient = {
  name: string;
  email?: string;
  userId?: string;
  phone: string;
  address: string;
};

export type TSender = {
  name: string;
  email?: string;
  userId?: string;
  phone: string;
  address: string;
};

export type TStatusLog = {
  currentStatus: TParcelStatus;
  timestamp: Date;
  updatedBy?: string;
  note?: string;
};

export type TParcel = {
  _id: string;
  id: string;
  trackingNumber: string;
  sender: TSender;
  recipient: TRecipient;
  deliveryMan?: string;
  deliveryFee?: number;
  pickupAddress?: string;
  currentStatus: TParcelStatus;
  statusBeforeHold?: TParcelStatus;
  statusHistory: TStatusLog[];
  weight: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  status: string;
};
