import  { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import  {MdDelete} from 'react-icons/md'

const Profile = () => {

    const {user} = useContext(AuthContext)
    const {userPosts,deletePost, fetchPostsOfLoginUser, setUserPosts} = useContext(PostContext) 
 
    useEffect(() => {
        fetchPostsOfLoginUser()
        // setUserPosts([])
    },[])

    return (
        <div className="p-6 min-h-[87vh] border-l rounded-md bg-gradient-to-b from-[#13072e] to-[#3f2182] border-gray-700 hidden md:block">
            <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6 ">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space -y-0 md:space-x-6">
                    <img
                        src={user.avatar}
                        alt="User avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <div className="hidden lg:block justify-center">
                        <h1 className="text-2xl font-bold text-white ">{user.username}</h1>
                        <div className="flex item-center gap-2">
                            <p className="text-white text-sm">{user.email}</p>
                        </div>
                        <div className="mt-4 flex flex-row justify-center item-center gap-2">
                            <p className="text-white text-sm">
                                <span className="font-semibold">
                                    Total Posts:
                                </span>{Array.isArray(userPosts) ? userPosts.length : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-6 max-h-xl overflow-y-scroll">
                <h2 className="text-xl font-bold text-white mb-4">Uploaded Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 object-cover h-20">
                    {userPosts?.map((post,index) => (
                        <div key={index} className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow group">
                            <img
                                src={post.image}
                                alt="image"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                <div className="flex flex-row justify-center items-center gap-2"> 
                                    <MdDelete onClick={() => deletePost(post._id)} className="text-red-800 text-2xl cursor-pointer"/>
                                </div>

                            </div>

                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile; 