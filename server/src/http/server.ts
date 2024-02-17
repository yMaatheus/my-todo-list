import Fastify from 'fastify'
import { createList } from './routes/list/create-list'

const app = Fastify()

app.register(createList)

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`server listening on ${address}`)
})
