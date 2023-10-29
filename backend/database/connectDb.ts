import mongoose from 'mongoose'
import { config } from 'dotenv';
import { env } from 'process';
config()
// mongoose.connect("mongodb://127.0.0.1:27017/
console.log('Attempting to connect with the db...')
const mongoConnect = mongoose.connect(env.MONGOURI as string)
.then(()=>{
    console.log("Connected to Database");
})
.catch((err)=> console.log('Failure connecting to the Database '+err)
)

export default mongoConnect