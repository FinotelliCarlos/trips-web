import { prisma } from "@/lib/prisma"
import { differenceInDays, isBefore } from "date-fns"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const req = await request.json()

  const travel = await prisma.travel.findUnique({
    where: {
      id: req.travelId
    }
  })

  if (!travel) {
    return new NextResponse(JSON.stringify({
      error: {
        code: 'TRAVEL_NOT_FOUND'
      }
    }))
  }

  if (isBefore(new Date(req.startDate), new Date(req.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INVALID_START_DATE'
        }
      }),
      { status: 400 }
    )
  }

  if (isBefore(new Date(req.endDate), new Date(req.endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INVALID_END_DATE'
        }
      }),
      { status: 400 }
    )
  }

  const reservations = await prisma.travelReservation.findMany({
    where: {
      travelId: req.travelId,
      startDate: {
        lte: new Date(req.endDate)
      },
      endDate: {
        gte: new Date(req.startDate)
      }
    }
  })

  if (reservations.length > 0) {
    return new NextResponse(JSON.stringify({
      error: {
        code: 'TRAVEL_ALREADY_RESERVED'
      }
    }))
  }

  const totalPrice = differenceInDays(new Date(req.endDate), new Date(req.startDate)) * Number(travel.pricePerDay)

  return new NextResponse(JSON.stringify({
    success: true,
    travel,
    totalPrice
  }))
}