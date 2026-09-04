import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    SessionData: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
  },
  {
    timestamps: false,
  },
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
