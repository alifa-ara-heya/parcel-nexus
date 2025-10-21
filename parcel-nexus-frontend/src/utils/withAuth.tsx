import LoadingSpinner from "@/components/modules/homepage/LoadingSpinner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { selectCurrentUser } from "@/redux/features/auth/auth.slice";
import { useAppSelector } from "@/redux/hook";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, allowedRoles?: TRole | TRole[]) => {
    return function AuthWrapper() {
        const user = useAppSelector(selectCurrentUser);
        // Only fetch user info if we don't have a user in Redux state and user is not explicitly null
        const { data, isLoading, error } = useUserInfoQuery(undefined, {
            skip: !!user || user === null
        });

        // Use Redux state first, fallback to API data
        const currentUser = user || data?.data;
        const userRole = currentUser?.role;

        // If user is explicitly null (logged out), redirect immediately
        if (user === null) {
            return <Navigate to="/login" />;
        }

        // If we're loading and don't have user data, show loading
        if (isLoading && !user) {
            return <LoadingSpinner />;
        }

        // If we have an error (like 401) and no user, redirect to login
        if (error && !user) {
            return <Navigate to="/login" />;
        }

        // If we have no user data after loading, redirect to login
        if (!isLoading && !currentUser?.email) {
            return <Navigate to="/login" />;
        }

        // If allowedRoles are specified, check for authorization
        if (allowedRoles && userRole) {
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