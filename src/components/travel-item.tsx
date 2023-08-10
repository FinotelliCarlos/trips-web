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
        <div className="relative h-[280px] w-[280px]">
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

        <h3>{travel.name}</h3>
        <div className="flex items-center gap-1">
          <ReactCountryFlag countryCode={travel.countryCode} svg />
          <p className="text-xs font-normal text-primaryGray">{travel.location}</p>
        </div>
        <p className="text-xs text-primaryGray">
          <span className="text-primary font-medium">R${travel.pricePerDay.toString()}</span> por dia
        </p>
      </div>
    </Link>
  )
}

export default TravelItem