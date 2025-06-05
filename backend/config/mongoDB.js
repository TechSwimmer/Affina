
// Import mongoose to interact with MongoDB
import mongoose from "mongoose";


// Function to connect to MongoDB
const connectDB = async () => {
    // Log a message when the database connection is successfully established
    mongoose.connection.on("connected", () => console.log('Database connected'));

    // Connect to MongoDB using the URI stored in the environment variable
    // Appends the specific database name at the end of the URI
    await mongoose.connect(`${process.env.MONGODB_URI}/SOCIAL MEDIA APP (AFFINI)`);

}


// Export the connection function so it can be used in the main server file
export default connectDB;