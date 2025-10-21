import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
            query: (parcelInfo) => ({
                url: "/parcels",
                method: "POST",
                data: parcelInfo,
            }),
            invalidatesTags: ["USER"],
        }),
        getAllUsersForRecipient: builder.query({
            query: () => ({
                url: "/user/all-users",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
    }),
});

export const { useCreateParcelMutation, useGetAllUsersForRecipientQuery } =
    parcelApi;