"use client"

import CurrencyInput from "@/components/currency-input"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import Button from "../../components/button"

interface TravelSearchForm {
  text: string
  startDate: Date | null
  budget: string
}

const TravelSearch = () => {
  const { control, formState: { errors }, register, handleSubmit } = useForm<TravelSearchForm>()
  const router = useRouter()

  const onSubmitClick = (data: TravelSearchForm) => {
    router.push(`/travels/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`)
  }

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28">
      <h1 className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">
        Encontre seu próximo <span className="text-primary">local de descanso!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-lg lg:mt-12">
        <Input {...register('text', {
          required: {
            value: true,
            message: 'Este campo é obrigátorio.'
          }
        })}
          error={!!errors.text}
          errorMessage={errors.text?.message}
          placeholder="Para aonde vamos?" />

        <div className="flex gap-4 lg:w-full">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) =>
              <DatePicker
                placeholderText="Data da viagem"
                className="w-full"
                onChange={field.onChange}
                selected={field.value}
                minDate={new Date()}
              />}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) =>
              <CurrencyInput
                allowDecimals={false}
                onValueChange={(value => field.onChange(value))}
                value={field.value}
                onBlur={field.onBlur}
                placeholder="Valor"
                className="w-full"
              />
            }
          />
        </div>

        <Button onClick={() => handleSubmit(onSubmitClick)()} className="lg:w-1/2 lg:h-[2.4rem]">Procurar</Button>
      </div>
    </div>
  )
}

export default TravelSearch