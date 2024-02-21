import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

export async function createList(app: FastifyInstance) {
  app.post('/list', async (request, reply) => {
    const requestBody = z.object({
      name: z.string().min(1).max(32),
    })

    const { name } = requestBody.parse(request.body)

    const list = await prisma.list.create({ data: { name } })

    return reply.status(StatusCodes.CREATED).send({ ...list })
  })
}
