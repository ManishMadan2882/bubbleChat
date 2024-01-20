import { Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Image from "next/image";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Nav from "./Nav";
import Users from "./Users";
import { ChatBox } from "./ChatBox";
import { DefaultDisplay } from "./DefaultDisplay";
import ChatContext from "@/context/chatContext";
import { loadConversations } from "../api/loadUsers";
import { useCookies } from "react-cookie";
const socket: Socket = io("http://localhost:8000/");


const Chat = () => {

    /* const [msg, setMsg] = useState<string>('')
    const [left,setLeft] = useState<number>(10)
    const [arr, setArr] = useState<string[]>([]) */
    const [cookies, setCookie, removeCookie] = useCookies(['session-token'])
    const token = cookies['session-token']
    const [currentUser, setCurrentUser] = useState<string>('')
    const [conversations,setConversations] = useState<Conversations[]>([])
    useEffect(()=>{
        socket.on("getMessage", (data:any) => {
          
        });
      })
      useEffect(() => {
        loadConversations(token).then((data) => {
            setConversations(data)
        })
    }, [])

    return (
        //@ts-ignore
        <ChatContext.Provider value={[conversations,setConversations]}>
            <div className="m-0">
                <Nav />
                <div className="grid w-full h-[90vh] grid-cols-6 sm:grid-cols-3 gap-2">
                    <Users setCurrentUser={setCurrentUser} currentUser={currentUser} />

                    {(currentUser.length > 0) ?
                        <ChatBox socket={socket} currentUser={currentUser} />
                        : <DefaultDisplay />
                    }

                </div>
            </div>
        </ChatContext.Provider>

    )
}
export default Chat