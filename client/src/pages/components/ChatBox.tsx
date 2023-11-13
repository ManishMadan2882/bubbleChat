import MessageBubble from "./MessageBubble"
import Send from "@mui/icons-material/Send"
import { io } from "socket.io-client"
import moment from "moment"
import { sendMessage } from "../api/conversation"
import { useCookies } from "react-cookie"
import { useState, useEffect, ChangeEvent, useRef, useContext } from "react"
import { getConversationById } from "../api/conversation"
import userContext from "@/context/userContext"
//@ts-ignore
export const ChatBox = ({ socket,currentUser }) => {
  const [cookies] = useCookies(['session-token'])
  const token = cookies['session-token']
  const [chat, setChat] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const user = useContext(userContext)
  //const [socket, setSocket] = useState<any>(io('http://localhost:8000'));
  console.log(socket.id);
  
  const messagesRef = useRef<any>(null);
  socket.emit('addUser', (user?.userId))
  
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };
  
  useEffect(()=>{
    socket.on("getMessage", (data:any) => {
      console.log('data sock',data);
      if(chat){
        setChat([...chat,data])
      }
      else{
        setChat(data)
      }
    });
  })
  
  
  useEffect(() => {
    getConversationById(token, currentUser).then((data: any) => {
      setChat(data.messages)
    })
    window.scrollTo(0, document.body.scrollHeight);
    
  }, [currentUser])

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 400);

    return () => clearTimeout(timer);
  }, [chat]);


  const send = () => {

    socket.emit('sendMessage', {
      senderId: user?.userId, // Replace with the actual sender's ID
      receiverId: currentUser, // Replace with the actual recipient's ID
      text: message,
      createdAt: Date.now()
    });
    sendMessage(token, message, currentUser).then((result) => {
      if (result) {
        setMessage('')//empty text area after submission is success
        if (chat)
          setChat([...chat, {
            sender: user?.userId,
            receiverId: currentUser,
            text: message,
            createdAt: Date.now()
          }])
        else {
          setChat([{
            sender: user?.userId,
            receiverId: currentUser,
            text: message,
            createdAt: Date.now()
          }])
        }
      }
    })
  }
  
 
  return (
    <div  className="overflow-scroll  backdrop:blur-lg bg-white/10 col-span-5 text-white sm:col-span-2">
      <h1>
        {currentUser}
      </h1>

      <div ref={messagesRef} className="h-[74vh] overflow-scroll">
        {chat?.map((element: any, key: number) => {
          const date = moment(element.createdAt).format('LL')
          
          if (key > 0 && date === moment(chat[key - 1].createdAt).format('LL')) {

            return <MessageBubble key={key} sender={element.sender} time={element.createdAt} msg={element.text} />
          }
          return (
            <div key={key}>
              <h1 className="w-full my-5 block p-2 underline text-center">{date}</h1>
              <MessageBubble sender={element.sender} time={element.createdAt} msg={element.text} />
            </div>
          )
        })}
        
      </div>
      
      <div className=' bottom-2 flex justify-center'>
        <textarea
          onChange={(eve: ChangeEvent<HTMLTextAreaElement>) => setMessage(eve.target.value)}
          value={message}
          className='p-2 h-[13vh] resize-none ml-2 rounded-md bottom-1 w-full bg-black text-white border border-blue-300'
          placeholder='Type Here...'
        />
        <button onClick={send} className='hover:bg-gray-800 bg-black inline p-2 mx-2 rounded-md'><Send /></button>
      </div>
    </div>
  )
}
