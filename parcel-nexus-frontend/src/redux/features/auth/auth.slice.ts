import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

interface User {
    // Define the user properties you expect, e.g., email, role
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; token: string; refreshToken?: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken || null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        },
    },
});

export const { setUser, logout: logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
