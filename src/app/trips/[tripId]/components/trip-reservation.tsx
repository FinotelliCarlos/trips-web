"use client"

import Button from "@/components/button"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"
import { differenceInDays } from "date-fns"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

interface TripReservationProps {
  tripId: string
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: number
  pricePerDay: number
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

const TripReservation = ({ tripId, tripStartDate, tripEndDate, maxGuests, pricePerDay }: TripReservationProps) => {
  const { register, handleSubmit, formState: { errors }, control, watch, setError } = useForm<TripReservationForm>()

  const router = useRouter()

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch('/api/trips/check', {
      method: 'POST',
      body:
        Buffer.from(JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId
        }))
    })

    const res = await response.json()

    if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
      setError('startDate', {
        type: 'manual',
        message: 'Esta data já está reservada.'
      })

      setError('endDate', {
        type: 'manual',
        message: 'Esta data já está reservada.'
      })

      return
    }

    if (res?.error?.code === 'INVALID_START_DATE') {
      setError('startDate', {
        type: 'manual',
        message: 'Data inválida.'
      })

      return
    }

    if (res?.error?.code === 'INVALID_END_DATE') {
      setError('endDate', {
        type: 'manual',
        message: 'Data inválida.'
      })

      return
    }

    router.push(`/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`)
  }

  const currentStartDate = watch('startDate')
  const currentEndDate = watch('endDate')

  const totalNights = currentStartDate! && currentEndDate! && differenceInDays(currentEndDate, currentStartDate)

  const currentTotalPrice = totalNights! * pricePerDay

  return (
    <div className="flex flex-col px-5 lg:min-w-[380px] lg:p-5 lg:border-primaryGrayLighter lg:border lg:rounded-lg lg:shadow-md">
      <p className="hidden text-xl text-primaryDarker mb-4 lg:block">
        <span className="font-semibold">R${pricePerDay}</span> por dia
      </p>

      <div className="flex gap-4">
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória!"
            }
          }}
          render={({ field }) =>
            <DatePicker
              placeholderText="Data de inicio"
              className="w-full"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              minDate={tripStartDate}
            />
          }
        />

        <Controller
          name="endDate"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória!"
            }
          }}
          render={({ field }) =>
            <DatePicker
              placeholderText="Data final"
              className="w-full"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              // maxDate={tripEndDate}
              minDate={currentStartDate ?? tripEndDate}
            />}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: 'Número de hóspedes é obrigatório!'
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes não pode ser maior que ${maxGuests}.`
          }
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors.guests}
        errorMessage={errors.guests?.message}
        type="number"
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">
          Total ({totalNights ?? 0} noites)
        </p>
        <p className="">
          {
            currentStartDate && currentEndDate && totalNights > 0 ?
              `R$ ${currentTotalPrice}` ?? 1
              : 'R$ 0'
          }
        </p>
      </div>

      <div className="pb-10 border-b border-primaryGrayLighter w-full lg:border-none lg:pb-0">
        <Button
          className="mt-3 w-full"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Reservar agora
        </Button>
      </div>
    </div>
  )
}

export default TripReservation