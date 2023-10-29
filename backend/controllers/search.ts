import userModel from "../database/Models/userModel"
import { Request,Response } from 'express'
const searchUsers  = async (req:Request,res:Response) => {
    const queryString = req.query.username
    console.log(queryString)
    
    const allUsers = await userModel.find()
    console.log(allUsers)
    const response = allUsers.filter((element)=>{
        return element.username.toLowerCase().includes((queryString as string).toLowerCase())
    })
    console.log(response)
    res.status(200).json(response)
}
export {
    searchUsers
}