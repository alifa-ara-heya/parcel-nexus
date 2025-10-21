import { baseApi } from "@/redux/baseApi";
import { setUser, logoutUser } from "./auth.slice";
import { toast } from "sonner";
import { role as userRoles } from "@/constants/role";
import type { TRole } from "@/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { navigate, from, ...loginData } = userInfo;
                return {
                    url: "/auth/login",
                    method: "POST",
                    data: loginData,
                }
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { navigate, from } = arg;
                try {
                    const { data } = await queryFulfilled;

                    if (data?.data?.user && data?.data?.accessToken) {
                        dispatch(setUser({
                            user: data.data.user,
                            token: data.data.accessToken,
                            refreshToken: data.data.refreshToken
                        }));

                        toast.success("Logged in successfully");

                        const userRole = data.data.user.role as TRole;

                        // Role-based redirection
                        switch (userRole) {
                            case userRoles.admin:
                                navigate("/admin/analytics", { replace: true });
                                break;
                            case userRoles.sender:
                                navigate("/parcels", { replace: true });
                                break;
                            case userRoles.receiver:
                                navigate("/incoming-parcels", { replace: true });
                                break;
                            default:
                                navigate(from, { replace: true });
                        }
                    }
                } catch (error) {
                    // handle error
                    console.log('Auth API: Login error:', error);
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    // Clear user state immediately to prevent 401 errors
                    dispatch(logoutUser());
                    // Clear all cached API data immediately
                    dispatch(baseApi.util.resetApiState());

                    await queryFulfilled;
                    toast.success("Successfully logged out");
                } catch (error) {
                    // Even if logout fails on server, clear local state
                    dispatch(logoutUser());
                    dispatch(baseApi.util.resetApiState());
                    console.log(error);
                }
            },
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo,
            }),
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useLogoutMutation,
} = authApi;