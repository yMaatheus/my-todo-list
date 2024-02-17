import Fastify from 'fastify'
import { createList } from './routes/list/create-list'
import { deleteList } from './routes/list/delete-list'
import { getList } from './routes/list/get-list'

const app = Fastify()

app.register(createList)
app.register(getList)
app.register(deleteList)

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`server listening on ${address}`)
})
