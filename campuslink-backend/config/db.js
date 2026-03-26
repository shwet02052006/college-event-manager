import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('⚠️  MONGO_URI not set. Skipping MongoDB connection for now.');
    return;
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.warn('⚠️  Continuing to run without database. Ensure MongoDB is running and restart the server.');
    // Intentionally not exiting to allow health checks and static routes to work during setup
  }
};

export default connectDB;
