import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const req = await request.json()

  const { startDate, endDate, totalPaid, userId, travelId, guests } = req

  const travel = await prisma.travel.findUnique({
    where: {
      id: travelId
    }
  })

  if (!travel) {
    return new NextResponse(JSON.stringify({
      error: {
        code: 'TRAVEL_NOT_FOUND'
      }
    }))
  }

  await prisma.travelReservation.create({
    data: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
      travelId,
      totalPaid,
      guests
    }
  })


  return new NextResponse(JSON.stringify({
    success: true,
  }), { status: 201 })
}