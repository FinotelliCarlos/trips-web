"use client"

import { signIn } from "next-auth/react"
import { AiOutlineLogin } from "react-icons/ai"

const LoginButton = () => {
  const handleLogin = () => signIn()

  return (
    <button
      className="relative flex items-center gap-3 py-3 px-4 border border-solid border-primaryGrayLighter p-13 rounded-full text-primary text-sm font-semibold"
      onClick={handleLogin}
    >
      <AiOutlineLogin size={16} />
      Entrar
    </button>
  )
}

export default LoginButton