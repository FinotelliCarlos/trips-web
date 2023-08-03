'use client'

import { TripReservation } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const MyTrips = () => {
  const [reservations, setReservations] = useState<TripReservation[]>([])

  const { status, data } = useSession()
  const userId = (data?.user as any)?.id
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated" || !userId) {
      return router.push('/')
    }

    const fetchReservations = async () => {
      const response = await fetch(`http://localhost:3000/api/user/${userId}/reservations`, {
        method: 'GET'
      })

      const reservationsResponse = await response.json()

      setReservations(reservationsResponse)
    }

    fetchReservations()
  }, [router, status, userId])

  console.log({ reservations })

  return (
    <div>MyTrips</div>
  )
}

export default MyTrips