'use client'

import Button from "@/components/button"
import { Prisma } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import UserReservationItem from "./components/user-reservation-item/user-reservation-item"

const MyTravels = () => {
  const [reservations, setReservations] = useState<Prisma.TravelReservationGetPayload<{
    include: {
      travel: true
    }
  }>[]>([])

  const { status, data } = useSession()
  const userId = (data?.user as any)?.id
  const router = useRouter()

  const fetchReservations = async () => {
    const response = await fetch(`/api/user/${userId}/reservations`, {
      method: 'GET'
    })

    const reservationsResponse = await response.json()

    setReservations(reservationsResponse)
  }

  useEffect(() => {
    if (status === "unauthenticated" || !userId) {
      return router.push('/')
    }

    fetchReservations()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, status, userId])

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5">Minhas viagens</h1>
      <div className="flex items-center justify-start flex-wrap gap-4">
        {reservations.length !== 0 ?
          <>
            {reservations.map(reservation => {
              return <UserReservationItem key={reservation.id} reservation={reservation} fetchReservations={fetchReservations} />
            })}
          </> :
          <div className="flex flex-col gap-5 items-start lg:max-w-[420px]">
            <p className="font-medium text-primaryDarker text-xl">Você ainda não tem nenhuma reserva.</p>
            <Button variant="outlined" onClick={() => router.push('/')}>Volte e busque sua reserva!</Button>
          </div>}
      </div>
    </div >
  )
}

export default MyTravels