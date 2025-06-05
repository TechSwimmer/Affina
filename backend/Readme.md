#### Affina   --   Social Media App



## Overview
This is the backend for the Affina social media app. Built using Node.js, Express, MongoDB, and Mongoose.

## Features
- User registration and login (JWT auth)
- Post creation, editing, deletion
- Commenting on posts
- Like/unlike functionality
- Image uploads via Multer
- Protected routes using middleware



## Technologies Used
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (for file uploads)
- Cloudinary (for image storage)
- JWT (authentication)
- cookie-parser
- dotenv


## Project Structure

📁 backend
├── 📁 config
│ └── mongoDB.js                        # MongoDB connection setup
├── 📁 controllers
│ └── userController.js                 # Handles user-related logic
│ └── postController.js                 # Handles post-related logic
├── 📁 middlewares
│ └── auth.js                           # JWT token protection
├── 📁 models
│ └── userModel.js                      # Mongoose user schema
│ └── postModel.js                      # Mongoose post schema
├── 📁 routes
│ └── userRouter.js                     # User routes
│ └── postRouter.js                     # Post routes
├── 📁 uploads
│ └── temp image uploads (if applicable)
├── .env
├── server.js
└── package.json

## Setup Instructions

```bash
npm install
nodemon


