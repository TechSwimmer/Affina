
// Import Mongoose to define the schema and model
import mongoose from "mongoose";


// Define the schema for user accounts
const userSchema = new mongoose.Schema({

    // Username chosen by the user
    username: {
        type: String,
        required: true,    // Must be provided
        unique: true       // No two users can have the same username
    },

    // User's email address
    email: {
        type: String,
        required: true,   // Must be provided
        unique: true      // Ensures email is not reused
    },
    // Hashed password (stored securely using bcrypt)
    password: {
        type: String,
        required: true    // Must be provided
    },
    // Optional avatar image URL or Cloudinary path
    avatar: {
        type: String
    },
    // followers for specific user
    followers:[{ type:mongoose.Schema.Types.ObjectId, ref: "User" }],
    following:[{ type:mongoose.Schema.Types.ObjectId, ref: "User"}],


},{
    // Adds createdAt and updatedAt fields automatically
    timestamps: true
})

// Export the model — check first if it already exists (avoids overwrite errors during hot reloads)
const userModel = mongoose.models.User || mongoose.model('User', userSchema);

// Export the user model for use in authentication, posting, etc.
export default userModel;