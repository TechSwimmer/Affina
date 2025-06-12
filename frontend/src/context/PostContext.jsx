// Import required libraries and contexts
import axios from 'axios'
import cookie from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from './AuthContext'       // Import required libraries and contexts


// Import required libraries and contexts
export const PostContext = createContext()

const PostContextProvider = ({children}) => {      

    const navigate = useNavigate();

    const {backendUrl, token} = useContext(AuthContext)  // Get base URL and token from AuthContext


    // State to store posts
    const [allPosts, setAllPosts] = useState([])          // All public posts
    const [userPosts, setUserPosts] = useState([])        // Posts created by logged-in user
    
    // Token from cookies
    const utoken = cookie.get("token")

    // Fetch all posts (public feed)
    const fetchAllPosts = async () => {
        try{
            const {data} = await axios.get(`${backendUrl}/api/posts/get-posts`)
            if(data.success) {
                setAllPosts(data.posts)
            }
        }
        catch (error){
            toast.error(error.message)
        }
    }

    // Fetch posts of currently logged-in user
    const fetchPostsOfLoginUser = async() => {
        const utoken = cookie.get("token");
        console.log("UTOKEN:", utoken);

        if(!utoken) {
            console.log("No token found. User might not be logged in.");
            return;
        }
        try{
            const{data} = await axios.get(`${backendUrl}/api/posts/user-posts`,{
                headers: {
                    Authorization:`Bearer ${utoken}`
                }
            })
            if(data.success){
                setUserPosts(data.posts)
            }
            if(!data){
                console.log('No tasks found')
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    // Like a post (⚠️ BUG: postId is passed, but you're using undefined `id`)
    const likePosts = async (id) => {
        try{
            const {data} = await axios.put(`${backendUrl}/api/posts/${id}/like`,{},{
                headers: {
                    Authorization:`Bearer ${utoken}`
                }
            })
            if(data.success){
                toast.success(data.message)
                fetchAllPosts()
            
        }
    }
        catch(error){
            toast.error(error.message)
        }
    } 

     // Comment on a post 
    const postsComment = async(id, text) => {
        try{
            console.log(id)
            console.log(text)
            
            const {data} = await axios.post(`${backendUrl}/api/posts/${id}/comment`,{text},{
                headers: {
                    Authorization:`Bearer ${utoken}`
                }
            })
            if(data.success){
                toast.success(data.message)
                fetchAllPosts()
            }
        }
        catch(error) {
            toast.error(error.message)
        }
    }

    // Create a new post (text + optional image)
    const createPost = async (text,image) => {
        const utoken = cookie.get("token")
        console.log("UTOKEN:", utoken)
        const formData = new FormData()
        formData.append('text',text)
        if(image){
            formData.append('image',image)
        }

        try{
            const {data} = await axios.post(`${backendUrl}/api/posts/create-post`, formData, {
                headers:{
                    Authorization:`Bearer ${utoken}`
                }
            })
            if(data.success){
                toast.success(data.message)
                fetchPostsOfLoginUser()     // Refresh user posts
                navigate('/posts')          // Redirect to posts page
            }
        }
        catch(error) {
            toast.error(error.message)
        }
    } 

    // Delete a post by ID
    const deletePost = async (id) => {
        try{
            const { data } = await axios.delete(`${backendUrl}/api/posts/${id}`,{
                headers : {
                    Authorization:`Bearer ${utoken}`
                }
            })
            if(data.success){
                toast.success(data.message)
                fetchPostsOfLoginUser()
                // fetchAllPosts()
                navigate('/posts')
            }
        }
        catch(error) {
            toast.error(error.message)
        }
    }


    


    // On initial load, fetch all posts and user posts if logged in
    useEffect(() => {
        if(token){
            fetchAllPosts()
            fetchPostsOfLoginUser(
                
            )
        }
    }, [])


    // Values provided to any component that consumes this context
    const values = {
        fetchAllPosts,
        fetchPostsOfLoginUser,
        likePosts,
        postsComment,
        createPost,
        deletePost,
        allPosts,
        userPosts,
        setUserPosts 
    }


    return (
        <PostContext.Provider value={values}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;  