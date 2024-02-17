import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import z from 'zod'

export async function updateTask(app: FastifyInstance) {
  app.put('/task/:taskId', async (request, reply) => {
    const requestParams = z.object({
      taskId: z.string().uuid(),
    })

    const requestBody = z.object({
      name: z.string().min(3).max(64),
      completed: z.boolean(),
    })

    const { taskId } = requestParams.parse(request.params)
    const { name, completed } = requestBody.parse(request.body)

    const { listId: _, ...task } = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        name,
        completed,
      },
    })

    return reply.send({ ...task })
  })
}
