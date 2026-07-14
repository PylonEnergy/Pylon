import mongoose from "mongoose";

export let isDBConnected = false;

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pylon-energy";
  try {
    // Attempt connection with a short timeout so it doesn't hang long if not running
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    console.log("MongoDB database connected successfully.");
    isDBConnected = true;
  } catch (error) {
    console.log("-----------------------------------------------------------------");
    console.log("WARNING: MongoDB is not running on this machine.");
    console.log("The server will start anyway using in-memory mock database mode.");
    console.log("All quote submissions and contact requests will be processed successfully.");
    console.log("-----------------------------------------------------------------");
    isDBConnected = false;
  }
}
