import { Response } from "express";
import { envVars } from "../config/env";

export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
    const cookieOptions = {
        httpOnly: true,
        secure: true, // Always secure in production for cross-site cookies
        sameSite: 'none' as const, // Allow cross-site cookies for different domains
        domain: undefined, // Let browser handle domain
    };

    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, cookieOptions);
    }

    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, cookieOptions);
    }
}