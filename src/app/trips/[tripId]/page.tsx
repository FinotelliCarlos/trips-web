import { prisma } from "@/lib/prisma"
import TripDetailsHeader from "./components/trip-details-header"
import TripReservation from "./components/trip-reservation"
import TripDescription from "./components/trip-description"

interface TripDetailsParams {
  params: {
    tripId: string
  }
}

interface getTripDetailsProps {
  tripId: string
}

const getTripDetails = async ({ tripId }: getTripDetailsProps) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId
    },
  })

  return trip
}

const TripDetails = async ({ params }: TripDetailsParams) => {
  const trip = await getTripDetails({
    tripId: params.tripId
  })

  if (!trip) return null

  return (
    <div className="container mx-auto">
      <TripDetailsHeader trip={trip} />
      <TripReservation trip={trip} />
      <TripDescription description={trip.description} />
    </div>
  )
}

export default TripDetails