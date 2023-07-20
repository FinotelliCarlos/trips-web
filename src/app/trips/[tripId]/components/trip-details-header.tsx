import { Trip } from "@prisma/client"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"

interface TripDetailsHeaderProps {
  trip: Trip
}

const TripDetailsHeader = ({ trip }: TripDetailsHeaderProps) => {
  return (
    <div className="fle flex-col">
      <div className="relative h-[300px] w-full">
        <Image
          fill
          style={{
            objectFit: 'cover'
          }}
          src={trip.coverImage}
          alt={trip.name}
        />
      </div>

      <div className="fle flex-col p-5">
        <h1 className="font-semibold text-xl text-primaryDarker">{trip.name}</h1>

        <div className="flex items-center">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs font-normal text-primaryGray underline">{trip.location}</p>
        </div>

        <p className="text-xs text-primaryGray">
          <span className="text-primary font-semibold">R${trip.pricePerDay.toString()}</span> por dia
        </p>
      </div>
    </div>
  )
}

export default TripDetailsHeader