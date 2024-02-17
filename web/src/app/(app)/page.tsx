export default async function Home() {
  const result = await fetch('http://localhost:3000/list')

  const data = await result.json()

  console.log(data)

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
