import 'dotenv/config'
import mongoose from "mongoose";
import app from "./app";
import { Server } from 'http';
// Note: don't import createAdmin at top-level because it imports envVars (which throws
// when required env vars are missing) during module initialization. We'll import it
// dynamically after the server starts so we can catch and log startup errors.


let server: Server;
const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // await mongoose.connect(`${process.env.DB_URL}`)
        await mongoose.connect(`${process.env.DB_URL}`, {
            serverSelectionTimeoutMS: 5000 // Fail fast if the DB is not reachable
        });

        console.log('Connected to MongoDB using Mongoose');

        server = app.listen(port, () => {
            console.log(`Server is listening on port ${port}.`);
        })

    } catch (error) {
        console.error('Error Connecting to MongoDB:', error);
        process.exit(1);
    }
}

(async () => {
    await startServer()

    // Dynamically import the admin seeding utility so any env validation errors
    // inside it don't crash the module load. We handle errors gracefully here.
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { createAdmin } = await import('./app/utils/seedAdmin')
        await createAdmin()
    } catch (err) {
        console.error('createAdmin error (non-fatal):', err instanceof Error ? err.message : err)
    }
})();


const shutdown = () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection detected! Server shutting down...', error);
    shutdown();
});

process.on('uncaughtException', error => {
    console.error('Uncaught Exception detected! Server shutting down...', error);
    shutdown();
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    if (server) {
        server.close(() => {
            console.log('Process terminated.');
        });
    }
});