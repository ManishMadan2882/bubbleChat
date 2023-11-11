import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
import { useRouter } from 'next/router';
import authenticate from './api/authenticate'
import { useCookies } from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
const Login = () => {
    const [email,setEmail] = useState<string>('');
    const [cookie, setCookie] = useCookies(["session-token"])
    const [password,setPassword] = useState<string>('');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const [msg,setMsg] = useState<string>('');
    const notify = (msg:string)=>toast(msg);
    const router = useRouter()
    async function handleLogin(){
      if(!emailRegex.test(email)){
        toast.error('Invalid Email !')
        return;
      }
      const userData : any = await authenticate.loginAPI({email,password});
      console.log(userData);
      userData.success ?
      toast.success(userData.msg)
      :
      toast.error(userData.msg);
      if(userData.success)
      {
          notify(userData.msg)
          setCookie("session-token", userData.token, {
              path: "/",
              maxAge: 3600*24*30, // Expires after 30d
              sameSite: true,
            })
            router.replace('/')
            
      }
    }

  return (
    <div className='flex justify-center bg-gradient drop-shadow-xl mt-[10%]'>
       
       <div className='border rounded-md p-5 bg-white '>
        <h1 className='text-center text-xl text-violet-400 border-b-2 border-violet-400'>bubble</h1>
       <h1 className='text-md text-center'>🔑</h1>
       <div className='m-6'>
       <TextField id="outlined-basic" color='secondary' value={email} onChange={(e:ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} label="Email" variant="outlined"  />
       </div>
       <div className='m-6'>
       <TextField type='password' id="outlined-basic" color='secondary' value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} label="Password" variant="outlined" />
       </div>
       <div>
         <span className='text-center block my-2'>
            New User ? <Link href='/signup' className='text-violet-900 underline'>Create Account</Link>
         </span>
       </div>
       <div className='justify-center flex'>
       <Button color='secondary' onClick={handleLogin} variant="outlined" className=' w-full text-violet-500'>Log in ❤️</Button>
       </div>
       
       </div>
       <ToastContainer 
       className={'fixed z-10 '}
       position="top-right"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="colored"
       />
    </div>
  )
}

export default Login