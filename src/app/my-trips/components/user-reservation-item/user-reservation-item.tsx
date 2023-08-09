'use client'

import Button from '@/components/button'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { toast } from 'react-toastify'

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: {
      trip: true
    }
  }>
  fetchReservations: () => void
}

const UserReservationItem = ({ reservation, fetchReservations }: UserReservationItemProps) => {

  const { trip: { countryCode, coverImage, name, location }, startDate, endDate, guests, totalPaid, id } = reservation

  const handleDeleteReservation = async () => {
    const response = await fetch(`/api/trips/reservation/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      return toast.error('Houve algum problema em cancelar sua viagem!', { position: 'bottom-center' })
    }

    toast.success('Viagem cancelada com sucesso!', { position: 'bottom-center' })

    fetchReservations()
  }

  return (
    <div className="w-[360px] flex flex-col p-5 mt-5 border border-solid border-primaryGrayLighter shadow-lg rounded-lg">
      <div className="flex items-center gap-3 pb-5 border-b border-primaryGrayLighter border-solid">
        <div className="relative h-[106px] w-[124px]">
          <Image
            fill
            className='rounded-lg'
            loading='lazy'
            src={coverImage}
            alt={name}
            style={{
              objectFit: 'cover'
            }}
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl text-primaryDarker font-semibold ">
            {name}
          </h2>
          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={countryCode} svg />
            <p className="text-xs font-normal text-primaryGray underline">{location}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="text-sm font-semibold mb-3">Sobre a viagem</h3>
        <h3 className="text-sm">Data</h3>
        <div className="flex items-center gap-1">
          <p className="text-sm">{format(new Date(startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p className="text-sm">{format(new Date(endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="text-sm mt-5">Hóspedes</h3>
        <div className="flex items-center gap-1 mt-1">
          <p className="text-sm">{guests} hóspedes</p>
        </div>
      </div>

      <h3 className="font-semibold text-sm text-primaryDarker mt-3 pt-3 border-t border-primaryGrayLighter border-solid">Informações sobre o preço:</h3>
      <div className="flex justify-between mb-5">
        <p className="text-primaryDarker text-sm mt-1">Total:</p>
        <p className="text-sm">R$ {totalPaid.toString()}</p>
      </div>

      <Button variant='danger' onClick={handleDeleteReservation}>Cancelar</Button>
    </div>
  )
}

export default UserReservationItem