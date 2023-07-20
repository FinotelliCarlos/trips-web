"use client"

import Button from "@/components/button"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"
import { Trip } from "@prisma/client"

interface TripReservationProps {
  trip: Trip
}

const TripReservation = ({ trip }: TripReservationProps) => {

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <DatePicker placeholderText="Data de inicio" onChange={() => { }} className="w-full" />
        <DatePicker placeholderText="Data final" onChange={() => { }} className="w-full" />
      </div>

      <Input placeholder={`Número de hóspedes (max: ${trip.maxGuests})`} className="mt-4" />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total ({0} noites)</p>
        <p className="">R$ {4.234}</p>
      </div>

      <div className="pb-10 border-b border-primaryGrayLighter w-full">
        <Button className="mt-3 w-full">
          Reservar agora
        </Button>
      </div>
    </div>
  )
}

export default TripReservation