'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import img from "../../../assets/images/login-image.png";
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useDispatch } from 'react-redux'
type Props = {}

const LoginPage = () => {
   const {toast} = useToast();
   const router = useRouter();
   const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:any) => {
      e.preventDefault();
      
    try {
      if(!email || !password){
        toast({
          variant:"destructive",
          description:"Please provide all information"
        })
       }
  
       await axios.post("/user/admin-login",{
        email, password
       },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials: true
       }).then((res) => {
           toast({
            title: "Success",
            description: res.data.message
           })
          dispatch({
            type:"LOAD_USER",
            payload: {
              user: res.data.user,
              token: res.data.token
            }
          })
         router.replace("/")
       }).catch((error) => {
        toast({
          variant:"destructive",
          title: "Error",
          description: error.response.data.message
         })
       })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=' w-full h-full flex justify-center items-center bg-gray-100'>
         <div className=' rounded-[25px] shadow-md border-1 bg-white border-[#e8e8e8] 1000px:w-[60%] 800px:w-[75%] w-[90%] h-auto p-10 flex 800px:flex-row flex-col-reverse'>
              <div className=' 800px:w-[50%] w-full rounded-[25px] 800px:pr-4 '>
              <form onSubmit={handleSubmit}>
                  <div className='mb-6'>
                  <h1 className=' text-[27px] font-bold text-[#000]'>Welcome Back</h1>
                  <h1 className=' pl-2 text-[15px] text-[#656565]'>Sign in to ELearner</h1>
                </div>
                  <div className=' mb-6'>
                    <p className=' my-2 pl-1 font-medium'>Email</p>
                   <Input placeholder='Enter your email' 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   type="email" className=' bg-gray-100' />
                  </div>
                  <div className=' mb-5'>
                    <p className=' my-2 pl-1 font-medium'>Password</p>
                   <Input placeholder='Enter your password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   type="password" className=' bg-gray-100' />
                  </div>
                  <div className=' flex items-center justify-between mb-3'>
                  <span className=' flex items-center space-x-2'>
                  <Checkbox />
                  <p className=' text-[15px] my-2 pl-1'>remember my password</p>
                  </span>
                     <Link className=' text-[15px] my-2 text-gray-400 font-semibold' href={"/forgot-password"}>Forgot password?</Link>
                  </div>
                 <div className=' mt-4'>
                 <Button type="submit" className=' w-full bg-[#8c3efa] hover:bg-[#9b57f9]'>Sign in</Button>
                 <p className=' text-center text-[14px] mt-6'>Dont have any account? <Link href={"/sign-up"} className=' font-semibold cursor-pointer'>Sign-up</Link></p>
                 </div>
              </form>
              </div>
              <div className=' 800px:w-[50%] w-full rounded-[25px] pl-5'>
                 <Image width={1000} height={1000} alt='login-image' className=' h-[400px] object-center w-full object-contain' src={img} />
              </div>
         </div>
    </div>
  )
}

export default LoginPage