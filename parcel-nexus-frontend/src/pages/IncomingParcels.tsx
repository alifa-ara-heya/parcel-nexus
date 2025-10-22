import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetMyIncomingParcelsQuery } from "@/redux/features/parcels/parcel.api";
import type { IErrorResponse, TParcel } from "@/types";

const IncomingParcels = () => {
    // const user = useAppSelector(selectCurrentUser);
    const { data, isLoading, isError } = useGetMyIncomingParcelsQuery(undefined, {
        // skip: !user,
    });
    console.log({ data });

    if (isLoading) return <div className="text-center py-8">Loading incoming parcels...</div>;

    if (isError) {
        const errorMessage = (isError as unknown as IErrorResponse)?.message || 'Failed to load incoming parcels.';
        return (
            <div className="text-center py-8 text-destructive">
                Error: {errorMessage}
            </div>
        );
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "DELIVERED":
                return "default";
            case "CANCELLED":
            case "RETURNED":
                return "destructive";
            case "PENDING":
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <div className="container mx-auto py-8">
            {/* {user && (
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    Welcome, <span className="text-accent">{user?.name}</span>!
                </h1>
            )} */}
            <h1 className="text-3xl font-bold mb-6">My Incoming Parcels</h1>

            {data?.data?.length === 0 ? (
                <p className="text-center text-muted-foreground">You have no incoming parcels at the moment.</p>
            ) : (
                <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.data?.map((parcel: TParcel) => (

                            <Card key={parcel._id} className="shadow-md hover:shadow-lg transition-shadow">

                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>{parcel.trackingNumber}</span>
                                        <Badge variant={getStatusVariant(parcel.currentStatus)}>
                                            {parcel.currentStatus.replace(/_/g, " ")}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4 text-sm text-muted-foreground">
                                    <div className="border-t pt-4 space-y-1">
                                        <h3 className="font-semibold text-primary">Sender Information:</h3>
                                        <p><strong>Name:</strong> {parcel.sender.name}</p>
                                        <p><strong>Email:</strong> {parcel.sender.email}</p>
                                    </div>
                                    <div className="border-t pt-4 space-y-1">
                                        <h3 className="font-semibold text-primary ">Parcel Information:</h3>
                                        <p><strong>Weight:</strong> {parcel.weight} kg</p>
                                        <p><strong>Price:</strong> ${parcel.price}</p>
                                        <p><strong>Pickup Address:</strong> {parcel.pickupAddress || 'N/A'}</p>
                                        {parcel.notes && <p><strong>Notes:</strong> {parcel.notes}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
};

export default IncomingParcels;