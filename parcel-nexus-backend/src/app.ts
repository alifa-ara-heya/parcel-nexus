import { Application, Request, Response } from "express";
import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notfound";
import passport from 'passport';
import './app/config/passport';
import cookieParser from "cookie-parser";
import { router } from "./app/routes";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'https://parcel-delivery-system-alpha.vercel.app',
    'https://parcel-nexus-frontend.vercel.app',
    process.env.FRONTEND_URL // Add your frontend URL from environment
].filter(Boolean); // Remove any undefined values

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Initialize passport
app.use(passport.initialize());

// Application Routes
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome from Parcel Delivery API. WELCOME!')
})

app.use(globalErrorHandler)
// not found route (must be used after global error handler)
app.use(notFound)


export default app;