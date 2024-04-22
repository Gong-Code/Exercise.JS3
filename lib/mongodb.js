import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI)

if(!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env file')
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const opts = {
            bufferCommands
        }
    }
} 