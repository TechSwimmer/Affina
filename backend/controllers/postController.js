
// Import the Mongoose model for posts
import postModel from "../models/postSchema.js";   



// ==========================
// Create a new post
// ==========================
const createPost = async (req, res) => {
    const {text} = req.body

    try{
        // Create a new post with text, current user ID, and optional image path
        const post = await postModel.create({
            user:req.user,
            text,
            image:req.file?.path    // optional file if uploaded
        })
        // Respond with success message and post details
        res.status(200).json({success:true, message:"Post uploaded successfully", post})
    }
    catch (error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal server error"})
    }
}


// ==========================
// Get all posts (for feed)
// ==========================

const getPosts = async (req, res) => {
    try{
        const posts = await postModel.find().populate('user', 'username avatar').sort({createdAt: -1}); 

        res.status(200).json({success:true, message:"Posts fetched successfully", posts})   
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"})
    }
}



// ==========================
// Get posts created by the logged-in user
// ==========================

const getPostsByUser = async (req, res) => {

   
    try{
        // Get all posts, populate user info (username and avatar), sort by newest
        const userID = req.user
        if(!userID){
            return res.status(400).json({success:false,message: "User is not authenticated"})
        }
        // Find all posts by this user
        const posts = await postModel.find({user:userID})

        if(!posts || posts.length === 0){
            return res.status(404).json({success:false, message:"Posts not found"})
        }

        console.log("✅ getPostsByUser HIT | User ID:", req.user);
        res.status(200).json({success:true, message:"Posts fetched successfully", posts})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"}) 
    }
}


// ==========================
// Update a specific post
// ==========================

const updatePost = async (req, res) => {
    const { text } = req.body
    const postId = req.params.id

    try{
        // Find post by ID
        const post = await postModel.findById(postId)
        if(!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        // Check if current user is the owner of the post
        if(post.user.toString() !== req.user){
            return res.status(403).json({success: false, message:"You are not authorized to update this post" })
        }
       

        // Update post with new text/image if provided
        const updatePost = await postModel.findByIdAndUpdate(
            postId,
            {
                text:text || post.text,
                image: req.file?.path || post.image

            },
            {   new: true }


        )
       res.status(200).json({success: true, message:"Post updated successfully", post:updatePost})

    }
    catch(error) {
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"}) 
    }
} 


// ==========================
// Delete a specific post
// ==========================
const deletePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params?.id)

        if(!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }

        // Only post owner can delete the post
        if(post.user.toString() !== req.user){
            return res.status(403).json({success: false, message:"You are not authorized to delete this post" })
        } 
         
        await post.deleteOne()

        res.status(200).json({success:true, message:"Post deleted successfully"})
    }
    catch(error) {
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"})
    }
}

// ==========================
// Like or Unlike a post
// ==========================
const toggleLike = async (req, res) => {

    const postId = req.params.id
    const userId = req.user

    try{
        const post = await postModel.findById(postId)

        if(!post){
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        
        const alreadyLiked = post.likes.includes(userId)

        if(alreadyLiked){
             
            // Unlike: removes userId from likes array
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString())
        }
        else{
            // Like
            post.likes.push(userId);
        }
        await post.save()
        res.status(200).json({
            success: true,
            message:alreadyLiked?"Post Unliked":"Post Liked",
            likes:post.likes.length
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"})
    }
}


// ==========================
// Add a comment to a post
// ==========================
const addComment = async (req, res) => {
    const {id: postId} = req.params;
    const { text } = req.body
    const userId = req.user

    try{
        const post = await postModel.findById(postId)

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }

        // Push the comment to the comments array
        post.comments.push({ user:userId, text })

        await post.save()
        // Return the newly added comment
        res.status(200).json({success: true, message:"Comment added successfully",comment:post.comments[post.comments.length - 1]})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message: "Internal Server Error"})
    }
}


// Export all post-related controller functions
export { 
    createPost, 
    getPosts, 
    getPostsByUser, 
    updatePost, 
    deletePost, 
    toggleLike, 
    addComment 
}