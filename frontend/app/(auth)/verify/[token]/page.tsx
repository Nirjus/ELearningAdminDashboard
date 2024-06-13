'use client'
import axios from 'axios';
import { PartyPopper } from 'lucide-react';
import React, { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast';

type Props = {}

const USerActivationPage = ({params}: {params:{token: string}}) => {
   
   const {toast} = useToast();
 
    useEffect(() => {
        const userActivation = async () => {
          try {
             await axios.get(`/user/verify/${params.token}`).then((res) => {
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
         <h1 className=' text-2xl font-bold text-indigo-900'>Your Account is Activated</h1>

         <p className=' mt-20 text-gray-500 text-center text-sm'>
           you can&apos;t login right now because you not an Admin right now, 
         </p>
         <p className=' mt-2  text-gray-500 text-sm'>for login contact with another admin</p>
       </div>
    </div>
  )
}

export default USerActivationPage