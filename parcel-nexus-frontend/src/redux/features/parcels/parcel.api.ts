import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
            query: (parcelInfo) => ({
                url: "/parcels",
                method: "POST",
                data: parcelInfo,
            }),
            invalidatesTags: ["PARCEL"], // Invalidate PARCEL tag when a new parcel is created
        }),
        getAllUsersForRecipient: builder.query({
            query: () => ({
                url: "/user/all-users",
                method: "GET",
            }),
            providesTags: ["USER"], // Provides USER tag, useful if user list changes
        }),
        getMyParcels: builder.query({
            query: () => ({
                url: "/parcels/me",
                method: "GET",
            }),
            providesTags: ["PARCEL"], // Provides PARCEL tag for caching and invalidation
        }),
        getMyIncomingParcels: builder.query({
            query: () => ({                
                url: "/parcels/incoming",
                method: "GET"
            })
        })
    }),
});

export const { useCreateParcelMutation, useGetAllUsersForRecipientQuery, useGetMyParcelsQuery, useGetMyIncomingParcelsQuery } =
    parcelApi;