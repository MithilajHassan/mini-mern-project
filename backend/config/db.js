import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`db connected ${db.connection.host}`)
    } catch (err) {
        console.error(`Error : ${err.message}`)
    }
}

export default connectDB