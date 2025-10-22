
import { useGetMyParcelsQuery, useCancelParcelMutation } from '@/redux/features/parcels/parcel.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { IErrorResponse } from '@/types';
import { useAppSelector } from '@/redux/hook';
import { selectCurrentUser } from '@/redux/features/auth/auth.slice';
import LoadingSpinner from '@/components/modules/homepage/LoadingSpinner';
import {
    Package,
    MapPin,
    Phone,
    Mail,
    Weight,
    Calendar,
    X,
    Eye,
    Truck,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Define a basic interface for Parcel for the frontend
interface IParcelFrontend {
    _id: string;
    trackingNumber: string;
    currentStatus: string;
    weight: number;
    pickupAddress?: string;
    notes?: string;
    createdAt?: string;
    recipient: {
        name: string;
        address: string;
        phone: string;
        email?: string;
    };
    sender?: {
        name: string;
        email?: string;
    };
    deliveryMan?: {
        name: string;
        phone?: string;
    };
    statusHistory?: Array<{
        currentStatus: string;
        timestamp: string;
        note?: string;
    }>;
}

const MyParcels = () => {
    const user = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [parcelToCancel, setParcelToCancel] = useState<string | null>(null);

    // Call the RTK Query hook to fetch parcels for the current user
    const { data, error, isLoading, isSuccess, isError } = useGetMyParcelsQuery(undefined, {
        skip: !user,
    });

    // Cancel parcel mutation
    const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation();

    // Helper function to get status badge variant
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

    // Helper function to get status icon
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'DELIVERED':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'CANCELLED':
                return <X className="h-4 w-4 text-red-600" />;
            case 'PENDING':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'PICKED_UP':
            case 'IN_TRANSIT':
                return <Truck className="h-4 w-4 text-blue-600" />;
            case 'ON_HOLD':
                return <AlertCircle className="h-4 w-4 text-orange-600" />;
            default:
                return <Package className="h-4 w-4 text-gray-600" />;
        }
    };

    // Handle cancel parcel
    const handleCancelParcel = async () => {
        if (!parcelToCancel) return;

        try {
            await cancelParcel(parcelToCancel).unwrap();
            toast.success('Parcel cancelled successfully');
            setShowCancelDialog(false);
            setParcelToCancel(null);
        } catch (error: unknown) {
            console.error('Error cancelling parcel:', error);
            const errorMessage = (error as { data?: { message?: string } })?.data?.message || 'Failed to cancel parcel';
            toast.error(errorMessage);
        }
    };

    // Open cancel dialog
    const openCancelDialog = (parcelId: string) => {
        setParcelToCancel(parcelId);
        setShowCancelDialog(true);
    };

    // Check if parcel can be cancelled
    const canCancelParcel = (status: string) => {
        return status === 'PENDING';
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    if (isError) {
        const errorMessage = (error as IErrorResponse)?.message || 'Failed to load parcels.';
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardContent className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                        <p className="text-destructive">Error: {errorMessage}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Package className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold text-foreground">My Parcels</h1>
                </div>
                {user && (
                    <p className="text-muted-foreground">
                        Welcome back, <span className="text-primary font-medium">{user.name}</span>!
                        Here are all your parcel deliveries.
                    </p>
                )}
            </div>

            {/* Stats Cards */}
            {isSuccess && data?.data && data.data.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">Total Parcels</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-900 mt-1">{data.data.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-800">Delivered</span>
                            </div>
                            <p className="text-2xl font-bold text-green-900 mt-1">
                                {data.data.filter((p: IParcelFrontend) => p.currentStatus === 'DELIVERED').length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-800">Pending</span>
                            </div>
                            <p className="text-2xl font-bold text-yellow-900 mt-1">
                                {data.data.filter((p: IParcelFrontend) => p.currentStatus === 'PENDING').length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                                <Truck className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">In Transit</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-900 mt-1">
                                {data.data.filter((p: IParcelFrontend) =>
                                    p.currentStatus === 'PICKED_UP' || p.currentStatus === 'IN_TRANSIT'
                                ).length}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Parcels Grid */}
            {isSuccess && data?.data?.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No Parcels Yet</h3>
                        <p className="text-muted-foreground">
                            You haven't created or received any parcels yet. Start by creating your first parcel!
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isSuccess && data?.data?.map((parcel: IParcelFrontend) => (
                        <Card key={parcel._id} className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(parcel.currentStatus)}
                                        <CardTitle className="text-lg font-semibold text-foreground">
                                            {parcel.trackingNumber}
                                        </CardTitle>
                                    </div>
                                    <Badge variant={getStatusBadgeVariant(parcel.currentStatus)} className="text-xs">
                                        {parcel.currentStatus.replace(/_/g, ' ')}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Weight and Date */}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Weight className="h-4 w-4" />
                                        <span>{parcel.weight} kg</span>
                                    </div>
                                    {parcel.createdAt && (
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(parcel.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Pickup Address */}
                                {parcel.pickupAddress && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-foreground">Pickup Address</p>
                                            <p className="text-muted-foreground">{parcel.pickupAddress}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Recipient Info */}
                                <div className="border-t pt-3">
                                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1">
                                        <Package className="h-4 w-4" />
                                        Recipient Details
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-foreground">{parcel.recipient.name}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{parcel.recipient.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">{parcel.recipient.phone}</span>
                                        </div>
                                        {parcel.recipient.email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">{parcel.recipient.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Delivery Man Info */}
                                {parcel.deliveryMan && (
                                    <div className="border-t pt-3">
                                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1">
                                            <Truck className="h-4 w-4" />
                                            Delivery Man
                                        </h4>
                                        <div className="space-y-1 text-sm">
                                            <p className="text-foreground">{parcel.deliveryMan.name}</p>
                                            {parcel.deliveryMan.phone && (
                                                <p className="text-muted-foreground">{parcel.deliveryMan.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Notes */}
                                {parcel.notes && (
                                    <div className="border-t pt-3">
                                        <h4 className="font-semibold text-foreground mb-1">Notes</h4>
                                        <p className="text-sm text-muted-foreground">{parcel.notes}</p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="border-t pt-3 flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => navigate(`/track/${parcel.trackingNumber}`)}
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        View Details
                                    </Button>

                                    {canCancelParcel(parcel.currentStatus) && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            disabled={isCancelling}
                                            onClick={() => openCancelDialog(parcel._id)}
                                        >
                                            <X className="h-4 w-4 mr-1" />
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Simple Confirmation Dialog */}
            {showCancelDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <X className="h-5 w-5 text-destructive" />
                                Cancel Parcel
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Are you sure you want to cancel this parcel? This action cannot be undone.
                            </p>
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowCancelDialog(false);
                                        setParcelToCancel(null);
                                    }}
                                >
                                    Keep Parcel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleCancelParcel}
                                    disabled={isCancelling}
                                >
                                    {isCancelling ? 'Cancelling...' : 'Yes, Cancel Parcel'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default MyParcels;