import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function getLists(app: FastifyInstance) {
  app.get('/list', async (_request, reply) => {
    const list = await prisma.list.findMany({})

    return reply.send(list)
  })
}
