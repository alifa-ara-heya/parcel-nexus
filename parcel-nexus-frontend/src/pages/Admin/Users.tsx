import {
    useGetAllUsersQuery,
    useUpdateUserStatusMutation,
    useAssignUserRoleMutation
} from "@/redux/features/parcels/parcel.api";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/auth.slice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Shield, ShieldOff, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type TAdminUser = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: string;
    isActive?: string;
    isVerified?: boolean;
    createdAt?: string;
};

const Users = () => {
    const user = useAppSelector(selectCurrentUser);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, error, isLoading } = useGetAllUsersQuery({
        page: currentPage,
        limit: pageSize
    });

    const [updateUserStatus, { isLoading: isUpdatingStatus }] = useUpdateUserStatusMutation();
    const [assignUserRole, { isLoading: isAssigningRole }] = useAssignUserRoleMutation();

    console.log("User role:", user?.role);
    console.log("All users data:", { data, error, isLoading });

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'default';
            case 'INACTIVE': return 'secondary';
            case 'BLOCKED': return 'destructive';
            case 'DELETED': return 'destructive';
            default: return 'secondary';
        }
    };

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'default';
            case 'USER': return 'secondary';
            case 'SENDER': return 'outline';
            case 'RECEIVER': return 'outline';
            case 'DELIVERY_MAN': return 'secondary';
            default: return 'secondary';
        }
    };

    // Helper function to check if user is blocked
    const isUserBlocked = (user: TAdminUser) => {
        return user.isActive === 'BLOCKED' || user.isActive === 'INACTIVE';
    };

    const handleStatusUpdate = async (userId: string, newStatus: string) => {
        console.log('Updating user status:', { userId, newStatus });
        try {
            const result = await updateUserStatus({ userId, status: newStatus }).unwrap();
            console.log('Status update result:', result);
            toast.success(`User status updated to ${newStatus}`);
        } catch (error) {
            console.error('Error updating user status:', error);
            toast.error('Failed to update user status');
        }
    };

    const handleRoleUpdate = async (userId: string, newRole: string) => {
        console.log('Updating user role:', { userId, newRole });
        try {
            const result = await assignUserRole({ userId, role: newRole }).unwrap();
            console.log('Role update result:', result);
            toast.success(`User role updated to ${newRole}`);
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error('Failed to update user role');
        }
    };

    const handleBlockToggle = async (userId: string, isBlocked: boolean) => {
        console.log('Toggling user block status:', { userId, isBlocked });
        try {
            const newStatus = isBlocked ? 'ACTIVE' : 'BLOCKED';
            const result = await updateUserStatus({ userId, status: newStatus }).unwrap();
            console.log('Block toggle result:', result);
            toast.success(`User ${isBlocked ? 'unblocked' : 'blocked'} successfully`);
        } catch (error) {
            console.error('Error toggling user block status:', error);
            toast.error(`Failed to ${isBlocked ? 'unblock' : 'block'} user`);
        }
    };

    // Pagination handlers
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: string) => {
        setPageSize(parseInt(newPageSize));
        setCurrentPage(1); // Reset to first page when changing page size
    };

    // Generate page numbers for pagination
    const generatePageNumbers = () => {
        const totalPages = data?.meta?.totalPages || 1;
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardContent className="text-center py-8">
                        <p className="text-destructive">Error loading users. Please try again.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">All Users</h1>
                    <p className="text-muted-foreground mt-1">Manage and monitor all users in the system</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                        Total: {data?.meta?.total || 0} users
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Show:</span>
                        <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                            <SelectTrigger className="w-20 h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {data?.data?.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-8">
                        <p className="text-muted-foreground">No users found in the system.</p>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-foreground">Users Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-foreground">Name</TableHead>
                                        <TableHead className="text-foreground">Email</TableHead>
                                        <TableHead className="text-foreground">Phone</TableHead>
                                        <TableHead className="text-foreground">Role</TableHead>
                                        <TableHead className="text-foreground">Status</TableHead>
                                        <TableHead className="text-foreground">Verified</TableHead>
                                        <TableHead className="text-foreground">Update Role</TableHead>
                                        <TableHead className="text-foreground">Update Status</TableHead>
                                        <TableHead className="text-foreground">Block/Unblock</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.map((user: TAdminUser) => (
                                        <TableRow key={user._id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium text-foreground">
                                                {user.name}
                                            </TableCell>
                                            <TableCell className="text-foreground">
                                                {user.email}
                                            </TableCell>
                                            <TableCell className="text-foreground">
                                                {user.phone || 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getRoleBadgeVariant(user.role)}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadgeVariant(user.isActive || 'ACTIVE')}>
                                                    {user.isActive || 'ACTIVE'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                                                    {user.isVerified ? 'Verified' : 'Unverified'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value=""
                                                    onValueChange={(value) => handleRoleUpdate(user._id, value)}
                                                    disabled={isAssigningRole}
                                                >
                                                    <SelectTrigger className="w-32 h-8">
                                                        <SelectValue placeholder="Update Role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="USER">User</SelectItem>
                                                        <SelectItem value="SENDER">Sender</SelectItem>
                                                        <SelectItem value="RECEIVER">Receiver</SelectItem>
                                                        <SelectItem value="DELIVERY_MAN">Delivery Man</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value=""
                                                    onValueChange={(value) => handleStatusUpdate(user._id, value)}
                                                    disabled={isUpdatingStatus}
                                                >
                                                    <SelectTrigger className="w-32 h-8">
                                                        <SelectValue placeholder="Update Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                                                        <SelectItem value="BLOCKED">Blocked</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={isUserBlocked(user) ? "default" : "destructive"}
                                                    size="sm"
                                                    onClick={() => handleBlockToggle(user._id, isUserBlocked(user))}
                                                    disabled={isUpdatingStatus}
                                                    className="h-8 px-3"
                                                    title={isUserBlocked(user) ? "Unblock user" : "Block user"}
                                                >
                                                    {isUserBlocked(user) ? (
                                                        <>
                                                            <ShieldOff className="h-4 w-4 mr-1" />
                                                            Unblock
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Shield className="h-4 w-4 mr-1" />
                                                            Block
                                                        </>
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Pagination Controls */}
            {data?.data && data.data.length > 0 && (
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-muted-foreground">
                        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, data.meta?.total || 0)} of {data.meta?.total || 0} users
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {generatePageNumbers().map((pageNum) => (
                            <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                className="h-8 w-8 p-0"
                            >
                                {pageNum}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === (data.meta?.totalPages || 1)}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;