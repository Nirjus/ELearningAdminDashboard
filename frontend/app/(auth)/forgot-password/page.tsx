'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import img from "../../../assets/images/sign-up.png";
import Link from 'next/link'
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type Props = {}

const ForgotPassword = (props: Props) => {
  const {toast} = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const handleSubmit = async (e:any) => {
      e.preventDefault();

  try {
    await axios.post("/user/forgot-password",{
      email,
      newPassword
     },{
      headers:{
        "Content-Type": "application/json"
      }
     }).then((res) => {
      toast({
        title: "Success",
        description: res.data.message
       })
        router.replace("/sign-in")
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
          <div className='mb-5'>
             <h1 className=' text-[28px] font-bold text-[#000]'>Forget password</h1>
             <h1 className=' text-[15px] text-[#656565]'>put your email and new password</h1>
           </div>
             <div className=' mb-6'>
               <p className=' my-2 pl-1 font-medium'>Email</p>
              <Input placeholder='Enter your email' type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              className=' bg-gray-100' />
             </div>
             <div className=' mb-5'>
               <p className=' my-2 pl-1 font-medium'>New Password</p>
              <Input placeholder='Enter your new password' type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              className=' bg-gray-100' />
             </div>
            
            <div className=' mt-10'>
            <Button type="submit" className=' w-full bg-[#8c3efa] hover:bg-[#9b57f9]'>Send </Button>
            <p className=' text-center text-[14px] mt-6'>back to login? <Link href={"/sign-in"} className=' font-semibold cursor-pointer'>Sign-in</Link></p>
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

export default ForgotPassword