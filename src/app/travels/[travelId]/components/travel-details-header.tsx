import { Travel } from "@prisma/client"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"

interface TravelDetailsHeaderProps {
  travel: Travel
}

const TravelDetailsHeader = ({ travel }: TravelDetailsHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full lg:hidden">
        <Image
          loading="lazy"
          src={travel?.coverImage}
          fill
          style={{ objectFit: "cover" }}
          alt={travel.name}
        />
      </div>

      <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2 lg:order-2">
        <div className="relative row-span-2">
          <Image
            loading="lazy"
            src={travel.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={travel.name}
            className="rounded-tl-lg rounded-bl-lg shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            loading="lazy"
            src={travel.imagesUrl[0]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={travel.name}
            className="shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            loading="lazy"
            src={travel.imagesUrl[1]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={travel.name}
            className="shadow-md  rounded-tr-lg"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            loading="lazy"
            src={travel.imagesUrl[2]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={travel.name}
            className="shadow-md"
          />
        </div>

        <div className="relative h-[200px] w-full">
          <Image
            loading="lazy"
            src={travel.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={travel.name}
            className="shadow-md  rounded-br-lg"
          />
        </div>
      </div>

      <div className="flex flex-col p-5 lg:order-1 lg:p-0 lg:mb-7">
        <h1 className="font-semibold text-xl text-primaryDarker lg:text-3xl">
          {travel.name}
        </h1>

        <div className="flex items-center gap-1 my-1">
          <ReactCountryFlag countryCode={travel.countryCode} svg />
          <p className="text-xs text-grayPrimary underline lg:text-base">
            {travel.location}
          </p>
        </div>

        <p className="text-xs text-grayPrimary">
          <span className="text-primary font-medium">
            R${travel.pricePerDay.toString()}
          </span>{" "}
          por dia
        </p>
      </div>
    </div>
  )
}

export default TravelDetailsHeader