import mongoose from "mongoose";
async function connectDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
      serverSelectionTimeoutMS: 5 * 1000, // 5 sec
    //   maxConnecting: 2,
    });
    console.log("DB Connected");
  } catch (e) {
    console.error("Database connection failed:", "Error");
    process.exit(1);
  }
}
export default connectDb;
