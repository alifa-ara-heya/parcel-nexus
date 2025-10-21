import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import LoadingSpinner from "@/components/modules/homepage/LoadingSpinner";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { selectCurrentUser, setUser } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Outlet } from "react-router";

export default function DashboardLayout() {
    const user = useAppSelector(selectCurrentUser);
    // We only want to fetch user info if there is no user in the redux store yet.
    // After logout, `user` will be null, and this will correctly skip the query.
    const { data, isLoading } = useUserInfoQuery(undefined, { skip: !!user || user === null });
    const dispatch = useAppDispatch();



    useEffect(() => {
        if (data?.data && !user) {
            // The `token` is not available here, it comes from login.
            // This effect is primarily for rehydrating the user on a page refresh.
            // The `auth.api.ts` onQueryStarted for login handles the main setUser dispatch.
            // Since we're using HTTP-only cookies, we don't need to store tokens in Redux state
            dispatch(setUser({ user: data.data, token: "cookie-based" }));
        }
    }, [data, dispatch, user]);

    if (isLoading && !user) {
        return <LoadingSpinner />;
    }


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />

                </div>

            </SidebarInset>
        </SidebarProvider>
    );
}