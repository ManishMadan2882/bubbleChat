import { useCookies } from "react-cookie"
import userContext from "@/context/userContext";
import { useState,useEffect } from "react";
import authenticate from './api/authenticate'
import LandingPage from "./components/LandingPage";
import Chat from "./components/ChatLayout";
const Index: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['session-token'])
  const [user,setUser] = useState<User>({
    isAuthenticated : false,
    userId : undefined,
    imgUrl : undefined,
    username : undefined,
    email:undefined,
    token:undefined
})
  const token = cookies['session-token'];
  const [isTokenAvailable,setIsTokenAvailable] = useState<boolean>(true)
  useEffect(()=>{
    setIsTokenAvailable(token !== undefined)
    if(token){
      const userData = authenticate.getAuthenticatedUser(token).then((data)=>{
        console.log('data',data)
        if(data === null)
         setIsTokenAvailable(false)
        else
         setUser(data)
      })
      
    }
  },[])
 

 return (
 <userContext.Provider value={user}>
  <div>
    {
      isTokenAvailable ?
      <Chat/>
      :
      <LandingPage/>
    }
 </div>
 </userContext.Provider>
 )
}
export default Index