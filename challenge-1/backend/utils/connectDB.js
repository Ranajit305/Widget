import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Database is Connected');
        return true;
    } catch (error) {
        console.log(error.message);
    }
}