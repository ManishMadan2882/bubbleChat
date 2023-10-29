import mongoose from "mongoose";
const Conversation = new  mongoose.Schema({
    members : Array
},
{
    timestamps:true
})

export default mongoose.model('Conversation',Conversation)