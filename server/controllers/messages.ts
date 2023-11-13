import { Response, Request } from "express";
import mongoose from "mongoose";
import conversation from "../database/Models/conversation";
import { ObjectId } from "mongoose";
//add
const addMessage = async (req: Request, res: Response) => {
  const text: string = req.body.text;
  const sender = req.user.userId;
  const receiverId = req.body.receiverId
  try {
    const updatedText = await conversation.findOne(
      { 
        members: { $all: [new mongoose.Types.ObjectId(sender), new mongoose.Types.ObjectId(receiverId)]}
      }
    )
    if(updatedText){
      await conversation.updateOne({
        members: { $all: [new mongoose.Types.ObjectId(sender), new mongoose.Types.ObjectId(receiverId)]}
      },
      {$push: { messages: { text, sender, createdAt: Date.now() } }},
      )
    }
    else{
      const newCreation = new conversation({
        members:[sender,receiverId],
        messages:[{text,sender,createdAt:Date.now()}]
      })
      await newCreation.save();
    }
    res.status(200).json({
      status: true,
      msg: "success"
    })
  }
  catch (err) {
    console.log(
      err
    )
    res.status(500).json({ err, status: false });
  }
}
//get

const getAllConversation = async (req: Request, res: Response) => {
  const { userId } = req.user
  try {
    const conv = await conversation.find({
      members: { $in: [userId] }
    },
    )
      .populate('members', ['username', 'profilePicture'])
      .sort({ updatedAt: -1 })

    conv.forEach((elem: any) => {
      //elem.members = elem.members.filter((member:any)=> member._id !== userId)
      elem.messages = elem.messages[elem.messages.length - 1]
    })

    res.status(202).json(conv)
  }
  catch (error) {
    res.status(400).json(error)
  }
}
const getConversation = async (req: Request, res: Response) => {
  const { receiverId } = req.params;
  const { userId } = req.user;
  try {
    const conv = await conversation.findOne({
      $and: [
        { members: { $in: [userId] } },
        { members: { $in: [receiverId] } }
      ]
    })
    .populate('members', ['username', 'profilePicture'])
    

    res.status(202).json(conv)
  }
  catch (error) {
    res.status(400).json(error)
  }
}
export {
  getConversation,
  getAllConversation,
  addMessage
}