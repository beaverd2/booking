import React, { useState } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { isSaturday, nextSaturday, nextSunday } from 'date-fns'
import { Button } from 'shared/ui/button'
import { DateRangePicker, Dates, NullableDate } from 'shared/ui/date-range-picker'
import { Guests, GuestsSelect } from 'shared/ui/guests-select'
import { CitySearch } from './ui/city-search'
import { Tag } from './ui/tag'

type Props = {}

export const Search = (props: Props) => {
  const [startDate, setStartDate] = useState<NullableDate>(null)
  const [endDate, setEndDate] = useState<NullableDate>(null)
  const [guests, setGuests] = useState<{ adults: number; childrens: number[] }>({
    adults: 2,
    childrens: [],
  })
  const [city, setCity] = useState('')
  const onChange = (dates: Dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const setHolidays = () => {
    const today = new Date()
    const saturday = isSaturday(today) ? today : nextSaturday(today)
    const sunday = nextSunday(today)
    setStartDate(saturday)
    setEndDate(sunday)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="md:flex md:justify-end">
        <Button variant="secondary" full>
          <AdjustmentsHorizontalIcon className="mr-2 h-5 w-5" />
          Фильтры
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 flex-wrap gap-4 md:flex-nowrap">
          <div className="flex basis-full flex-col gap-2 md:basis-2/3">
            <CitySearch city={city} onChange={(city: string) => setCity(city)} />
            <div className="hidden gap-2 md:flex">
              <Tag onClick={() => setCity('Москва')}>Москва</Tag>
              <Tag onClick={() => setCity('Санкт‑Петербург')}>Санкт‑Петербург</Tag>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <DateRangePicker startDate={startDate} endDate={endDate} onChange={onChange} />
            <div className="hidden gap-2 md:flex">
              <Tag onClick={() => setHolidays()}>Ближайшие выходные</Tag>
            </div>
          </div>
          <div className="flex-1">
            <GuestsSelect guests={guests} onChange={(guests: Guests) => setGuests(guests)} />
          </div>
        </div>
        <Button full>Найти</Button>
      </div>
    </div>
  )
}
