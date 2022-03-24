import dotenv from 'dotenv'
import { env } from '@usefultools/utils'
import Hapi, { Server } from '@hapi/hapi'
import Vision from '@hapi/vision'
import ChildMapHandler from './handlers/child-mapping.handler'
import ChildMapUseCase from './usecases/child-mapping.usecase'
import Joi from 'joi'
import HapiReactViews from 'hapi-react-views'
import babelRegister from '@babel/register'
import GithubHandler from './handlers/github.handler'

babelRegister({
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
})

dotenv.config()

// initialize the server
const server = Hapi.server({
  port: env.getAsInt('PORT'),
  host: env.getAsStr('HOST'),
})

export const init = async () => {
  // register plugins
  await Promise.all([
    server.register({
      plugin: require('hapi-pino'),
    }),
    server.register(Vision),
  ])

  // @ts-ignore
  server.views({
    engines: {
      jsx: HapiReactViews,
    },
    relativeTo: __dirname,
    path: 'views',
  })

  const childMapUseCase = new ChildMapUseCase()
  const childMapHandler = new ChildMapHandler(childMapUseCase)

  const githubHandler = new GithubHandler()

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

  server.route({
    method: 'GET',
    path: '/',
    handler: githubHandler.getRepositories,
  })

  await server.initialize()

  return server
}
