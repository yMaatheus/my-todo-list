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
      description: z.string().max(256).optional(),
    })

    const { listId } = requestParams.parse(request.params)
    const { name, description } = requestBody.parse(request.body)

    const { completed, createdAt, updatedAt } = await prisma.task.create({
      data: {
        listId,
        name,
        description,
        completed: false,
      },
    })

    return reply.status(StatusCodes.CREATED).send({
      name,
      description,
      completed,
      createdAt,
      updatedAt,
    })
  })
}
