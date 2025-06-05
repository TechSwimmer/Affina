// This file defines routes related to post operations such as create, read, update, delete, like, and comment

import express from "express";
import { createPost, 
         deletePost, 
         getPosts, 
         getPostsByUser, 
         updatePost, 
         toggleLike, 
         addComment
        } from "../controllers/postController.js";

import protect from "../middlewares/auth.js";          // Middleware to protect routes (requires valid JWT)
import upload from "../middlewares/multer.js";          // Middleware to handle image uploads to Cloudinary

const postRouter = express.Router();

/**
 * @route   POST /create
 * @desc    Create a new post with optional image
 * @access  Protected (requires login)
 * @data    FormData with optional 'image' field
 */
postRouter.post('/create-post',protect, upload.single('image'),createPost);

/**
 * @route   GET /get-posts
 * @desc    Get all posts from all users
 * @access  Public
 */
postRouter.get('/get-posts', getPosts );

/**
 * @route   GET /user-posts
 * @desc    Get all posts created by the logged-in user
 * @access  Protected (requires login)
 */
postRouter.get('/user-posts', protect, getPostsByUser);

/**
 * @route   PUT /posts/:id
 * @desc    Update a post by ID
 * @access  Protected (requires login)
 * @data    FormData with optional 'image' field
 */
postRouter.put('/posts/:id', protect, upload.single('image'),updatePost);

/**
 * @route   DELETE /posts/:id
 * @desc    Delete a post by ID
 * @access  Protected (requires login)
 */
postRouter.delete('/:id', protect, deletePost);

/**
 * @route   PUT /posts/:id/like
 * @desc    Like or unlike a post by ID
 * @access  Protected (requires login)
 */
postRouter.put('/posts/:id/like', protect, toggleLike);

/**
 * @route   PUT /posts/:id/comment
 * @desc    Add a comment to a post by ID
 * @access  Protected (requires login)
 */
postRouter.put('/posts/:id/comment', protect, addComment);

// Export the router to be used in the main server file
export default postRouter;