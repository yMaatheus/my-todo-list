import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import z from 'zod'

export async function deleteTask(app: FastifyInstance) {
  app.delete('/task/:taskId', async (request, reply) => {
    const requestParams = z.object({
      taskId: z.string().uuid(),
    })

    const { taskId } = requestParams.parse(request.params)

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    })

    return reply.send()
  })
}
