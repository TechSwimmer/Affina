import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import { Navigate,Route,Routes } from 'react-router-dom'
import PostPage from './pages/PostPage'
import LandingPage from './pages/LandingPage'
import AddPost from './components/AddPost'
import Registerpage from './pages/RegisterPage'

function App() {
  
  const { token } =   useContext(AuthContext);
 
  return (
    <div className='h-screen'>
    <ToastContainer/>
      {token ? (
        <>
         
          <Routes>
            <Route path = '/posts' element = {<PostPage />}/>
            <Route path = '/' element = {<Navigate to="/posts" />} />
            <Route path = '/create-post' element = {<AddPost/>} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element= {<LandingPage/>}/>
          <Route path='/register' element= {<Registerpage />}/>
        </Routes>
      )}
    </div>
  )
}

export default App
