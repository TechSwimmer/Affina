// Import necessary modules
// export default AuthContextProvider;
import axios from 'axios'
import cookie from 'js-cookie'
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Create a new context for authentication
export const AuthContext = createContext()

// Optional import from PostContext (not used in this file, can be removed)
import { PostContext } from './PostContext'


const AuthContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_API_BASE_URL;

    // Authentication state
    const [token, setToken] = useState(!cookie.get('token'))     // Note: `!cookie.get` makes token false if cookie exists, likely a bug
    const [user, setUser] = useState('')                         // Will hold current user details

    // Set or remove default Authorization header based on token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get('token')}`
        }
        else {
            delete axios.defaults.headers.common["Authorization"]
        }
    }, [])

    // Fetch current logged-in user details
    const fetchCurrentUserDetails = async () => {
        try {
            const utoken = cookie.get("token")
            const { data } = await axios.get(`${backendUrl}/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            if (data.success) {
                setUser(data.currentUser)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Login again")
        }
    }

    // Run fetch user logic if token exists on mount
    useEffect(() => {
        if (token) {
            fetchCurrentUserDetails();
        }
    }, [])

    // Function to register new users
    const handleRegister = async (formData) => {
        try {
            
            const { data } = await axios.post(`${backendUrl}/api/user/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            
            if (data.success) {
                // Save token in cookie for 7 days
                cookie.set("token", data.token, { expires: 7 })
                setToken(true)
                setUser(data.user)
                toast.success(data.message || "Register successfull")
                navigate('/posts')
            }

        }
        catch (error) {
            console.log(error)
            toast.error('Register failed')
        }
    }

    // Function to login existing users
    const handleLogin = async (email, password) => {
        try {


            const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (data.success) {
                cookie.set("token", data.token, { expires: 7 })
                setToken(true)
                setUser(data.user)
                toast.success(data.message || "Login successfull")
                navigate('/posts')
                
            }

        }
        catch (error) {
            console.log(error.message)
            toast.error('Login failed')
        }
    }

    // Function to logout user
    const handleLogout = () => {
        cookie.remove('token')
        setToken(false)
        setUser(null)
        toast.success('Logout successfull')
        navigate('/')
    }

    // Shared values provided to context consumers
    const values = {
        backendUrl,
        token,
        setToken,
        user, setUser,
        handleRegister,
        handleLogin,
        handleLogout,
        fetchCurrentUserDetails
    }

    // Wrap children in context provider
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;