"use client"

import LogoTravels from "@/components/logo-travels"
import { useSession } from "next-auth/react"
import Link from "next/link"
import AuthenticatedHeaderButton from "./components/authenticated"
import LoginButton from "./components/login"

const Header = () => {
  const { status } = useSession()

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex w-full justify-between items-center lg:border-b lg:border-primaryGrayLighter">
      <Link href='/'>
        <LogoTravels />
      </Link>


      {status !== 'authenticated' &&
        <LoginButton />
      }

      {status === 'authenticated' &&
        <AuthenticatedHeaderButton />
      }
    </div>
  )
}

export default Header