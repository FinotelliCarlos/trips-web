import Image from "next/image"
import ReactCountryFlag from "react-country-flag"
import { prisma } from "@/lib/prisma"
import TripDetailsHeader from "./components/trip-details-header"

interface TripDetailsParams {
  params: {
    tripId: string
  }
}

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId
    }
  })

  return trip
}

const TripDetails = async ({ params }: TripDetailsParams) => {
  const trip = await getTripDetails(params.tripId)

  if (!trip) return null

  return (
    <div className="container mx-auto">
      <TripDetailsHeader trip={trip} />

    </div>
  )
}

export default TripDetails