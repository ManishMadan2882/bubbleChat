import { Request, Response } from "express"
import conversation from "../database/Models/conversation";
import messages from "../database/Models/messages";

const createConversation = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;
    try {
        const newConversation = new conversation({
            members: [
                {
                    senderId,
                    receiverId
                }
            ]
        })
        await newConversation.save();
        res.status(202).json(newConversation)
    } catch (error) {
        res.status(400).json(error);
    }
}

const getConversation = async (req: Request, res: Response) => {
   try {
    const username = req.user;
    const chats: any = await conversation.findOne(
        {
            members: {
                $in: [username]
            }
        }
    )
    const latestMsg: any = await messages.findOne(
        {
            conversationId: chats?._id
        }
    ).sort({
        createdAt: -1
    }).limit(1)
    chats.latestMsg = latestMsg
    res.status(201).json(
        chats
    )
   } catch (error) {
     res.status(400).json(error)
   }

}

const getEndToEndConversation = async (req:Request, res:Response) => {
    try {
      const conv = await conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(202).json(conv)
    } catch (err) {
      res.status(400).json(err);
    }
  }

export {
    getConversation,
    createConversation,
    getEndToEndConversation
}