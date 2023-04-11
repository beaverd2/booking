import { useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import { SearchFilters } from 'widgets/hotel-search/ui/search-filters'
import { Button } from 'shared/ui/button'
import { DateRangePicker } from 'shared/ui/date-range-picker'
import { GuestsSelect } from 'shared/ui/guests-select'
import { CitySearch } from './ui/city-search'

type Props = {}

const defaultValues = {
  city: '',
  startDate: null,
  endDate: null,
  guests: { adults: 2, childrens: [] },
  filters: {
    hasWifi: false,
    hasAirConditioner: false,
    hasPool: false,
    hasParking: false,
    hasSpa: false,
    hasSauna: false,
    hasRestaraunt: false,
    hasCafe: false,
    hasFitness: false,
    hasTransfer: false,
    hasConferenceHall: false,
    skiSlopeClose: false,
    airportClose: false,
    beachClose: false,
    animalsAllowed: false,
    hasThreeMeals: false,
    hasTwoMeals: false,
    hasBreakfast: false,
    hasNoFood: false,
  },
}

export type SearchControl = Control<typeof defaultValues>

export const HotelSearch = (props: Props) => {
  const { handleSubmit, control, resetField } = useForm({
    defaultValues,
  })
  const [filtersCount, setFiltersCount] = useState(0)
  const onSubmit = (data: any) => {
    const filtersCount = Object.entries(data.filters).filter(([key, value]) => !!value).length
    setFiltersCount(filtersCount)
    console.log('data', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="search-form">
      <div className="flex flex-col gap-4">
        <div className="md:flex md:justify-end">
          <SearchFilters control={control} onReset={() => resetField('filters')} filtersCount={filtersCount} />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 flex-wrap gap-4 md:flex-nowrap">
            <CitySearch control={control} />
            <DateRangePicker control={control} />
            <GuestsSelect control={control} />
          </div>
          <Button type="submit" full>
            Найти
          </Button>
        </div>
      </div>
    </form>
  )
}