import dotenv from 'dotenv'
import { env } from '@usefultools/utils'
import Hapi from '@hapi/hapi'
import Vision from '@hapi/vision'
import Inert from '@hapi/inert'
import ChildMapHandler from './handlers/child-mapping.handler'
import ChildMapUseCase from './usecases/child-mapping.usecase'
import Joi from 'joi'
import HapiReactViews from 'hapi-react-views'
import babelRegister from '@babel/register'
import GithubHandler from './handlers/github.handler'
import GithubUseCase from './usecases/github.usecase'
import HapiSwagger from 'hapi-swagger'
import HapiPino from 'hapi-pino'
import { ChildMappingSuccessResponse } from './types/child-mapping.types'

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
  await server.register([Inert, Vision, HapiSwagger, HapiPino])

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
      tags: ['api'],
      validate: {
        payload: Joi.object().required(),
      },
      response: {
        status: {
          200: ChildMappingSuccessResponse,
        },
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

  // NOTE: This endpoint was created for the purpose of being able to test the params
  // being passed into the view file in `getRepositories` endpoint.
  // The reason for this is that running the integration test on the endpoint
  // that returns with the view fails as it cannot find the jsx file for it as
  // it needs to compile first from tsx
  server.route({
    method: 'GET',
    path: '/github',
    handler: githubHandler.getRepositoriesJSON,
    options: {
      tags: ['api'],
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
