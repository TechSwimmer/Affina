import axios from 'axios'
import cookie from 'js-cookie'
import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const backendUrl = 'http://localhost:3000'

    const [token, setToken] = useState(!cookie.get('token'))
    const [user, setUser] = useState('')

    useEffect(() => {
        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get('token')}`
        }
        else{
            delete axios.defaults.headers.common["Authorization"]
        }
    }, []) 


    const fetchCurrentUserDetails  = async () => {
        try{
            const utoken = cookie.get("token")
            const {data} = await axios.get(`${backendUrl}/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            if(data.success) {
                setUser(data.currentUser)
            }  
        }
        catch(error) {
            console.log(error)
            toast.error("Login again")
        }
    }


    useEffect(() => {
        if(token){
            fetchCurrentUserDetails();
        }
    }, [])

    const handleRegister = async (username, email, password, avatar) => {
        try {
            const formData = new formData()

            formData.append('username', username)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('image', image)

            const { data } = await axios.post(`${backendUrl}/api/user/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if (data.success) {
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

    const handleLogin = async ( email, password ) => {
        try {
          

            const { data } = await axios.post(`${backendUrl}/api/user/login`,{ email, password }, {
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

    const handleLogout = () => {
        cookie.remove('token')
        setToken(false)
        setUser(null)
        toast.success('Logout successfull')
        navigate('/')
    }

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

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;