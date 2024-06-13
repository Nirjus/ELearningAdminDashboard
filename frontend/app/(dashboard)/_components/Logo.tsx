import Image from 'next/image'
import React from 'react'
import logo from "../../../assets/images/adaptive-icon.png";

type Props = {}

const Logo = (props: Props) => {
  return (
    <div className=' flex flex-row items-center justify-center gap-2'>
        <Image src={logo} alt="Logo" className=' w-12 h-full' />
      <p className=' text-2xl text-indigo-500 font-bold'> ELearner</p>
    </div>
  )
}

export default Logo