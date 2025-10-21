import type { ComponentType } from "react";

export type { ILogin } from "./auth.type";
export type { TParcel } from "./parcel.type";

export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

export interface ISidebarItem {
    title: string;
    items: {
      title: string;
      url: string;
      component: ComponentType;
    }[];
  }
  
  // Make this consistent with the backend Role enum
  export type TRole = "ADMIN" | "SENDER" | "RECEIVER" | "USER" | "DELIVERY_MAN";
  
  export interface IUser {
    _id: string;
    id: string;
    name: string;
    email: string;
    role: TRole;
    // role: string; // Use string to be more flexible, or use the updated TRole
    // Add other user properties as needed
  }
  
  type ZodIssue = {
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
  };
  
  type ErrorSource = {
    path: string;
    message: string;
  };
  
  export interface IErrorResponse {
    success: boolean;
    message: string;
    errorSources?: ErrorSource[];
    err?: {
      issues: ZodIssue[];
      name: string;
    };
    stack?: string;
  }