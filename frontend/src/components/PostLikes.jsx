import { useState } from "react";



 const postLikes = ({ likes }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    if(!likes || likes.length == 0) return null;

    const firstUser = likes[0];
    const otherUsers = likes.slice(1);
    console.log(firstUser.username);
    console.log(otherUsers);


    return (
        <div className="relative text-sm text-white">
            <span>
                {firstUser.username}
                {otherUsers.length > 0 && (
                    <>
                        {" and "}
                        <button
                            className="text-blue-400 underline"
                            
                        ></button>
                        
                        <span className="cursor:pointer" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                          
                        {otherUsers.length} other{otherUsers.length > 1 ? "s" : ""}
                        </span>{" "}
                        Like this post
                    </>
                )}
            </span>



            {/* Dropdowbn */}
            {showDropdown && (
                <div className="absolute z-10 mt-2 p-2 bg-gray-800 border border-gray-600 rounded-md shadow-lg ">
                    <ul className="space-y-1 max-h-40 overflow-y-auto">
                        {otherUsers.map((user) => (
                            <li key={user._id} className="text-white">
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )


 }

 


 export default postLikes;