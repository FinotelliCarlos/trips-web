"use client";

import TripItem from "@/components/trip-item";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}`
      );

      const data = await response.json();

      setTrips(data);
    };

    fetchTrips();
  }, [searchParams]);

  return (
    <>
      <div className="container mx-auto flex flex-col items-center p-5">
        <h1 className="text-primaryDarker font-semibold text-xl">Os melhores locais encontrados para sua viagem</h1>
        <h2 className="text-primaryGray font-medium mb-5">
          {trips.length > 0 ? "Listamos as melhores viagens para você!" : "Não encontramos nenhuma viagem."}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {trips?.map((trip) => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Trips;