import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import z from 'zod'

export async function getListTasks(app: FastifyInstance) {
  app.get('/task/:listId', async (request, reply) => {
    const requestParams = z.object({
      listId: z.string().uuid(),
    })

    const { listId } = requestParams.parse(request.params)

    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
      include: {
        tasks: true,
      },
    })

    if (!list) {
      return reply.status(404).send('List not found.')
    }

    return reply.send({
      name: list.name,
      tasks: list.tasks.map((task) => {
        return {
          taskId: task.id,
          name: task.name,
          description: task.description,
          completed: task.completed,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        }
      }),
    })
  })
}
