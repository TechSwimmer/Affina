
// Import Mongoose and User model for reference associations
import mongoose from "mongoose";
import User from "./userSchema.js";

// Define the schema for a post (e.g., a user's text/image post in a social app)
const postSchema = new mongoose.Schema({

    // Reference to the user who created the post
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    // Optional text content of the post
    text: {
        type: String
    },
    // Optional image URL/path stored on Cloudinary or elsewhere
    image: {
        type: String
    },
    // Array of users who liked the post (stored as ObjectIds referencing the User model)
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    }],

    // Embedded array of comments on the post
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: User },
        text: { type: String, required: true }
    }]
},{
    // Automatically adds createdAt and updatedAt timestamps to each post
    timestamps: true
})


// Check if the model is already compiled to prevent overwrite errors in development (like with Next.js)
const postModel = mongoose.models.post || mongoose.model('Post', postSchema);

// Export the Post model to use in routes and controllers
export default postModel;