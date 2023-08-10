import LabelElement from "@/components/label-element"
import TravelItem from "@/components/travel-item"
import { prisma } from "@/lib/prisma"
import { Travel } from "@prisma/client"

const getTravels = async () => {
  const travels = await prisma.travel.findMany({})

  return travels
}

const RecommendedTravels = async () => {
  const travels = await getTravels()

  if (!travels) return null

  return (
    <div className="container mx-auto p-5">
      <LabelElement text="Destinos recomendados" />

      <div className="flex flex-wrap items-center mt-5 gap-5 lg:mt-12 justify-center lg:gap-10">
        {travels.map((travel: Travel) => {
          return (
            <TravelItem key={travel.id} travel={travel} />
          )
        })}
      </div>
    </div>
  )
}

export default RecommendedTravels