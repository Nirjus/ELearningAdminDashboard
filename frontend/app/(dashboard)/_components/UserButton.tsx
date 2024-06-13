import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const UserButton = (props: Props) => {
    const {user} = useSelector((state: any) => state.user);

  return (
    <div>
       {
        user ? (
            <Link href={"/profile"}>
            <div className=' w-10 h-10 rounded-full bg-[#ad3ff1] flex items-center justify-center'>
              <p className=' text-white font-medium'>{user?.name?.substring(0,1)}</p>
            </div>
         </Link>
        ):(
           <Link href={"/sign-in"}>
           <div className=' w-10 h-10 rounded-full bg-[#ad3ff1] flex items-center justify-center'>
              <User size={20} color='#fff' />
            </div>
           </Link>
         )
       }
    </div>
  )
}

export default UserButton