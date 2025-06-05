import React, { useState,useContext } from "react";
import { PostContext } from "../context/PostContext";

const AddPost = () => {

    const [text, setText]  = useState("")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const { createPost } = useContext(PostContext)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setImage(file)
        if(file){
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
        else {
            setImagePreview(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        createPost(text,image)
    }
 
    return(
        <div className="p-6 max-w-lg mt-12 mx-auto border border-gray-600 text-white bg-gradient-to-1 from-[#13072e] to-[#3f2182] rounded shadow-md  transition-all duration-300 ease-in-out">
            <h2 className="text-lg font-semibold mb-4 ">New Post</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Caption</label>
                    <textarea onChange={(e) => setText(e.target.value)} className="w-full mt-1 text-black focus:outline-none p-2 border-rounded bg-gray-100" rows="4" value={text} required></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full mt-1 p-2 border border-gray-300 bg-gray-100 rounded text-black"
                    />
                    
                </div>
                {imagePreview && (
                    <div className="mb-4">
                        <img 
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded"
                        />
                    </div>
                )}

                <div className="flex justify-end">
                    <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white p-2 rounded ">
                        Submit
                    </button>

                </div>
                
            </form>
        </div>
    )
}

export default AddPost;