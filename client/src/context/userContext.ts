import { createContext } from "react"

declare global{
 interface User{
    userId : string | undefined,
    isAuthenticated : boolean,
    imgUrl : string | undefined,
    username : string | undefined,
    email:string | undefined,
    token:string | undefined
}}
const userContext = createContext<User | undefined>({
    isAuthenticated : false,
    userId : undefined,
    imgUrl : undefined,
    username : undefined,
    email:undefined,
    token:undefined
})

export default userContext