import User from "../Schema/Auth-Schema.js";
import bcrypt from "bcrypt";

// Home Route Handler
const home = async (req, res) => {
    try {
        res.status(200).json({ message: "Home successful" });
    } catch (error) {
        console.error("Error in Home Route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Register Handler
const register = async (req, res) => {
    try {
    
        const { username, email, password, phone } = req.body;
        // Ensure all required fields are present
        if (!username || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash,
            phone,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// // Login Handler
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, userExists.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user: userExists });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Export Handlers
export default {
    home,
    register,
    login
};