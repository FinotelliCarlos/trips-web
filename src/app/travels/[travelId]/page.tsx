import { prisma } from "@/lib/prisma"
import TravelDescription from "./components/travel-description"
import TravelDetailsHeader from "./components/travel-details-header"
import TravelHighlights from "./components/travel-highlights"
import TravelLocation from "./components/travel-location"
import TravelReservation from "./components/travel-reservation"

interface TravelDetailsParams {
  params: {
    travelId: string
  }
}

interface getTravelDetailsProps {
  travelId: string
}

const getTravelDetails = async ({ travelId }: getTravelDetailsProps) => {
  const travel = await prisma.travel.findUnique({
    where: {
      id: travelId
    },
  })

  return travel
}

const TravelDetails = async ({ params: { travelId } }: TravelDetailsParams) => {
  const travel = await getTravelDetails({
    travelId
  })

  if (!travel) return null

  return (
    <div className="container mx-auto lg:px-40 lg:pt-10">
      <TravelDetailsHeader travel={travel} />
      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TravelReservation travelId={travel.id} pricePerDay={travel.pricePerDay as any} maxGuests={travel.maxGuests} startDate={travel.startDate} endDate={travel.endDate} />
        </div>
        <div className="lg:order-1">
          <TravelDescription description={travel.description} />
          <TravelHighlights highlights={travel.highlights} />
        </div>
      </div>
      <TravelLocation location={travel.location} locationDescription={travel.locationDescription} />
    </div>
  )
}

export default TravelDetails