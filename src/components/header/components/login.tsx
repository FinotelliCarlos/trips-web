"use client"

import { signIn } from "next-auth/react"

const LoginButton = () => {
  const handleLogin = () => signIn()

  return (
    <button className="capitalize text-primary text-sm font-semibold" onClick={handleLogin}>login</button>
  )
}

export default LoginButton