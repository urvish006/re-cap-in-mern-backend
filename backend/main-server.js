import express from 'express';
import dotenv from 'dotenv';
import authRouter from './Routers/Auth-router.js';
import connectDB from './Data/data.js';

// Load environment variables from .env file
dotenv.config();

// Initialize express app and set up middleware
const app = express();

// Set the port from environment variable or default to 4000
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);

connectDB().then(() =>{
    app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}); 
});

