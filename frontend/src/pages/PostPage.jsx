import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { FaCommentDots, FaRegThumbsUp } from "react-icons/fa";
import { IoIosAttach } from 'react-icons/io';
import { IoSend } from "react-icons/io5"
import Profile from "../components/Profile";
import PostLikes from "../components/PostLikes";


const PostPage = () => {

    // Get current user from AuthContext
    const { user } = useContext(AuthContext)

    // Get post data and related functions from PostContext
    const { allPosts, likePosts, postsComment, fetchAllPosts } = useContext(PostContext)

    // State to manage comment input
    const [comments, setComments] = useState({})

    // Fetch all posts once when the page loads
    useEffect(() => {
        fetchAllPosts(); // fetch posts when PostPage mounts
    }, []);

    // Handle input changes in the comment field
    const handleChange = (e, id) => {
        const { name, value } = e.target
        setComments((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [name]: value,
            },
        }));
    }

    // Submit a new comment for a post
    const handleSubmit = async (e, id) => {
        e.preventDefault()
        const commentText = comments[id]?.text?.trim();
        if (commentText) {
            await postsComment(id, commentText);
            setComments((prev) => ({
                ...prev,
                [id]: { text: "" }
            }));


        }
    };

    return (
        <>
            <div>

                {/* Top navigation bar */}
                <Navbar />
            </div>
            <div className="flex flex-col md:flex-row overflow-auto gap-2">
                {/* Sidebar - visible only on medium and larger screens */}
                <div className="hidden md:block p-3 fixed mt-20">
                    <SideBar />
                </div>

                {/* Main content area */}
                <div className="flex-2 px-4 py-4 mt-16 ml-75">
                    <div className="container text-white gh-[87vh] mx-auto max-w-screen-sm space-ty-6  overflow-auto ">
                        {/* Reverse the posts array so latest appears first */}
                        {allPosts?.slice()?.reverse()?.map((post, index) => (
                            <div key={index} className="bg-gradient-to-r from-[#13072e] to-[#3f2182] rounded-lg shadow p-4 space-y-4 ">
                                {/* Post header - user avatar and name */}
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

                                {/* Post text content */}
                                <p className="text-white">{post.text}</p>
                                {/* Post image */}
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="w-full rounded-lg object-cover"
                                />

                                {/* Likes and comment counts */}
                                <div className="flex justify-start gap-4 text-white text-sm items-center">
                                    <div className="flex items-center gap-1">
                                        <FaRegThumbsUp className="text-xl  hover:text-blue-500 cursor-pointer" onClick={() => likePosts(post._id)}/>
                                        <PostLikes likes={post.likes} />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaCommentDots className="text-xl hover:text-blue-500 cursor-pointer" />

                                        {/* FIX NEEDED: This is showing number of likes instead of comments */}
                                        <span>{post.comments.length} Comment</span>
                                    </div>

                                </div>
                                {/* Display top 3 comments */}
                                <div className="space-y-2 ">
                                    <p className="font-bold text-white ">Comments:</p>
                                    <div className={`space-y-1 overflow-y-auto ${post.comments.length > 2 ? "max-h-36" : "max-h-none"
                                        } custom-scrollbar`}>
                                        {post.comments?.slice().map((comment, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-left gap-2 bg-[#1e1b4b] px-3 py-2 rounded-lg"
                                            >
                                                <div className="flex gap-2">
                                                    <img
                                                        src={comment.user?.avatar}
                                                        alt="avatar"
                                                        className="w-7 h-7 rounded-full object-cover"
                                                    />
                                                    <p className="text-sm mt-1">
                                                        <span className="font-semibold text-white bg-gray-700 rounded-lg p-1">
                                                            {comment.user?.username}
                                                        </span>
                                                    </p>
                                                </div>

                                                <div>

                                                    <p key={index} className="text-white rounded p-2 flex flex-row justify-start items-center gap-2 bg-gray-900 rounded-md">
                                                        {comment.text}
                                                    </p>
                                                </div>

                                            </div>

                                        ))}
                                    </div>
                                </div>

                                {/* Comment input field and action icons */}
                                <form onSubmit={(e) => handleSubmit(e, post._id)} className="flex text-black items-center space-x-2 mt-4 ">
                                    <div className="w-8 h-8 hidden md:block rounded-full bg-gary-200 overflow-hidden ">
                                        <img
                                            src={user.avatar}
                                            about="User Avatar"
                                            className="w-full h-full object-cover "
                                        />
                                    </div>

                                    {/* Comment input */}
                                    <input
                                        type="text"
                                        value={comments[post._id]?.text || ""}
                                        name="text"
                                        onChange={(e) => handleChange(e, post._id)}
                                        placeholder="write a comment..."
                                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                                    />

                                    {/* Optional file/comment actions (currently not functional) */}
                                    <div className="flex space-x-2">
                                        <button type="button" className="p-2 text-2xl rounded-full text-white " title="Attach File">
                                            <IoIosAttach />
                                        </button>
                                        <button type="submit" className="p-2 text-2xl hover:bg-[#13072e] rounded-full text-white " title="Post comment File" >
                                            <IoSend />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side - user profile display */}
                <div className="w-1/3 ">
                    <Profile />
                </div>
            </div>
        </>
    )
}

export default PostPage;