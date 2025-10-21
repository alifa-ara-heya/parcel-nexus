import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, allowedRoles?: TRole | TRole[]) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined);
        const userRole = data?.data?.role;

        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login" />;
        }

        // If allowedRoles are specified, check for authorization
        if (allowedRoles && !isLoading && userRole) {
            let isAuthorized = false;
            if (Array.isArray(allowedRoles)) {
                // If it's an array, check if the user's role is included
                isAuthorized = allowedRoles.includes(userRole as TRole);
            } else {
                // If it's a single role, do a direct comparison
                isAuthorized = allowedRoles === userRole;
            }

            if (!isAuthorized) {
                return <Navigate to="/unauthorized" />;
            }
        }

        return <Component />;
    };
};