import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/daily-checkin';

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB connected:', MONGO_URL);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
