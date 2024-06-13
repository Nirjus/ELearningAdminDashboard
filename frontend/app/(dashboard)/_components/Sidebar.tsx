import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className=' h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm '>
        <div className=" flex justify-center items-center h-[80px]">
            <Logo />
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
    </div>
  )
}

export default Sidebar