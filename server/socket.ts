import server from "./server";
import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})
type UserList = {
    socketId: string
    userId: string
} 
var users: UserList[]=[];
const addUsers = (userId: string, socketId: string) => {
    if (!users?.some((user) => user.userId === userId)) {
        users.push({
            userId,
            socketId
        })
    }
}
const removeUser = ((socketId: string) => {
    users = users?.filter((user) => user.socketId !== socketId)
})
const getUser = (userId: string) => {
    console.log('users',users);
    
    const userSocket = users.find((element) => (element.userId && element.userId === userId));

    return userSocket;
};
io.on('connection', (socket) => {
    //console.log('A user is connected to the server');
    //user is added
    socket.on("addUser", (userId) => {
        addUsers(userId, socket.id)
        //console.log('users',users);
        
        io.emit('getUsers', users)
    })
    //user disconnects
    socket.on('disconnect', () => {
        //console.log('a user disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
      //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text,createdAt }) => {
    const user:any = getUser(receiverId);
    console.log(user?.socketId,{senderId,receiverId,text})
    io.to(user?.socketId).emit("getMessage", {
      sender:senderId,
      text,
      createdAt
    });
  });
  


}); 