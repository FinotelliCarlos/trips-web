import LabelElement from "@/components/label-element"
import TripItem from "@/components/trip-item"
import { prisma } from "@/lib/prisma"
import { Trip } from "@prisma/client"

const getTrips = async () => {
  const trips = await prisma.trip.findMany({})

  return trips
}

const RecommendedTrips = async () => {
  const trips = await getTrips()

  if (!trips) return null

  return (
    <div className="container mx-auto p-5">
      <LabelElement text="Destinos recomendados" />

      <div className="flex flex-col items-center mt-5 gap-5">
        {trips.map((trip: Trip) => {
          return (
            <TripItem key={trip.id} trip={trip} />
          )
        })}
      </div>
    </div>
  )
}

export default RecommendedTrips