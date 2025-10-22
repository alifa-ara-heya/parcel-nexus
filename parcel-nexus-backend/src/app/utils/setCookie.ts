import { Response } from "express";
import { envVars } from "../config/env";

export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
    // Use environment-based cookie options
    const isProduction = envVars.NODE_ENV === 'production';

    const baseCookieOptions = {
        httpOnly: true,
        secure: isProduction, // Only secure in production
        sameSite: isProduction ? 'none' as const : 'lax' as const, // Allow cross-site cookies in production
        domain: undefined, // Let browser handle domain
        path: '/', // Ensure cookies are available across the entire domain
    };

    console.log('Setting cookies with options:', baseCookieOptions);
    console.log('Environment:', envVars.NODE_ENV);

    // Set access token cookie with expiration
    if (tokenInfo.accessToken) {
        // Don't set expires for access token - let it be a session cookie
        // The JWT itself has the expiration, not the cookie
        console.log('Setting accessToken cookie (session cookie)');
        res.cookie("accessToken", tokenInfo.accessToken, baseCookieOptions);
    }

    // Set refresh token cookie with expiration
    if (tokenInfo.refreshToken) {
        // Set a longer expiration for refresh token cookie
        const refreshTokenExpiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        console.log('Setting refreshToken cookie, expires:', refreshTokenExpiration);
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            ...baseCookieOptions,
            expires: refreshTokenExpiration,
        });
    }
}