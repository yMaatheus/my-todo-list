import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import z from 'zod'

export async function updateList(app: FastifyInstance) {
  app.put('/list/:id', async (request, reply) => {
    const requestParams = z.object({
      id: z.string().uuid(),
    })

    const requestBody = z.object({
      name: z.string().min(1).max(32),
    })

    const { id } = requestParams.parse(request.params)

    const { name } = requestBody.parse(request.body)

    const list = await prisma.list.update({ where: { id }, data: { name } })

    return reply.send({ ...list })
  })
}
