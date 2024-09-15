import mongoose from "mongoose";

const dbURI = process.env.DATABASE_URL;

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect('mongodb+srv://deekorde:VFc57BibZEmLtWjs@cluster0.sjath.mongodb.net/TravelAI-db?retryWrites=true&w=majority');

    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;

connectDB();
