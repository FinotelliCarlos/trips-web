import LabelElement from "@/components/label-element"
import TripItem from "@/components/trip-item"
import { Trip } from "@prisma/client"

const RecommendedTrips = async () => {
  const trips: Trip[] = await fetch("http://localhost:3000/api/trips").then(res => res.json())

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