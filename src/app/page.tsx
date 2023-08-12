import QuickSearch from "./components/quick-search";
import RecommendedTravels from "./components/recommended-travels";
import TravelSearch from "./components/travel-search";

export default function Home() {
  return (
    <div className="gap-1">
      <TravelSearch />
      <QuickSearch />
      <RecommendedTravels />
    </div>
  )
}
