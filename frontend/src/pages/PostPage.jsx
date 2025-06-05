import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { FaCommentDots, FaRegThumbsUp } from "react-icons/fa";
import { IoIosAttach } from 'react-icons/io';
import { IoSend } from "react-icons/io5"
import Profile from "../components/Profile";


const PostPage = () => {

    const { user } = useContext(AuthContext)
    const { allPosts, likePosts, postsComment } = useContext(PostContext)

    const [comments, setComments] = useState({
        text: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setComments((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e, id) => {
        e.preventDefault()
        if (comments.text.trim()) {
            postsComment(id, comments.text)
            setComments({ text: "" })
        }
    }

    return (
        <>
        <div>

        
        <Navbar/>
        </div>
        <div className="flex flex-col md:flex-row overflow-auto">
            <div className="hidden md:block p-3">
                <SideBar />
            </div>

            <div className="flex-1 p-4 ">
                <div className="container text-white gh-[87vh] mx-auto max-w-screen-sm space-ty-6 overflow-auto ">

                    {allPosts?.slice()?.reverse()?.map((post, index) => (
                        <div key={index} className="bg-gradient-to-r from-[#13072e] to-[#3f2182] rounded-lg shadow p-4 space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-lg font-bold text-gary-600">
                                    <img
                                        src={post.user.avatar}
                                        alt="User avatar"
                                        className="w-full h-full object-cover rounded-full "
                                    />

                                </div>
                                <div>
                                    <h4 className="text-lg font-bold ">{post.user.username}</h4>
                                </div>
                            </div>
                            <p className="text-white">{post.text}</p>
                            <img
                                src={post.image}
                                alt="Post"
                                className="w-full rounded-lg object-cover"
                            />
                            <div className="flex justify-start gap-4 text-white text-sm items-center">
                                <div onClick={() => (likePosts(post._id))} className="flex items-center gap-1">
                                    <FaRegThumbsUp className="text-xl  hover:text-blue-500 cursor-pointer" />
                                    <span>{post.likes.length} Likes</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaCommentDots className="text-xl hover:text-blue-500 cursor-pointer" />
                                    <span>{post.likes.length} Comment</span>
                                </div>

                            </div>

                            <div className="space-y-2 ">
                                <p className="font-bold text-white ">Comments:</p>
                                <div className="max-h-20 overflow-y-scroll space-y-1">
                                    {post.comment?.slice(0, 3).map((comment, index) => (
                                        <p key={index} className="text-white rounded p-2 flex flex-row justify-start items-center gap-2">
                                            {comment.text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <form onSubmit={(e) => handleSubmit(e, post._id)} className="flex text-black items-center space-x-2 mt-4 ">
                                <div className="w-8 h-8 hidden md:block rounded-full bg-gary-200 overflow-hidden ">
                                    <img
                                        src={user.avatar}
                                        about="User Avatar"
                                        className="w-full h-full object-cover "
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={comments.text}
                                    name="text"
                                    onChange={handleChange}
                                    placeholder="write a comment..."
                                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                                />

                                <div className="flex space-x-2">
                                    <button type="button" className="p-2 text-2xl rounded-full text-white " title="Attach File">
                                        <IoIosAttach />
                                    </button>
                                    <button type="button" className="p-2 text-2xl hover:bg-[#13072e] rounded-full text-white " title="Post comment File">
                                        <IoSend />
                                    </button>
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-1/3 ">
                <Profile />
            </div>
        </div>
        </>
    )
}

export default PostPage;