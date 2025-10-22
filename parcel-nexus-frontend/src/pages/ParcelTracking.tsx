import { useGetParcelByTrackingNumberQuery } from '@/redux/features/parcels/parcel.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/modules/homepage/LoadingSpinner';
import {
    Package,
    MapPin,
    Phone,
    Mail,
    Weight,
    Calendar,
    Truck,
    CheckCircle,
    Clock,
    AlertCircle,
    Search,
    User,
    Navigation
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// Define types for status history
interface StatusHistoryItem {
    currentStatus: string;
    timestamp: string;
    note?: string;
    updatedBy?: {
        name: string;
        role: string;
    };
}


const ParcelTracking = () => {
    const navigate = useNavigate();
    const { trackingNumber: urlTrackingNumber } = useParams<{ trackingNumber: string }>();
    const [searchTrackingNumber, setSearchTrackingNumber] = useState(urlTrackingNumber || '');

    // Use the tracking number from URL params or search input
    const trackingNumber = urlTrackingNumber || searchTrackingNumber;

    const { data, error, isLoading, isSuccess, isError } = useGetParcelByTrackingNumberQuery(
        trackingNumber,
        { skip: !trackingNumber || trackingNumber.trim() === '' }
    );


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
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'CANCELLED':
                return <AlertCircle className="h-5 w-5 text-red-600" />;
            case 'PENDING':
                return <Clock className="h-5 w-5 text-yellow-600" />;
            case 'PICKED_UP':
            case 'IN_TRANSIT':
                return <Truck className="h-5 w-5 text-blue-600" />;
            case 'ON_HOLD':
                return <AlertCircle className="h-5 w-5 text-orange-600" />;
            default:
                return <Package className="h-5 w-5 text-gray-600" />;
        }
    };

    // Handle search
    const handleSearch = () => {
        const trimmedTrackingNumber = searchTrackingNumber.trim();
        if (trimmedTrackingNumber) {
            navigate(`/track/${trimmedTrackingNumber}`);
        }
    };

    // Handle key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container mx-auto py-4 px-4 sm:py-8">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Package className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Parcel Tracking</h1>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    Track your parcel delivery status in real-time using your tracking number.
                </p>

                {/* Search Section */}
                <Card className="mb-6 sm:mb-8">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Enter tracking number..."
                                    value={searchTrackingNumber}
                                    onChange={(e) => setSearchTrackingNumber(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="text-base sm:text-lg"
                                />
                            </div>
                            <Button
                                onClick={handleSearch}
                                disabled={!searchTrackingNumber.trim()}
                                className="w-full sm:w-auto"
                            >
                                <Search className="h-4 w-4 mr-2" />
                                Track Parcel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                </div>
            )}

            {/* Error State */}
            {isError && (
                <Card>
                    <CardContent className="text-center py-8 sm:py-12 px-4">
                        <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-destructive mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">Parcel Not Found</h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4">
                            {(error as { data?: { message?: string } })?.data?.message || 'No parcel found with this tracking number. Please check your tracking number and try again.'}
                        </p>
                        <Button variant="outline" onClick={() => navigate('/')} className="w-full sm:w-auto">
                            Go to Homepage
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Success State - Parcel Found */}
            {isSuccess && data?.data && (
                <div className="space-y-6">
                    {/* Parcel Overview Card */}
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {getStatusIcon(data.data.currentStatus)}
                                    <div>
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-foreground break-all">
                                            {data.data.trackingNumber}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground">Tracking Number</p>
                                    </div>
                                </div>
                                <Badge variant={getStatusBadgeVariant(data.data.currentStatus)} className="text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2 w-fit">
                                    {data.data.currentStatus.replace(/_/g, ' ')}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="flex items-center gap-3">
                                    <Weight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-foreground">{data.data.weight} kg</p>
                                        <p className="text-sm text-muted-foreground">Weight</p>
                                    </div>
                                </div>
                                {data.data.createdAt && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground">
                                                {new Date(data.data.createdAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Created Date</p>
                                        </div>
                                    </div>
                                )}
                                {data.data.deliveryMan && (
                                    <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                                        <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground">{data.data.deliveryMan.name}</p>
                                            <p className="text-sm text-muted-foreground">Delivery Man</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Parcel Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {/* Sender Information */}
                        {data.data.sender && (
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <User className="h-5 w-5 text-blue-600" />
                                        Sender Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="font-semibold text-foreground break-words">{data.data.sender.name}</p>
                                        {data.data.sender.email && (
                                            <div className="flex items-center gap-2 mt-1">
                                                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                <span className="text-sm text-muted-foreground break-all">{data.data.sender.email}</span>
                                            </div>
                                        )}
                                    </div>
                                    {data.data.pickupAddress && (
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-foreground">Pickup Address</p>
                                                <p className="text-sm text-muted-foreground break-words">{data.data.pickupAddress}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Recipient Information */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Navigation className="h-5 w-5 text-green-600" />
                                    Recipient Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="font-semibold text-foreground break-words">{data.data.recipient.name}</p>
                                    {data.data.recipient.email && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                            <span className="text-sm text-muted-foreground break-all">{data.data.recipient.email}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-foreground">Delivery Address</p>
                                        <p className="text-sm text-muted-foreground break-words">{data.data.recipient.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground break-all">{data.data.recipient.phone}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Status History */}
                    {data.data.statusHistory && data.data.statusHistory.length > 0 && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Clock className="h-5 w-5 text-purple-600" />
                                    Delivery Status History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 sm:space-y-4">
                                    {[...(data.data.statusHistory || [])]
                                        .sort((a: StatusHistoryItem, b: StatusHistoryItem) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                                        .map((status: StatusHistoryItem, index: number) => (
                                            <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                                                <div className="flex-shrink-0">
                                                    {getStatusIcon(status.currentStatus)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                                        <Badge variant={getStatusBadgeVariant(status.currentStatus)} className="w-fit">
                                                            {status.currentStatus.replace(/_/g, ' ')}
                                                        </Badge>
                                                        <span className="text-xs sm:text-sm text-muted-foreground">
                                                            {new Date(status.timestamp).toLocaleString()}
                                                        </span>
                                                    </div>
                                                    {status.note && (
                                                        <p className="text-sm text-muted-foreground break-words">{status.note}</p>
                                                    )}
                                                    {status.updatedBy && (
                                                        <p className="text-xs text-muted-foreground mt-1 break-words">
                                                            Updated by: {status.updatedBy.name} ({status.updatedBy.role})
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Notes */}
                    {data.data.notes && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Package className="h-5 w-5 text-orange-600" />
                                    Special Instructions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm sm:text-base text-muted-foreground break-words">{data.data.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* No tracking number entered */}
            {!trackingNumber && (
                <Card>
                    <CardContent className="text-center py-8 sm:py-12 px-4">
                        <Search className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">Enter Tracking Number</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Enter your parcel tracking number above to view delivery status and details.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ParcelTracking;
