import Head from 'next/head'
import { useRouter } from 'next/router'
import { searchListMock } from 'pages/playground/mocks'
import { parseQuery } from 'shared/lib/utils'
import { HotelList } from 'widgets/hotel-list'
import { HotelSearch } from 'widgets/hotel-search'
import { SearchMap } from 'widgets/search-map'

export default function SearchPage() {
  const router = useRouter()
  const query = router.query
  const queryValues = parseQuery(query)
  const { city } = query
  return (
    <>
      <Head>
        <title>Booking search</title>
      </Head>
      <div className="mx-auto flex max-w-7xl flex-col py-5">
        <HotelSearch queryValues={queryValues} />
        {/* <SearchMap hotels={searchListMock} city={city as string | undefined} /> */}
        <div className="mt-5 h-[400px] w-full animate-pulse rounded-md bg-gray-200"></div>
        <HotelList
          items={searchListMock}
          nights={2}
          loading={false}
          fetchNextPage={console.log}
          fetchPreviousPage={console.log}
          hasNextPage={true}
          hasPreviousPage={false}
        />
      </div>
    </>
  )
}
