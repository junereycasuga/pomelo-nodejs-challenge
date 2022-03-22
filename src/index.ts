import dotenv from 'dotenv'
import { env } from '@usefultools/utils'
import Hapi, { Server } from '@hapi/hapi'
import ChildMapHandler from './child-mapping/child-mapping.handler'
import ChildMapUseCase from './child-mapping/child-mapping.usecase'

dotenv.config()

let server: Server
const init = async () => {
  // initialize the server
  server = Hapi.server({
    port: env.getAsInt('PORT'),
    host: env.getAsStr('HOST'),
  })

  const childMapUseCase = new ChildMapUseCase()
  const childMapHandler = new ChildMapHandler(childMapUseCase)

  server.route({
    method: 'POST',
    path: '/map-child',
    handler: childMapHandler.handleChildMapping,
  })

  await server.start()

  console.log(`Server is running on ${server.info.uri} 🚀`)
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

init()
