import mongoose from "mongoose";


const connectDB =  async () => {
    try {
        const connection = await mongoose.connect(process.env.BD_URI);
        console.log('MongoDB connection established');
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;