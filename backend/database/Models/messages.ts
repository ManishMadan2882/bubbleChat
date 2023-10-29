import mongoose from "mongoose";
const Messages = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Conversation'
    },
    text: {
        type: String
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model('Messages',Messages)