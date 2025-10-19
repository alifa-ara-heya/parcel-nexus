import { useEffect, useState } from "react";
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
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const user = useAppSelector(selectCurrentUser);
    const { data, isLoading } = useUserInfoQuery(undefined, { skip: !isInitialLoad && !!user });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.data) {
            dispatch(setUser({ user: data.data }));
        }
        if (!isLoading) {
            setIsInitialLoad(false);
        }
    }, [data, dispatch, isLoading]);

    if (isLoading && isInitialLoad) {
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