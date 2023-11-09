import mongoose from 'mongoose'
import { type } from 'os';
import mongoConnect from '../connectDb';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String
    },
    status: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    contact: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    chats: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Chat"
        }
    ]
});
export default mongoose.model("User", userSchema);