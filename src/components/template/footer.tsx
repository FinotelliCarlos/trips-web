import LogoTrips from "../logo-trips"

const Footer = () => {
  return (
    <div className="bg-walterWhite p-5 flex flex-col justify-center items-center">
      <LogoTrips />
      <p className="text-sm font-medium mt-1 text-primaryDarker">Todos os direitos reservados.</p>
    </div>
  )
}

export default Footer