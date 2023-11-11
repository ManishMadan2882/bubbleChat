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

const socket: Socket = io("http://localhost:8000/");


const Chat = () => {
    
    const [msg, setMsg] = useState<string>('')
    const [left,setLeft] = useState<number>(10)
    const [arr, setArr] = useState<string[]>([])
    const [currentUser,setCurrentUser] = useState<string>('')

    
    return (
        <div className="m-0">
            <Nav/>
            <div className="grid w-full h-[90vh] grid-cols-6 sm:grid-cols-3 gap-2">
                <Users setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                 
                {(currentUser.length>0)?
                    <ChatBox socket={socket}  currentUser={currentUser} />
                    :<DefaultDisplay/>
                }
              
            </div>
        </div>

    )
}
export default Chat