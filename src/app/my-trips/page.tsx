'use client'

import { Prisma } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import UserReservationItem from "./components/user-reservation-item/user-reservation-item"

const MyTrips = () => {
  const [reservations, setReservations] = useState<Prisma.TripReservationGetPayload<{
    include: {
      trip: true
    }
  }>[]>([])

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

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">Minhas viagens</h1>
      <div className="flex items-center justify-center flex-wrap gap-4">
        {reservations.map(reservation => {
          return <UserReservationItem key={reservation.id} reservation={reservation} />
        })}
      </div>
    </div>
  )
}

export default MyTrips