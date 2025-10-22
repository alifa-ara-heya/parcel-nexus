import {
    useGetAllParcelsQuery,
    useUpdateParcelStatusByAdminMutation,
    useBlockParcelMutation,
    useUnblockParcelMutation
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

// Extended parcel type for admin view with block status
type TAdminParcel = {
    _id: string;
    trackingNumber: string;
    sender: {
        name: string;
        email?: string;
    };
    recipient: {
        name: string;
        phone: string;
    };
    currentStatus: string;
    weight: number;
    isBlocked?: boolean;
    deliveryMan?: {
        name: string;
    };
};

const AllParcels = () => {
    const user = useAppSelector(selectCurrentUser);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, error, isLoading } = useGetAllParcelsQuery({
        page: currentPage,
        limit: pageSize
    });

    // Mutation hooks for parcel management
    const [updateParcelStatusByAdmin, { isLoading: isUpdatingStatus }] = useUpdateParcelStatusByAdminMutation();
    const [blockParcel, { isLoading: isBlocking }] = useBlockParcelMutation();
    const [unblockParcel, { isLoading: isUnblocking }] = useUnblockParcelMutation();

    console.log("User role:", user?.role);
    console.log("All parcels data:", { data, error, isLoading });

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'DELIVERED':
                return 'default';
            case 'CANCELLED':
            case 'RETURNED':
                return 'destructive';
            case 'PENDING':
                return 'secondary';
            case 'PICKED_UP':
            case 'IN_TRANSIT':
                return 'outline';
            case 'ON_HOLD':
                return 'secondary';
            default:
                return 'secondary';
        }
    };

    // Admin can change to any status - no restrictions
    const getAllowedStatuses = (currentStatus: string) => {
        const allStatuses = [
            'PENDING',
            'PICKED_UP',
            'IN_TRANSIT',
            'DELIVERED',
            'CANCELLED',
            'RETURNED',
            'ON_HOLD'
        ];

        // Return all statuses except the current one
        return allStatuses.filter(status => status !== currentStatus);
    };

    const getBlockedBadgeVariant = (isBlocked: boolean) => {
        return isBlocked ? 'destructive' : 'default';
    };

    // Helper function to check if parcel is blocked (either by isBlocked flag or ON_HOLD status)
    const isParcelBlocked = (parcel: TAdminParcel) => {
        return parcel.currentStatus === 'ON_HOLD' || parcel.isBlocked || false;
    };

    const handleStatusUpdate = async (parcelId: string, newStatus: string) => {
        console.log('Updating status:', { parcelId, newStatus });
        try {
            const result = await updateParcelStatusByAdmin({ parcelId, status: newStatus }).unwrap();
            console.log('Status update result:', result);
            toast.success(`Parcel status updated to ${newStatus.replace(/_/g, ' ')}`);
        } catch (error) {
            console.error('Error updating parcel status:', error);
            toast.error('Failed to update parcel status');
        }
    };

    const handleBlockToggle = async (parcelId: string, isBlocked: boolean) => {
        console.log('Toggling block status:', { parcelId, isBlocked });
        try {
            if (isBlocked) {
                const result = await unblockParcel(parcelId).unwrap();
                console.log('Unblock result:', result);
                toast.success('Parcel unblocked successfully');
            } else {
                const result = await blockParcel(parcelId).unwrap();
                console.log('Block result:', result);
                toast.success('Parcel blocked successfully');
            }
        } catch (error) {
            console.error('Error toggling parcel block status:', error);
            toast.error(`Failed to ${isBlocked ? 'unblock' : 'block'} parcel`);
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
                <div className="text-center py-8 text-muted-foreground">Loading all parcels...</div>
            </div>
        );
    }

    if (error) {
        console.error("Error fetching all parcels:", error);
        return (
            <div className="container mx-auto py-8">
                <div className="text-center py-8 text-destructive">
                    Error loading parcels: {JSON.stringify(error)}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">All Parcels</h1>
                    <p className="text-muted-foreground mt-1">Manage and monitor all parcels in the system</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                        Total: {data?.meta?.total || 0} parcels
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
                        <p className="text-muted-foreground">No parcels found in the system.</p>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-foreground">Parcels Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-foreground">Tracking #</TableHead>
                                        <TableHead className="text-foreground">Sender</TableHead>
                                        <TableHead className="text-foreground">Recipient</TableHead>
                                        <TableHead className="text-foreground">Status</TableHead>
                                        <TableHead className="text-foreground">Weight</TableHead>
                                        <TableHead className="text-foreground">Active Status</TableHead>
                                        {/* <TableHead className="text-foreground">Delivery Man</TableHead> */}
                                        <TableHead className="text-foreground">Update Status</TableHead>
                                        <TableHead className="text-foreground">Block/Unblock</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.map((parcel: TAdminParcel) => (
                                        <TableRow key={parcel._id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium text-foreground">
                                                {parcel.trackingNumber}
                                            </TableCell>
                                            <TableCell className="text-foreground">
                                                <div>
                                                    <div className="font-medium">{parcel.sender?.name}</div>
                                                    <div className="text-sm text-muted-foreground">{parcel.sender?.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-foreground">
                                                <div>
                                                    <div className="font-medium">{parcel.recipient?.name}</div>
                                                    <div className="text-sm text-muted-foreground">{parcel.recipient?.phone}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadgeVariant(parcel.currentStatus)}>
                                                    {parcel.currentStatus?.replace(/_/g, ' ')}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-foreground">
                                                {parcel.weight} kg
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getBlockedBadgeVariant(isParcelBlocked(parcel))}>
                                                    {isParcelBlocked(parcel) ? 'Blocked' : 'Active'}
                                                </Badge>
                                            </TableCell>
                                            {/* <TableCell className="text-foreground">
                                                {parcel.deliveryMan?.name || 'Unassigned'}
                                            </TableCell> */}
                                            <TableCell>
                                                <Select
                                                    value=""
                                                    onValueChange={(value) => handleStatusUpdate(parcel._id, value)}
                                                    disabled={isUpdatingStatus}
                                                >
                                                    <SelectTrigger className="w-32 h-8">
                                                        <SelectValue placeholder="Update Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {getAllowedStatuses(parcel.currentStatus).map((status) => (
                                                            <SelectItem key={status} value={status}>
                                                                {status.replace(/_/g, ' ')}
                                                            </SelectItem>
                                                        ))}
                                                        {getAllowedStatuses(parcel.currentStatus).length === 0 && (
                                                            <SelectItem value={parcel.currentStatus} disabled>
                                                                No transitions allowed
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={isParcelBlocked(parcel) ? "default" : "destructive"}
                                                    size="sm"
                                                    onClick={() => handleBlockToggle(parcel._id, isParcelBlocked(parcel))}
                                                    disabled={isBlocking || isUnblocking}
                                                    className="h-8 px-3"
                                                    title={isParcelBlocked(parcel) ? "Unblock parcel" : "Block parcel"}
                                                >
                                                    {isParcelBlocked(parcel) ? (
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
                        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, data.meta?.total || 0)} of {data.meta?.total || 0} parcels
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

export default AllParcels;