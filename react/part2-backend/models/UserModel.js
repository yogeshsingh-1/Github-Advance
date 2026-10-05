import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwd: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
