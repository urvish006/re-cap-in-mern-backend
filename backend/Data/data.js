import mongoose from "mongoose";

const URL = "mongodb://localhost:27017/ram"; // Replace with your MongoDB connection string

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Database connection failed", err);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;