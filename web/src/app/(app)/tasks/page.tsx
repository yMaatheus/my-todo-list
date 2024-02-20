import { ListCard } from '@/components/list-card'

type listResponseData = {
  id: string
  name: string
}

export default async function Home() {
  const result = await fetch('http://localhost:3333/list')

  const data = (await result.json()) as listResponseData[]

  console.log(data)

  return (
    <div className="flex flex-1 justify-center items-center h-screen">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="rounded-md p-16 border h-4/5 flex items-center flex-col space-y-6">
        <h1 className="text-2xl font-semibold">Listas</h1>
        {data?.map((list) => <ListCard key={list.id} list={list} />)}
      </div>
    </div>
  )
}
