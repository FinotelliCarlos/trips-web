import { prisma } from "@/lib/prisma"
import TripDescription from "./components/trip-description"
import TripDetailsHeader from "./components/trip-details-header"
import TripHighlights from "./components/trip-highlights"
import TripLocation from "./components/trip-location"
import TripReservation from "./components/trip-reservation"

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

const TripDetails = async ({ params: { tripId } }: TripDetailsParams) => {
  const trip = await getTripDetails({
    tripId: tripId
  })

  if (!trip) return null

  return (
    <div className="container mx-auto lg:px-40 lg:pt-10">
      <TripDetailsHeader trip={trip} />
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation tripId={trip.id} pricePerDay={trip.pricePerDay as any} maxGuests={trip.maxGuests} tripStartDate={trip.startDate} tripEndDate={trip.endDate} />
        </div>
        <div className="lg:order-1">
          <TripDescription description={trip.description} />
          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>
      <TripLocation location={trip.location} locationDescription={trip.locationDescription} />
    </div>
  )
}

export default TripDetails