import Button from "@/components/button"
import Image from "next/image"

interface TripLocationProps {
  location: string
  locationDescription: string
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="p-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>
      <div className="relative h-[280px] w-full">
        <Image fill src='/map-mobile.png' alt={location} style={{ objectFit: 'cover' }} className="rounded-lg shadow-md" />
      </div>

      <h3 className="text-primaryDarker text-sm font-medium mt-3">{location}</h3>
      <p className="text-primaryDarker text-xs mt-2 leading-5">{locationDescription}</p>

      <Button variant="outlined" className="w-full mt-5">Ver no Google</Button>
    </div>
  )
}

export default TripLocation