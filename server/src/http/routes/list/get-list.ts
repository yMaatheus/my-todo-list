import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

export async function getList(app: FastifyInstance) {
  app.get('/list/:listId', async (request, reply) => {
    const requestParams = z.object({
      listId: z.string().uuid(),
    })

    const { listId } = requestParams.parse(request.params)

    const listWithTasks = await prisma.list.findUnique({
      where: {
        id: listId,
      },
      include: {
        tasks: true,
      },
    })

    return reply.status(StatusCodes.OK).send({ ...listWithTasks })
  })
}
