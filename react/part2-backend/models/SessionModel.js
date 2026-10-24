import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    SessionData: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    Expires: {
      type: Number,
      default: Date.now() / 1000 + 60 * 60
    },
  },
  {
    timestamps: false,
  },
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
