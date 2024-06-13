'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Layout = ({children}:{children:React.ReactNode}) => {
    const {user} = useSelector((state:any) => state.user);
    const router = useRouter();

    useEffect(() => {
       if(user != undefined){
          router.replace("/");
       }
    },[user, router])
  return (
    <div className=' w-full h-full'>
       {children}
    </div>
  )
}

export default Layout