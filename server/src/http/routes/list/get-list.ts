import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import z from 'zod'

export async function getList(app: FastifyInstance) {
  app.get('/list/:listId', async (request, reply) => {
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
      tasks: list.tasks,
    })
  })
}
