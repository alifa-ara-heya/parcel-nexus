/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    useCreateParcelMutation,
    useGetAllUsersForRecipientQuery,
} from "@/redux/features/parcels/parcel.api";
import type { IErrorResponse, IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const createParcelSchema = z.object({
    recipient: z.object({
        userId: z.string().min(1, "Please select a recipient."),
    }),
    weight: z.coerce.number().min(0.1, "Weight must be greater than 0"),
    pickupAddress: z.string().optional(),
    notes: z.string().optional(),
});

type TCreateParcelFormValues = z.infer<typeof createParcelSchema>;

const CreateParcel = () => {
    const navigate = useNavigate();
    const [createParcel, { isLoading: isCreating }] = useCreateParcelMutation();
    const { data: usersData, isLoading: isLoadingUsers } =
        useGetAllUsersForRecipientQuery(undefined);

    const form = useForm<TCreateParcelFormValues>({
        resolver: zodResolver(createParcelSchema) as Resolver<TCreateParcelFormValues>,
        defaultValues: {
            recipient: {
                userId: "",
            },
            weight: 0.1,
            pickupAddress: "",
            notes: "",
        },
    });

    const onSubmit = async (values: any) => {
        const data = values as TCreateParcelFormValues;
        const toastId = toast.loading("Creating parcel...");
        try {
            // The backend will auto-populate the recipient's details from the userId
            const res = await createParcel(data).unwrap();
            if (res.success) {
                toast.success("Parcel created successfully!", { id: toastId });
                form.reset();
                navigate("/parcels");
            } else {
                toast.error("Something went wrong creating the parcel", { id: toastId });
            }
        } catch (error) {
            toast.error((error as IErrorResponse).message || "Failed to create parcel. Please try again.", {
                id: toastId,
            });
            console.error(error);
        }
    };

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="mb-6 text-2xl font-bold">Create a New Parcel</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control as any}
                        name="recipient.userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Recipient</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isLoadingUsers}
                                >
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a registered user" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {usersData?.data?.map((user: IUser) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.name} ({user.email})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control as any}
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight (kg)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control as any}
                        name="pickupAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pickup Address (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your pickup location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control as any}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Any special instructions for the delivery..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isCreating} className="w-full">
                        {isCreating ? "Creating..." : "Create Parcel"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateParcel;