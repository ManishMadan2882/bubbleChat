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
let users: UserList[];
const addUsers = (userId: string, socketId: string) => {
    if (!users.some((user) => user.userId === userId)) {
        users.push({
            userId,
            socketId
        })
    }
}
const removeUser = ((socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId)
})
const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
};
io.on('connection', (socket) => {
    console.log('A user is connected to the server');
    //user is added
    socket.on("addUser", (userId) => {
        addUsers(userId, socket.id)
        io.emit('getUsers', users)
    })
    //user disconnects
    socket.on('disconnect', () => {
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
      //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user:any = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });


}); 