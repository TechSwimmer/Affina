import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";


const PublicProfile = () => {
    const { userId } = useParams()
    const { user: currentUser } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewedUser, setViewedUser] = useState(null);

    useEffect(() => {
        const fetchViewedUser = async () => {
            try{
                const res = await fetch(`/api/users/${userId}`);
                const data = await res.json();

                console.log("Fetched user data:", data);
                setViewedUser(data);

                // Only check followers after data is available

                if(data.followers?.includes(currentUser._id)){
                    setIsFollowing(true);
                }
                else{
                    setIsFollowing(false)
                }

            }
            catch(err) {    
                console.error("Failed to fetch user:", err );
            }
        };

        fetchViewedUser();
        },[userId, currentUser._id]);




    const handleFollow = async () => {
        setLoading(true);

        try {
            await fetch(`/api/users/${viewedUser._id}/follow`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({ userId: currentUser._id }),
            });
            setIsFollowing(true);

        }
        catch (error) {
            console.error("Follow error:", err);
        }
        finally {
            setLoading(false)
        }
    };


    const handleUnfollow = async () => {
        setLoading(true);

        try {
            await fetch(`/api/users/${viewedUser._id}/unfollow`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({ userId: currentUser._id }),

            });
            setIsFollowing(false);

        }
        catch (err) {
            console.error("Unfollow error: ", err);
        }
        finally {
            setLoading(false);
        }
    };


    if (!viewedUser) {
    return <div className="text-white text-center mt-10">Loading profile...</div>;
    }

    return (
        <div className="flex flex-col items-center">
            {/*     user info     */}
            <div className="flex flex-col items-center">
                <img src={viewedUser.avatar} className="w-32 h-32 rounded-full" alt="avatar" />
                <h1 className="text-white text-xl font-bold">{viewedUser.username}</h1>
                <p className="text-sm text-gray-300">{viewedUser.email}</p>

                {/*   Follow/Unfollow button   */}
                {currentUser._id !== viewedUser._id && (

                    <button
                        onClick={isFollowing ? handleFollow : handleUnfollow}
                        disabled={loading}
                        className={`mt-x px-4 py-2 rounded font-semibold ${isFollowing ? "bg-red-500" : "bg-blue-500"
                            } text-white`}
                    >
                        {loading ? "Please wait..." : isFollowing ? "Unfollow" : "Follow"}
                    </button>
                )}
                <button
                    onClick={() => navigate("/posts")}
                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
                >
                    Back to Posts
                </button>
            </div>
        </div>
    )
}



export default PublicProfile;