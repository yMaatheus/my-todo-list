import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import z from 'zod'

export async function getListTasks(app: FastifyInstance) {
  app.get('/task/:listId', async (request, reply) => {
    const requestParams = z.object({
      listId: z.string().uuid(),
    })

    const { listId } = requestParams.parse(request.params)

    const list = await prisma.list.findUnique({ where: { id: listId } })

    if (!list) return reply.status(404).send('List does not exist.')

    const result = await prisma.task.findMany({
      where: {
        listId,
      },
      orderBy: {
        completed: 'asc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!result) return reply.status(404).send('Error to search tasks.')

    const tasks = result.map(({ id, ...rest }) => {
      return { taskId: id, ...rest }
    })

    return reply.send({
      name: list.name,
      tasks,
    })
  })
}
