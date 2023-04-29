import mongoose from 'mongoose';

const user = process.env.MONGODB_USERNAME;
const pass = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST;
const dbname = process.env.MONGODB_DATABASE_NAME;

const MONGO_URI = `mongodb://${user}:${pass}@${host}:27017/${dbname}?authMechanism=DEFAULT&authSource=admin`;

const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
