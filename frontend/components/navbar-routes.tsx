'use client'
import UserButton from '@/app/(dashboard)/_components/UserButton'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const NavbarRoutes = (props: Props) => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");
  return (
    <div className=' flex gap-x-2 ml-auto'>
        {
            isTeacherPage || isPlayerPage ? (
               <Link href={"/"}>
                <Button size={"sm"} className=' gap-2' variant={"outline"}>
                    <LogOut size={20} /> Exit
                </Button></Link>

            ):(
                <Link href={"/teacher/courses"}>
                <Button size={"sm"} variant={"outline"}>
                    Teacher mode
                    </Button></Link>
            )
        }
        <UserButton />
    </div>
  )
}

export default NavbarRoutes