import { prisma } from "@/lib/prisma"
import TripDescription from "./components/trip-description"
import TripDetailsHeader from "./components/trip-details-header"
import TripHighlights from "./components/trip-highlights"
import TripLocation from "./components/trip-location"
import TripReservation from "./components/trip-reservation"

interface TripDetailsParams {
  params: {
    travelId: string
  }
}

interface getTripDetailsProps {
  travelId: string
}

const getTripDetails = async ({ travelId }: getTripDetailsProps) => {
  const travel = await prisma.travel.findUnique({
    where: {
      id: travelId
    },
  })

  return travel
}

const TripDetails = async ({ params: { travelId } }: TripDetailsParams) => {
  const travel = await getTripDetails({
    travelId
  })

  if (!travel) return null

  return (
    <div className="container mx-auto lg:px-40 lg:pt-10">
      <TripDetailsHeader travel={travel} />
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation travelId={travel.id} pricePerDay={travel.pricePerDay as any} maxGuests={travel.maxGuests} startDate={travel.startDate} endDate={travel.endDate} />
        </div>
        <div className="lg:order-1">
          <TripDescription description={travel.description} />
          <TripHighlights highlights={travel.highlights} />
        </div>
      </div>
      <TripLocation location={travel.location} locationDescription={travel.locationDescription} />
    </div>
  )
}

export default TripDetails