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
            query: ({ page = 1, limit = 1000 }: { page?: number; limit?: number } = {}) => ({
                url: "/user/all-users",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["USER"], // Provides USER tag, useful if user list changes
        }),
        getAllUsers: builder.query({
            query: ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => ({
                url: "/user/all-users",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["USER"],
        }),
        updateUserStatus: builder.mutation({
            query: ({ userId, status }) => ({
                url: `/user/${userId}/status`,
                method: "PATCH",
                data: { status },
            }),
            invalidatesTags: ["USER"],
        }),
        assignUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/user/${userId}/assign-role`,
                method: "PATCH",
                data: { role },
            }),
            invalidatesTags: ["USER"],
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
        }),
        getAllParcels: builder.query({
            query: ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => ({
                url: "/parcels/all",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["PARCEL"], // Provides PARCEL tag for caching and invalidation
        }),
        updateParcelStatus: builder.mutation({
            query: ({ parcelId, status }) => ({
                url: `/parcels/${parcelId}/update-delivery-status`,
                method: "PATCH",
                data: { status },
            }),
            invalidatesTags: ["PARCEL"], // Invalidate PARCEL tag to refetch data
        }),
        updateParcelStatusByAdmin: builder.mutation({
            query: ({ parcelId, status }) => ({
                url: `/parcels/${parcelId}/admin-update-status`,
                method: "PATCH",
                data: { status },
            }),
            invalidatesTags: ["PARCEL"], // Invalidate PARCEL tag to refetch data
        }),
        blockParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/${parcelId}/block`,
                method: "PATCH",
            }),
            invalidatesTags: ["PARCEL"], // Invalidate PARCEL tag to refetch data
        }),
        unblockParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/${parcelId}/unblock`,
                method: "PATCH",
            }),
            invalidatesTags: ["PARCEL"], // Invalidate PARCEL tag to refetch data
        }),
        cancelParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/${parcelId}/cancel`,
                method: "PATCH",
            }),
            invalidatesTags: ["PARCEL"], // Invalidate PARCEL tag to refetch data
        }),
        getParcelByTrackingNumber: builder.query({
            query: (trackingNumber) => ({
                url: `/parcels/track/${trackingNumber}`,
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        })
    }),
});

export const {
    useCreateParcelMutation,
    useGetAllUsersForRecipientQuery,
    useGetAllUsersQuery,
    useUpdateUserStatusMutation,
    useAssignUserRoleMutation,
    useGetMyParcelsQuery,
    useGetMyIncomingParcelsQuery,
    useGetAllParcelsQuery,
    useUpdateParcelStatusMutation,
    useUpdateParcelStatusByAdminMutation,
    useBlockParcelMutation,
    useUnblockParcelMutation,
    useCancelParcelMutation,
    useGetParcelByTrackingNumberQuery
} = parcelApi;