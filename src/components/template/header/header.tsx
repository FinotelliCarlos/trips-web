"use client"

import LogoTrips from "@/components/logo-trips"
import { useSession } from "next-auth/react"
import AuthenticatedHeaderButton from "./components/authenticated"
import LoginButton from "./components/login"
import Link from "next/link"

const Header = () => {
  const { status } = useSession()

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex w-full justify-between items-center">
      <Link href='/'>
        <LogoTrips />
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