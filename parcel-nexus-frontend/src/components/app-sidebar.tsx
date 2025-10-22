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
    SidebarFooter,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { Link, useLocation } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { Button } from "./ui/button";
import { LogOut, User, Package, BarChart3, Users, Plus, Eye } from "lucide-react";
import { ModeToggle } from "./ui/layouts/ModeToggler";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logoutUser as logoutAction, selectCurrentUser } from "@/redux/features/auth/auth.slice";
import { Badge } from "./ui/badge";
import type { TRole } from "@/types";

// Icon mapping for different menu items
const getIconForItem = (title: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        'Analytics Dashboard': <BarChart3 className="h-4 w-4" />,
        'All Parcels': <Package className="h-4 w-4" />,
        'All Users': <Users className="h-4 w-4" />,
        'Create New Parcel': <Plus className="h-4 w-4" />,
        'My Parcels': <Eye className="h-4 w-4" />,
        'My Incoming Parcels': <Package className="h-4 w-4" />,
        'Create Parcel': <Plus className="h-4 w-4" />,
        'View all created parcels and their status logs': <Eye className="h-4 w-4" />,
    };

    return iconMap[title] || <Package className="h-4 w-4" />;
};

// Get role display name
const getRoleDisplayName = (role: string) => {
    switch (role) {
        case 'ADMIN':
            return 'Administrator';
        case 'SENDER':
            return 'Sender';
        case 'RECEIVER':
            return 'Receiver';
        default:
            return 'User';
    }
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const userData = useAppSelector(selectCurrentUser);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleLogout = async () => {
        await logout(undefined).unwrap();
        dispatch(logoutAction());
    };

    const data = {
        navMain: getSidebarItems(userData?.role as TRole),
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader className="border-b border-border/50">
                <div className="flex items-center justify-between gap-2 px-2 py-2">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0 flex-1">
                        <Logo />
                        <span className="font-bold text-sm text-foreground truncate">Parcel Nexus</span>
                    </Link>
                    <div className="flex-shrink-0">
                        <ModeToggle />
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="gap-2 overflow-x-hidden">
                {/* User Info Section */}
                {userData && (
                    <div className="px-2 py-2 mb-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="h-3.5 w-3.5 text-primary-foreground" />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <p className="text-xs font-medium text-foreground truncate">
                                    {userData.name}
                                </p>
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                    {getRoleDisplayName(userData.role)}
                                </Badge>
                            </div>
                        </div>
                    </div>
                )}

                <SidebarSeparator />

                {/* Navigation Groups */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                            {item.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-1">
                                {item.items.map((menuItem: any) => {
                                    const isActive = location.pathname === menuItem.url ||
                                        (menuItem.url.includes('my-parcels') && location.pathname.includes('/parcels'));

                                    return (
                                        <SidebarMenuItem key={menuItem.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className="w-full justify-start gap-2 px-2 py-2 hover:bg-accent/50 transition-colors"
                                            >
                                                <Link to={menuItem.url} className="flex items-center gap-2 min-w-0">
                                                    <div className="flex-shrink-0">
                                                        {getIconForItem(menuItem.title)}
                                                    </div>
                                                    <span className="text-xs font-medium truncate">
                                                        {menuItem.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t border-border/50 p-2">
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-2 text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                    <LogOut className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-xs font-medium truncate">Logout</span>
                </Button>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}