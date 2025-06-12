


import userModel from "../models/userSchema.js";         // Mongoose model for user data
import bcrypt from "bcryptjs";                           // For hashing passwords
import { json } from "express";
import jwt from "jsonwebtoken";                          // For generating JWT tokens


//      Register a new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;           // the stuff that the DB is accepting

        // Ensure all required fields are present
        if (!username || !email || !password) {
            return res.status(401).json({ success: false, message: 'All fields are required' })
        }
         
        // Get avatar file path if uploaded
        const avatarDP = req.file?.path;


        // console statements to check for errors related to the avatar
        console.log("Avatar file info from Cloudinary:", avatarDP);
        console.log("req.body:", req.body);     // Should include username, email, etc.
        console.log("req.file:", req.file);     // Should show uploaded image info



        // Avatar is mandatory during registration
        if (!avatarDP) {
            return res.status(400).json({ success: false, message: 'Avatar image is required' })
        }

        // Check if user already exists with given email
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' })
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user document
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            avatar: avatarDP
        })

        await newUser.save()                // Save user to database


        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.username }, process.env.JWT_SECRET, { expiresIn: "7d" })

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: false,
            secure: true,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Build response object (avoid sending password)
        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar
        }

        res.status(201).json({ success: true, message: "User registered successfully", user: userResponse, token: token })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}


//      Login an existing user
const login = async (req, res) => {
    try {

        const { email, password } = req.body

        // Check for empty credentials
        if (!email || !password) {
            return res.status(401).json({ success: false, message: 'All fields are required' });
        }
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        // Compare hashed password
        const isPassValid = await bcrypt.compare(password, user.password)

        if (!isPassValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email, name: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" })


        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: false,
            secure: true,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Send user info (without password)
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar

        }

        res.status(200).json({ success: true, message: "User login successfully", user: userResponse, token: token })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}


//   Get current user info from token
const me = async (req, res) => {
    try {
        // req.user is expected to be set by auth middleware
        const user = await userModel.findById(req.user).select('-password')

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        res.status(200).json({ success: true, message: "User login successfully", currentuser: user })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Export user controller functions
export { register, login, me };