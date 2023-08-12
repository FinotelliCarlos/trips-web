import { SiCheckmarx } from "react-icons/si"

interface TravelHighlightsProps {
  highlights: string[]
}

const TravelHighlights = ({ highlights }: TravelHighlightsProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0 lg:mt-12">
      <h2 className="font-semibold text-primaryDarker mb-2 lg:text-xl">Destaques</h2>

      <div className="flex flex-wrap gap-y-3 lg:mt-5">
        {highlights.map(highlight => {
          return (
            <div key={highlight} className="flex items-center gap-2 lg:gap-3 w-1/2 text-primary">
              <SiCheckmarx />
              <p className="text-primaryGray text-xs lg:text-base">
                {highlight}
              </p>
            </div>
          )
        })}
      </div>
    </div >
  )
}


export default TravelHighlights