import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();
const app: Express = express();

// Middleware
app.use(express.json());

// Environment variables
const PORT: number = parseInt(process.env.PORT || "5000", 10);
const MONGO_URL: string | undefined = process.env.MONGO_URL;

// Check if MongoDB URL is defined
if (!MONGO_URL) {
    console.error("MONGO_URL is not defined in environment variables");
    process.exit(1);
}

// Connect to MongoDB and start server
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("db connected successfully");
        app.listen(PORT, () => {
            console.log(`app is running on server ${PORT}`);
        });
    })
    .catch((error: Error) => console.error("Database connection error:", error));

export default app;
    