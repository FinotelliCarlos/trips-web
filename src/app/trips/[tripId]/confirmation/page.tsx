'use client'

import Button from '@/components/button'
import { Trip } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { toast } from 'react-toastify'

interface TripParams {
  params: {
    tripId: string
  }
}

const TripConfirmation = ({ params: { tripId } }: TripParams) => {
  const [trip, setTrip] = useState<Trip | null>({} as Trip)
  const [currentTotalPrice, setCurrentTotalPrice] = useState<number | null>(0)

  const searchParams = useSearchParams()
  const { status, data } = useSession()
  const router = useRouter()

  const startDate = new Date(searchParams.get('startDate') as string)
  const endDate = new Date(searchParams.get('endDate') as string)
  const guests = searchParams.get('guests')

  const handleBuyClick = async () => {
    const response = await fetch('http://localhost:3000/api/trips/reservation', {
      method: 'POST',
      body: Buffer.from(JSON.stringify({
        userId: (data?.user as any)?.id,
        tripId,
        startDate,
        endDate,
        guests: Number(guests),
        totalPaid: currentTotalPrice
      }))
    })

    if (!response.ok) {
      toast.error('Houve algum problema ao criar sua reserva!', { position: 'bottom-center' })
    }

    router.push('/')

    toast.success('Reserva criada com sucesso!', { position: 'bottom-center' })
  }

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch('http://localhost:3000/api/trips/check', {
        method: 'POST',
        body:
          Buffer.from(JSON.stringify({
            startDate: searchParams.get('startDate'),
            endDate: searchParams.get('endDate'),
            tripId
          }))
      })

      const res = await response.json()

      if (res?.error) {
        return router.push('/')
      }

      const { trip, totalPrice } = res

      setTrip(trip)
      setCurrentTotalPrice(totalPrice)
    }

    if (status === 'unauthenticated') {
      return router.push('/')
    }

    fetchTrip()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, status, tripId])

  if (!trip) return null

  return (
    <div className='container mx-auto p-5 h-full'>
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

      <div className="flex flex-col p-5 mt-5 border border-solid border-primaryGrayLighter shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-primaryGrayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              fill
              className='rounded-lg'
              loading='lazy'
              src={trip.coverImage}
              alt={trip.name}
              style={{
                objectFit: 'cover'
              }}
            />
          </div>

          <div className="flex flex-col">


            <h2 className="text-xl text-primaryDarker font-semibold ">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs font-normal text-primaryGray underline">{trip.location}</p>
            </div>

          </div>
        </div>

        <h3 className="font-semibold text-lg text-primaryDarker mt-3">Informações sobre o preço:</h3>
        <div className="flex justify-between">
          <p className="text-primaryDarker">Total:</p>
          <p className="">R$ {currentTotalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="font-semibold">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p className="">{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p className="">{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <div className="flex items-center gap-1 mt-1">
          <p className="">{guests} hóspedes</p>
        </div>

        <Button className='mt-5' onClick={handleBuyClick}>Finalizar compra</Button>
      </div>
    </div>
  )
}

export default TripConfirmation