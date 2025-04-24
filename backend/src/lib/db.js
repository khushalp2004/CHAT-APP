import mongoose from 'mongoose';


//check whether the database is connected or not
export const connectDB = async () => {
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
    }
};