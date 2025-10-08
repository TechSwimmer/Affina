
// Importing required packages
import express from "express";                          // Web framework for handling HTTP routes
import cookieParser from "cookie-parser";               // Middleware to parse cookies from requests

import cors from "cors";                                // Enables Cross-Origin Resource Sharing
import 'dotenv/config'                                  // Loads environment variables from .env
import connectDB from "./config/mongoDB.js";            // Custom function to connect to MongoDB
import userRouter from "./routes/userRouter.js";        // User-related API routes
import postRouter from "./routes/postRouter.js";        // Post-related API routes

// Initialize Express app
const app = express();
app.use(express.json());

// Define the port from .env or fallback to 4000
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Enable CORS for cross-origin requests (frontend-backend communication)
app.use(
  cors({
    origin: "https://affina.netlify.app",  // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// ✅ Handle preflight (OPTIONS) requests globally
app.options("*", cors());

// Middleware to parse cookies from client requests
app.use(cookieParser());







// Route handlers
app.use('/api/user', userRouter)        // Routes for user registration, login, profile, etc.

app.use('/api/posts', postRouter)       // Routes for creating, editing, deleting posts, etc.



// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



