import React from 'react'

import logo from "../Images/AptosPayLogo.png"
import Image from 'next/image'

const Header = () => {
  return (
    <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center">
                    <Image src={logo} alt="AptosPay Logo" width={100} height={100} />
                </a>
        </div>
    </nav>
  )
}

export default Header