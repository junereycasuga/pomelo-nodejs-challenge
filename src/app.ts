import dotenv from 'dotenv'
import { env } from '@usefultools/utils'
import Hapi from '@hapi/hapi'
import Vision from '@hapi/vision'
import ChildMapHandler from './handlers/child-mapping.handler'
import ChildMapUseCase from './usecases/child-mapping.usecase'
import Joi from 'joi'
import HapiReactViews from 'hapi-react-views'
import babelRegister from '@babel/register'
import GithubHandler from './handlers/github.handler'
import GithubUseCase from './usecases/github.usecase'

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

  const githubUseCase = new GithubUseCase()
  const githubHandler = new GithubHandler(githubUseCase)

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
    options: {
      validate: {
        query: Joi.object({
          query: Joi.string().optional(),
          page: Joi.number().min(0).optional(),
          perPage: Joi.number().min(1).optional(),
        }),
      },
    },
  })

  await server.initialize()

  return server
}
