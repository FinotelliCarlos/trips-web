import Button from '@/components/button'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: {
      trip: true
    }
  }>
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  return (
    <div className="w-[360px] flex flex-col p-5 mt-5 border border-solid border-primaryGrayLighter shadow-lg rounded-lg">
      <div className="flex items-center gap-3 pb-5 border-b border-primaryGrayLighter border-solid">
        <div className="relative h-[106px] w-[124px]">
          <Image
            fill
            className='rounded-lg'
            loading='lazy'
            src={reservation.trip.coverImage}
            alt={reservation.trip.name}
            style={{
              objectFit: 'cover'
            }}
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl text-primaryDarker font-semibold ">
            {reservation.trip.name}
          </h2>
          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={reservation.trip.countryCode} svg />
            <p className="text-xs font-normal text-primaryGray underline">{reservation.trip.location}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="text-sm font-semibold mb-3">Sobre a viagem</h3>
        <h3 className="text-sm">Data</h3>
        <div className="flex items-center gap-1">
          <p className="text-sm">{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p className="text-sm">{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="text-sm mt-5">Hóspedes</h3>
        <div className="flex items-center gap-1 mt-1">
          <p className="text-sm">{reservation.guests} hóspedes</p>
        </div>
      </div>

      <h3 className="font-semibold text-sm text-primaryDarker mt-3 pt-3 border-t border-primaryGrayLighter border-solid">Informações sobre o preço:</h3>
      <div className="flex justify-between mb-5">
        <p className="text-primaryDarker text-sm mt-1">Total:</p>
        <p className="text-sm">R$ {reservation.totalPaid.toString()}</p>
      </div>

      <Button variant='danger'>Cancelar</Button>
    </div>
  )
}

export default UserReservationItem