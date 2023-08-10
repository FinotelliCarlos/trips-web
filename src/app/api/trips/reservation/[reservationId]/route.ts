import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(_request: Request, { params: { reservationId } }: { params: { reservationId: string } }) {
  if (!reservationId) {
    return {
      status: 400,
      body: {
        message: 'Missing reservationId!'
      }
    }
  }

  const reservations = await prisma.travelReservation.delete({
    where: { id: reservationId }, include: { travel: true }
  })

  return new NextResponse(JSON.stringify(reservations), { status: 200 })
}