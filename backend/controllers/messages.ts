import { Response,Request } from "express";
import messages from "../database/Models/messages";

//add
const addMessage = async (req:Request, res:Response) => {
    const newMessage = new messages(req.body);
  
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  }
//get

const getMessage = async (req:Request, res:Response) => {
    try {
      const message = await messages.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(message);
    } catch (err) {
      res.status(400).json(err);
    }
  }

export{
    getMessage,
    addMessage
}