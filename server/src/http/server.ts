import Fastify from 'fastify'
import { createList } from './routes/list/create-list'
import { deleteList } from './routes/list/delete-list'
import { getList } from './routes/list/get-list'
import { createTask } from './routes/tasks/create-task'
import { deleteTask } from './routes/tasks/delete-task'
import { updateTask } from './routes/tasks/update-task'

const app = Fastify()

app.register(createList)
app.register(getList)
app.register(deleteList)

app.register(createTask)
app.register(updateTask)
app.register(deleteTask)

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`server listening on ${address}`)
})
