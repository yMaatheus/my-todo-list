import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

export async function createTask(app: FastifyInstance) {
  app.post('/task/:listId', async (request, reply) => {
    const requestParams = z.object({
      listId: z.string().uuid(),
    })

    const requestBody = z.object({
      name: z.string().min(3).max(64),
    })

    const { listId } = requestParams.parse(request.params)
    const { name } = requestBody.parse(request.body)

    const { completed, createdAt, updatedAt } = await prisma.task.create({
      data: {
        listId,
        name,
        completed: false,
      },
    })

    return reply.status(StatusCodes.CREATED).send({
      name,
      completed,
      createdAt,
      updatedAt,
    })
  })
}
