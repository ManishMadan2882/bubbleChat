import { createContext } from "react"
type Account = {
    profilePicture : string,
    _id:string,
    username:string
}
type Message = {
    sender:string,
    text:string,
    createdAt:Date,
    _id:string
}
declare global{
    type Conversations = {
        _id : string,
        createdAt:Date,
        updatedAt:Date,
        members : Account[],
        messages:Message[]
    }[]
}

const ChatContext = createContext<Conversations[]>([]);

export default ChatContext