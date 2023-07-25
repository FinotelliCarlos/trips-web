"use client"

import Button from "@/components/button"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"
import { Controller, useForm } from "react-hook-form"

interface TripReservationProps {
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: number
}

interface TripReservationForm {
  guests: number
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({ tripStartDate, tripEndDate, maxGuests }: TripReservationProps) => {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm<TripReservationForm>()

  const onSubmit = () => { }

  const currentStartDate = watch('startDate')

  return (
    <div className="flex flex-col px-5">
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
              maxDate={tripEndDate}
              minDate={currentStartDate ?? tripEndDate}
            />}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: 'Número de hóspedes é obrigatório!'
          }
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total ({0} noites)</p>
        <p className="">R$ {4.234}</p>
      </div>

      <div className="pb-10 border-b border-primaryGrayLighter w-full">
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