import Button from "@/components/button"
import Image from "next/image"

interface TravelLocationProps {
  location: string
  locationDescription: string
}

const TravelLocation = ({ location, locationDescription }: TravelLocationProps) => {
  return (
    <div className="p-5 lg:p-0 lg:mt-12 lg:pb-20">
      <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">Localização</h2>
      <div className="relative h-[280px] w-full lg:hidden">
        <Image fill src='/map-mobile.png' alt={location} style={{ objectFit: 'cover' }} className="rounded-lg shadow-md" />
      </div>

      <div className=" hidden relative h-[480px] w-full lg:block">
        <Image fill src='/map-desktop.png' alt={location} style={{ objectFit: 'cover' }} className="rounded-lg shadow-md" />
      </div>

      <h3 className="text-primaryDarker text-sm font-medium mt-3 lg:text-base lg:mt-5">{location}</h3>
      <p className="text-primaryDarker text-xs mt-2 leading-5 lg:text-sm lg:mt-4">{locationDescription}</p>

      <Button variant="outlined" className="w-full mt-5">Ver no Google</Button>
    </div>
  )
}

export default TravelLocation