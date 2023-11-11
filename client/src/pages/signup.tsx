import React,{useState} from 'react'
import authenticate from './api/authenticate'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router';
import { TextField } from '@mui/material'
import Link from 'next/link';
import {Button} from '@mui/material'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [msg,setMsg] = useState<string>('');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const [cookie, setCookie] = useCookies(["session-token"])
    const router = useRouter();
    const notify = (msg:string)=>toast(msg);
    
    async function handleSignup(){
      if(!emailRegex.test(email)){
        toast.error('Invalid Email !')
        return;
      }
      const userData : any = await authenticate.signupAPI({email,password});
      console.log(userData.msg);
      userData.success ?
      toast.success(userData.msg)
      :
      toast.error(userData.msg);
      if(userData.success)
      {
          setCookie("session-token", userData.token, {
              path: "/",
              maxAge: 3600*24*30, // Expires after 30d
              sameSite: true,
            })

            router.replace('/')
            
      }
      console.log(userData.msg)
      
    }
  return (
    <div className='flex justify-center rounded drop-shadow-xl mt-[10%]'>
     
       <div className='border p-5 bg-white'>
       <h1 className='text-center text-2xl'>One step to go 🔥</h1>
       <div className='m-6'>
       <TextField id="outlined-basic" value={email} onChange={(e)=>setEmail(e.target.value)}  label="Email" variant="outlined"  />
       </div>
       <div className='m-6'>
       <TextField id="outlined-basic" value={password} type='password' onChange={(e)=>setPassword(e.target.value)} label="Password" variant="outlined" />
       </div>
       <span className='text-center block my-2'>
            Already a user ? <Link href='/login' className='text-violet-900 underline'>Log in</Link>
         </span>
       <div className='justify-center flex'>
       <Button className='w-full' variant="outlined" onClick={handleSignup}>Sign Up</Button>
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
       theme="dark"
       />
    </div>
  )
}

export default Register