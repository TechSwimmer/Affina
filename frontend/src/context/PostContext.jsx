import axios from 'axios'
import cookie from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from './AuthContext'


export const PostContext = createContext()

const PostContextProvider = ({children}) => {

    const navigate = useNavigate();

    const {backendUrl, token} = useContext(AuthContext) 

    const [allPosts, setAllPosts] = useState([])
    const [userPosts, setUserPosts] = useState([])
 
    const utoken = cookie.get("token")

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

    const likePosts = async (postId) => {
        try{
            const {data} = await axios.put(`${backendUrl}/api/posts/post/${id}/like`,{},{
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


    const postsComment = async(id, text) => {
        try{
            const {data} = await axios.post()(`${backendUrl}/api/posts/${id}/comment`,{text},{
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
                fetchPostsOfLoginUser()
                navigate('/posts')
            }
        }
        catch(error) {
            toast.error(error.message)
        }
    } 

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
                fetchAllPosts()
                navigate('/posts')
            }
        }
        catch(error) {
            toast.error(error.message)
        }
    }


    


    
    useEffect(() => {
        if(token){
            fetchAllPosts()
            fetchPostsOfLoginUser(
                
            )
        }
    }, [])



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