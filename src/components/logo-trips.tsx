import Image from "next/image"

const LogoTrips = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image width={26} height={26} src='/trips.svg' alt="trips" />
      <p className="text-primary font-normal text-2xl">
        trips
      </p>
    </div>
  )
}
export default LogoTrips