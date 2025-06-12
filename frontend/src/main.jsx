// Importing StrictMode from React to help identify potential problems in the application
import { StrictMode } from 'react'

// Importing createRoot from react-dom/client for React 18's concurrent rendering features
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

// React Router's BrowserRouter to enable client-side routing
import {BrowserRouter} from 'react-router-dom' 

// Context providers for global state management
import AuthContextProvider from './context/AuthContext';
import PostContextProvider from './context/PostContext.jsx'
 

// Creating the root and rendering the React application inside the root DOM node
createRoot(document.getElementById('root')).render(
   // BrowserRouter enables navigation using URL paths without reloading the page
  <BrowserRouter>
   {/* AuthContextProvider manages user authentication state and methods (login, logout, user info) */}
  <AuthContextProvider>
     {/* PostContextProvider manages posts, likes, and comments across the app */}
    <PostContextProvider>
      {/* Root component of the app where routing and pages are defined */}
      <App />
    </PostContextProvider>
    
  </AuthContextProvider>
  </BrowserRouter>,
)
