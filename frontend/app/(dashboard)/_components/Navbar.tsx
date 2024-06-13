import React from 'react'
import MobildeSidebar from './MobildeSidebar'
import NavbarRoutes from '@/components/navbar-routes'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className=' p-4 border-b h-full flex items-center bg-white shadow-sm'>
        <MobildeSidebar />
        <NavbarRoutes />
    </div>
  )
}

export default Navbar