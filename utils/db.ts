import mongoose from "mongoose";

const dbURI = process.env.DATABASE_URL;

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(dbURI);

    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

connectDB();
