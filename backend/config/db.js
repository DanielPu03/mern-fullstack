import mongoose from 'mongoose';

export  const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING );
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);//exit process if cannot connect to db
  }connectDB;
}
