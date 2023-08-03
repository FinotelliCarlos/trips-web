"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AiOutlineMenu } from 'react-icons/ai'

const AuthenticatedHeaderButton = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const { data } = useSession()
  const handleSignOut = () => signOut()

  const currentUser = data?.user

  const handleOpenMenu = () => setMenuIsOpen(prevState => !prevState)

  return (
    <div className="relative flex items-center gap-3 py-1 px-4 border border-solid border-primaryGrayLighter p-13 rounded-full">
      <AiOutlineMenu size={16} onClick={handleOpenMenu} className="cursor-pointer" />

      <Image
        className="rounded-full shadow-md"
        width={35}
        height={35}
        loading="eager"
        src={currentUser?.image!}
        alt={currentUser?.name!}
      />

      {menuIsOpen && (
        <div
          className="absolute z-50 text-sm top-12 left-[-3rem] w-[140px] h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-start p-2"
        >
          <Link href='/my-trips'>
            <button className="text-primary text-sm font-semibold mb-2 border-solid border-b border-primaryGray pb-2">Minhas viagens</button>
          </Link>

          <button className="text-primary text-sm font-semibold" onClick={handleSignOut}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default AuthenticatedHeaderButton