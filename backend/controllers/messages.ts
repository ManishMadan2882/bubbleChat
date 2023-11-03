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
    const updatedText = await conversation.updateOne({
      members: {
        $in: [sender, receiverId]
      }
    },
      {
        $push: { messages: { text, sender,createdAt:Date.now() } },
        $setOnInsert: { members: [sender, receiverId] }
      },
      { upsert: true }
    )
    res.status(200).json({

      status: updatedText.acknowledged,
      msg: "success"
    })
  }
  catch (err) {
    res.status(500).json({ err, status: false });
  }
}
//get

const getAllConversation = async (req: Request, res: Response) => {
  const { userId } = req.user
  try {
    const conv = await conversation.find({
      members:{$in:[userId]}},
      )
      .populate('members',['username','profilePicture'])
      .sort({updatedAt : -1})
      
      conv.forEach((elem:any)=>{
        //elem.members = elem.members.filter((member:any)=> member._id !== userId)
        elem.messages=elem.messages[elem.messages.length-1]
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
      members:{$in:[userId,receiverId]}})
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