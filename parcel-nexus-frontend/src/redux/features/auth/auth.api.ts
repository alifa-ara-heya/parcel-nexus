import { baseApi } from "@/redux/baseApi";
import { setUser, logoutUser } from "./auth.slice";
import { toast } from "sonner";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data?.user) {
                        dispatch(setUser({ user: data.data.user }));
                    }
                } catch (error) {
                    // handle error
                    console.log('error from auth.api.ts', error);
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
                    await queryFulfilled;
                    toast.success("Successfully logged out");
                    dispatch(logoutUser());
                    // Dispatching this will clear all cached data from the API state.
                    dispatch(baseApi.util.resetApiState());
                } catch (error) {
                    // handle error
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