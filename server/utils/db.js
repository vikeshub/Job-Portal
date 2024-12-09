import mongoose from "mongoose";

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("MongoDB connected Succesfully...")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;