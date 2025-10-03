# Affina - Full-Stack Social Media Application 🌟

A modern, full-stack social media platform built with the MERN stack. Affina allows users to connect, share posts, interact through likes and comments, and manage their personal profiles in a seamless single-page application experience.



## 🚀 Live Demo

- **Frontend Live URL:** [Add your Vercel/Netlify link here]
- **Backend API Base URL:** [Add your Render/Railway link here]

## ✨ Features

- **User Authentication:** Secure JWT-based registration and login.
- **Post Management:** Create, edit, and delete posts with text and image uploads.
- **Social Interactions:** Like and comment on posts in real-time.
- **Responsive Design:** Fully responsive UI that works on desktop and mobile.
- **Profile Management:** User profiles with avatar upload and post history.

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Context API (State Management)
- Tailwind CSS
- Axios
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- Multer & Cloudinary for File Upload
- Bcrypt for Password Hashing






## 📁 Project Structure

```bash
Affina/
├── frontend/          # React application
│   └── README.md      # Frontend-specific guide
├── backend/           # Express.js API server
│   └── README.md      # Backend-specific guide
└── README.md          # This file (Project Overview)
```

## 🏁 Getting Started

To get a local copy up and running, follow these steps for both the frontend and backend.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation & Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/affina.git
    cd affina
    ```

2. **Backend Setup**
    ```bash
    cd backend
    npm install
    # Configure environment variables (see backend/README.md)
    npm run dev
    ```

3. **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    # Configure environment variables (see frontend/README.md)
    npm run dev
    ```

For detailed, step-by-step instructions on setting up each part of the project, please refer to the dedicated README files:
- [**Frontend Setup Guide**](./frontend/README.md)
- [**Backend Setup Guide**](./backend/README.md)

## 🔧 Environment Variables

Both the frontend and backend require specific environment variables to be configured. Please refer to the respective README files in the `frontend` and `backend` directories for the complete list.

## 📜 Available Scripts

The project uses different scripts for the frontend and backend. Please check the respective `package.json` files or the dedicated READMEs for a full list.

## API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | User registration | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/me` | Get current user | Required |
| POST | `/api/posts` | Create a new post | Required |
| GET | `/api/posts` | Get all posts | Required |
| PUT | `/api/posts/:id/like` | Like a post | Required |
| POST | `/api/posts/:id/comment` | Add comment to post | Required |



## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using the MERN Stack**
