
import { useGetMyParcelsQuery } from '@/redux/features/parcels/parcel.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming shadcn/ui components
import { Badge } from '@/components/ui/badge'; // Assuming shadcn/ui components
import { ScrollArea } from '@/components/ui/scroll-area'; // Assuming shadcn/ui components
import type { IErrorResponse } from '@/types'; // Import IErrorResponse for type safety
import { useAppSelector } from '@/redux/hook';
import { selectCurrentUser } from '@/redux/features/auth/auth.slice';

// Define a basic interface for Parcel for the frontend
// This should ideally come from a shared types file or be derived from backend types
interface IParcelFrontend {
    _id: string;
    trackingNumber: string;
    currentStatus: string;
    weight: number;
    pickupAddress?: string;
    notes?: string;
    recipient: {
        name: string;
        address: string;
        phone: string;
        email?: string; // Email might be optional for recipient
    };
    // Add other fields as needed for display, e.g., sender, deliveryMan, statusHistory
}

const MyParcels = () => {
    // const user = useAppSelector(selectCurrentUser)
    // console.log(user);
    // Call the RTK Query hook to fetch parcels for the current user
    const { data, error, isLoading, isSuccess, isError } = useGetMyParcelsQuery(undefined, {
        // skip: !user,
    });


    if (isLoading) {
        return <div className="text-center py-8">Loading parcels...</div>;
    }

    if (isError) {
        // Safely access the error message from the IErrorResponse structure
        const errorMessage = (error as IErrorResponse)?.message || 'Failed to load parcels.';
        return <div className="text-center py-8 text-destructive">Error: {errorMessage}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div>
                <h1>This is Parcels component</h1>
                {/* {
                    user && <h2>Welcome {user?.name}</h2>
                } */}
            </div>
            <h1 className="text-3xl font-bold mb-6">My Parcels</h1>

            {isSuccess && data?.data?.length === 0 ? (
                <p className="text-center text-muted-foreground">You haven't created or received any parcels yet.</p>
            ) : (
                <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isSuccess && data?.data?.map((parcel: IParcelFrontend) => (
                            <Card key={parcel._id} className="shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>{parcel.trackingNumber}</span>
                                        <Badge variant={
                                            parcel.currentStatus === 'DELIVERED' ? 'default' :
                                                parcel.currentStatus === 'CANCELLED' || parcel.currentStatus === 'RETURNED' ? 'destructive' :
                                                    parcel.currentStatus === 'PENDING' ? 'secondary' : 'outline'
                                        }>
                                            {parcel.currentStatus.replace(/_/g, ' ')}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground">
                                    <p><strong>Weight:</strong> {parcel.weight} kg</p>
                                    <p><strong>Pickup Address:</strong> {parcel.pickupAddress || 'N/A'}</p>
                                    <div className="border-t pt-2 mt-2">
                                        <p className="font-semibold">Recipient:</p>
                                        <p><strong>Name:</strong> {parcel.recipient.name}</p>
                                        <p><strong>Address:</strong> {parcel.recipient.address}</p>
                                        <p><strong>Phone:</strong> {parcel.recipient.phone}</p>
                                    </div>
                                    {parcel.notes && <p><strong>Notes:</strong> {parcel.notes}</p>}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
};

export default MyParcels;