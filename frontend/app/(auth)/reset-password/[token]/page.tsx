'use client'
import axios from 'axios';
import { PartyPopper } from 'lucide-react';
import React, { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast';

type Props = {}

const ResetPassword = ({params}: {params:{token: string}}) => {
  const {toast} = useToast();
 
  useEffect(() => {
      const userActivation = async () => {
        try {
           await axios.get(`/user/reset-password/${params.token}`).then((res) => {
             toast({
              title:"Success",
              description: res.data.message
             })
           }).catch((error: any) => {
             console.log(error.response.data.message)
           })
        } catch (error) {
          console.log(error);
        }
      }
      userActivation()
  },[params, toast])
  return (
    <div className=' w-full h-screen pt-32 flex justify-center bg-gray-100'>
       <div className=" h-fit p-20 bg-white shadow-md rounded-2xl flex flex-col items-center justify-center ">
        <div className=' flex flex-row items-center space-x-3'>
          <PartyPopper size={35} color='green'/> 
          <p className=' text-4xl text-blue-500 font-bold'>Congratulation</p>
          <PartyPopper size={35} color='green' />
        </div>
         <h1 className=' text-2xl font-bold text-indigo-900'>Your Password reset successfully</h1>

       </div>
    </div>
  )
}

export default ResetPassword