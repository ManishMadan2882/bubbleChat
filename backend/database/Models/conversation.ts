import mongoose from "mongoose";
const Conversation = new  mongoose.Schema({
    members :  {
        type:[mongoose.Schema.ObjectId],
        ref:'User'
        
    },
    messages:[
        {
            sender:{
                type:mongoose.Schema.ObjectId,
                required:true,
                ref:'User'
                
            },
            text:String,
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
        
    ]
    
},
{
    timestamps:true
})

export default mongoose.model('Conversation',Conversation)