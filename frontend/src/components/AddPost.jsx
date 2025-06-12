import React, { useState,useContext } from "react";
import { PostContext } from "../context/PostContext";

const AddPost = () => {
    // Local state to manage the caption text
    const [text, setText]  = useState("")

    // Local state to hold the selected image file
    const [image, setImage] = useState(null)

    // Preview of the selected image before submission
    const [imagePreview, setImagePreview] = useState(null)

    // Access createPost function from PostContext
    const { createPost } = useContext(PostContext)

    // Handles image file input and generates a preview
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

    // Handles form submission to create a new post
    const handleSubmit = async (e) => {
        e.preventDefault()
        createPost(text,image)     // Call the context method to save post
    }
 
    return(
        <div className="p-6 max-w-lg mt-12 mx-auto border border-gray-600 text-white bg-gradient-to-1 from-[#13072e] to-[#3f2182] rounded shadow-md  transition-all duration-300 ease-in-out">
            <h2 className="text-lg font-semibold mb-4 ">New Post</h2>
            <form>
                {/* Caption Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Caption</label>
                    <textarea onChange={(e) => setText(e.target.value)} className="w-full mt-1 text-black focus:outline-none p-2 border-rounded bg-gray-100" rows="4" value={text} required></textarea>
                </div>
                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full mt-1 p-2 border border-gray-300 bg-gray-100 rounded text-black"
                    />
                    
                </div>
                {/* Image Preview */}
                {imagePreview && (
                    <div className="mb-4">
                        <img 
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded"
                        />
                    </div>
                )}
                {/* Submit Button */}
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