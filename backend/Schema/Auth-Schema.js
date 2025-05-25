import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 6 },
        phone: { type: String, required: true, match: [/^\d{10,12}$/, "Invalid phone number"] },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true } // Adds createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);
export default User;