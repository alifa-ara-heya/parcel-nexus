import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "@/components/ui/InputPassword";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import GoogleLogo from "@/assets/icons/GoogleLogo";

const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, {
                error: "Username must be at least 3 characters.",
            })
            .max(50, {
                error: "Username can not be more than 50 characters.",
            }),
        role: z.enum(["SENDER", "RECEIVER"] as const, {
            error: "You need to select a role.",
        }),
        email: z.email(),
        phone: z.string().min(1, { error: "Phone number is required." }),
        address: z.string().min(1, { error: "Address is required." }),
        password: z.string().min(6, {
            error: "The password should be minimum 6 characters.",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            role: undefined,
            email: "",
            password: "",
            phone: "",
            address: "",
            confirmPassword: "",
        },
    });

    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {

        const userInfo = {
            name: data.username,
            email: data.email,
            role: data.role,
            phone: data.phone.replace(/\D/g, ''), // Remove all non-digit characters
            address: data.address,
            password: data.password,
        };

        console.log(userInfo);

        try {
            const result = await register(userInfo).unwrap();
            console.log(result);
            toast.success("User created successfully");
            navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error?.data?.errorSources[0].message);
            toast.error(error?.data?.errorSources[0].message || "An unexpected error occurred.");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center gap-2 text-center my-6 lg:my-10">
                <h1 className="text-2xl font-bold">Register your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your details below to register your account
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn("flex flex-col gap-6", className)}
                    {...props}
                >
                    <div className="grid gap-6">
                        {/* username */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="username"
                                            // onChange={field.onChange}
                                            // onBlur={field.onBlur}
                                            //   shortcut - spread operator
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* accessibility */}
                                    <FormDescription className="sr-only">
                                        This is your username
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* role */}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="SENDER">Sender</SelectItem>
                                            <SelectItem value="RECEIVER">Receiver</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* email */}
                        <FormField<z.infer<typeof registerSchema>>
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1234567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* address */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main St, Anytown" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* password */}
                        <FormField<z.infer<typeof registerSchema>>
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        {/* <Input type="password" {...field} /> */}
                                        <InputPassword {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* confirm password */}
                        <FormField<z.infer<typeof registerSchema>>
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        {/* <Input type="password" {...field} /> */}
                                        <InputPassword {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Create account
                        </Button>
                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                            <span className="bg-background text-muted-foreground relative z-10 px-2">
                                Or continue with
                            </span>
                        </div>
                        <Button variant="outline" className="w-full">
                            <GoogleLogo />
                            Login with Google
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline underline-offset-4">
                            Login
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    );
}