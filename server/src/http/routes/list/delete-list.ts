import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

export async function deleteList(app: FastifyInstance) {
  app.delete('/list/:listId', async (request, reply) => {
    const requestParams = z.object({
      listId: z.string().uuid(),
    })

    const { listId } = requestParams.parse(request.params)

    await prisma.list.delete({ where: { id: listId } })

    return reply.status(StatusCodes.OK).send()
  })
}
