


import jwt from "jsonwebtoken";

// Middleware to protect routes - ensures only authenticated users can access
const protect = (req, res, next) => {
    
    // Get token from cookies or headers
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]);

    // If no token found, block access
    if(!token) {
        return res.status(401).json({ message: "Not authorized"})
    }

    try{
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID to request object for downstream access (e.g., in controllers)
        req.user = decoded?.id;

        // Proceed to next middleware or route handler
        next(); 
    }
    catch(error){
        // Token is invalid or expired
        res.status(401).json({ message: "Invalid token"})
    } 
}

export default protect; 