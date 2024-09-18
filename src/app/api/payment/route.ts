import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { authOptions } from '../auth/[...nextauth]/route'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15'
})

export async function POST(request: Request) {
  const userSession = await getServerSession(authOptions)
  const req = await request.json()

  const { travelId, totalPrice, name, description, coverImage, startDate, endDate, guests } = req

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.HOST_URL as string}/my-travels`,
    cancel_url: process.env.HOST_URL as string,
    metadata: {
      userId: (userSession?.user as any)?.id,
      startDate,
      endDate,
      totalPrice,
      travelId,
      guests,
    },
    line_items: [
      {
        price_data: {
          currency: "brl",
          unit_amount: totalPrice * 100,
          product_data: {
            name,
            description,
            images: [coverImage],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 })
}