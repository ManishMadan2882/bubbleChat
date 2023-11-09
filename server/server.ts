import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import mongoConnect from './database/connectDb';
import cors from 'cors'
import authRouter from './routes/authRouter'
import searchRouter from './routes/search'
import messageRouter from './routes/messageRouter'
dotenv.config();
mongoConnect.then()
const app: Express = express();
const port = process.env.PORT || 3333;
app.use(cors<Request>(
  {
    origin:"http://localhost:3000"
  }
))
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/search',searchRouter);
//app.use('/api/conversation',conversationRouter);
app.use('/api/message',messageRouter)

const server = app.listen(port , ()=>{
  console.log(`Server is live at port: ${port}`);
}) 
export default server