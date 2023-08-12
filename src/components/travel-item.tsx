import { Travel } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"

interface TravelItemProps {
  travel: Travel
}

const TravelItem = ({ travel }: TravelItemProps) => {
  return (
    <Link href={`/travels/${travel.id}`}>
      <div className="flex flex-col">
        <div className="relative h-[220px] w-[300px]">
          <Image
            src={travel.coverImage}
            alt={travel.name}
            className="rounded-lg"
            loading="lazy"
            style={{
              objectFit: 'cover'
            }}
            fill
          />
        </div>

        <div className="flex items-center justify-between w-full mt-1">

          <h3>{travel.name}</h3>

          <p className="text-xs text-primaryGray">
            <span className="text-primary font-medium">R${travel.pricePerDay.toString()}</span> por dia
          </p>
        </div>



        <div className="flex items-center gap-1">
          <ReactCountryFlag countryCode={travel.countryCode} svg />
          <p className="text-xs font-normal text-primaryGray">{travel.location}</p>
        </div>

      </div>
    </Link>
  )
}

export default TravelItem