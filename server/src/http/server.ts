import Fastify from 'fastify'

const app = Fastify()

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening on ${address}`)
})
