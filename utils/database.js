import mongoose from 'mongoose'

let isConnected = false; // track the connection status

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"prompton_DB123"
        })
        isConnected = true
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}