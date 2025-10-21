/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { ModeToggle } from "./ui/layouts/ModeToggler";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: userData } = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        await logout(undefined).unwrap();
    };

    const data = {
        navMain: getSidebarItems(userData?.data?.role),
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader className="flex-row items-center justify-between">
                <Link to="/">
                    <Logo />
                </Link>
                <div className="">
                    <ModeToggle />
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}

                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item: any) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url} className="">{item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="text-sm w-1/2 mx-auto mt-auto mb-5 bg-primary-background"

                >
                    <LogOut />
                    Logout
                </Button>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}