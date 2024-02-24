import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import z from 'zod'

export async function updateTask(app: FastifyInstance) {
  app.put('/task/:taskId', async (request, reply) => {
    const requestParams = z.object({
      taskId: z.string().uuid(),
    })

    const requestBody = z.object({
      name: z.string().min(3).max(42).optional(),
      description: z.string().max(1000).optional(),
      hasCompleted: z.boolean().optional(),
    })

    const { taskId } = requestParams.parse(request.params)
    const { name, description, hasCompleted } = requestBody.parse(request.body)

    const { createdAt, updatedAt } = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        name,
        description,
        hasCompleted,
      },
    })

    return reply.send({
      name,
      description,
      hasCompleted,
      createdAt,
      updatedAt,
    })
  })
}
