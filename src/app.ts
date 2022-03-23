import dotenv from 'dotenv'
import { env } from '@usefultools/utils'
import Hapi from '@hapi/hapi'
import ChildMapHandler from './child-mapping/child-mapping.handler'
import ChildMapUseCase from './child-mapping/child-mapping.usecase'
import Joi from 'joi'

dotenv.config()

// initialize the server
const server = Hapi.server({
  port: env.getAsInt('PORT'),
  host: env.getAsStr('HOST'),
})

export const init = async () => {
  // register plugins
  await server.register({
    plugin: require('hapi-pino'),
  })

  const childMapUseCase = new ChildMapUseCase()
  const childMapHandler = new ChildMapHandler(childMapUseCase)

  server.route({
    method: 'POST',
    path: '/map-child',
    handler: childMapHandler.handleChildMapping,
    options: {
      validate: {
        payload: Joi.object().required(),
      },
    },
  })

  await server.initialize()

  return server
}
