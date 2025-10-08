// Import the ToastContainer to show toast notifications (e.g., success/error messages)
import { ToastContainer } from 'react-toastify'

// useContext to access context data (in this case, authentication state)
import { useContext } from 'react'

// Importing the AuthContext to get token (authentication status)
import { AuthContext } from './context/AuthContext'

// Import components and pages used in routing
import Navbar from './components/Navbar'
import { Navigate,Route,Routes } from 'react-router-dom'
import PostPage from './pages/PostPage'
import LandingPage from './pages/LandingPage'
import AddPost from './components/AddPost'
import Registerpage from './pages/RegisterPage'

function App() {
  // Destructuring the `token` from AuthContext to check if the user is logged in
  const { token } =   useContext(AuthContext);
 
  return (
    // Full-screen height container
    <div className='h-screen'>
    {/* Toast notification container placed globally */}
    <ToastContainer/>
    {/* Conditional rendering based on login status */}
      {token ? (
        // If user is authenticated, show post-related routes
        <>
         
          <Routes>
            {/* Default route redirects to /posts */}
            <Route path = '/posts' element = {<PostPage />}/>

            {/* Posts page showing all posts */}
            <Route path = '/' element = {<Navigate to="/" />} />

            {/* Page to create a new post */}
            <Route path = '/create-post' element = {<AddPost/>} />
          </Routes>
        </>
      ) : (
        // If user is not authenticated, show landing, login, and register pages
        <Routes>
          <Route path="/" element= {<LandingPage/>}/>
          <Route path='/register' element= {<Registerpage />}/>
          <Route path='/login' element={<LandingPage/>}/>
        </Routes>
      )}
    </div>
  )
}

export default App
