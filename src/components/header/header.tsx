"use client"

import { useSession } from "next-auth/react"
import LogoTrips from "../logo-trips"
import AuthenticatedHeaderButton from "./components/authenticated"
import LoginButton from "./components/login"

const Header = () => {
  const { status } = useSession()

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <LogoTrips />

      {status === 'unauthenticated' &&
        <LoginButton />
      }

      {status === 'authenticated' &&
        <AuthenticatedHeaderButton />
      }
    </div>
  )
}

export default Header