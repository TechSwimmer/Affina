
// This file defines user-related routes such as registration, login, and fetching current user info

import express from "express";
import { register, login, me } from "../controllers/userController.js";
import  protect  from "../middlewares/auth.js";                // Middleware to protect routes (requires JWT)
import upload from "../middlewares/multer.js"; 
                // Middleware to handle image uploads to cloudinary


const userRouter = express.Router();

/**
 * @route   POST /register
 * @desc    Register a new user with username, email, password, and avatar image
 * @access  Public
 * @data    FormData with fields: username, email, password, and 'image' (avatar)
 */
userRouter.post('/register',upload.single('image'), register)

/**
 * @route   POST /login
 * @desc    Authenticate a user and return JWT token + user info
 * @access  Public
 * @data    JSON body with fields: email, password
 */
userRouter.post('/login', login)

/**
 * @route   GET /me
 * @desc    Fetch details of the currently logged-in user (using token)
 * @access  Protected
 */
userRouter.get('/me',protect, me)


/**
 * @route   POST /me
 * @desc    follow a user
 * @access  Protected
 */

// Export the router to be used in the main server file
export default userRouter;  