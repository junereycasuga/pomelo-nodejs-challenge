import { init } from '../../src/app'
import GithubUseCase from '../../src/usecases/github.usecase'
jest.mock('../../src/usecases/github.usecase')

describe('Integration Test', () => {
  let server

  beforeAll(async () => {
    server = await init()
    await server.start()
  })

  afterAll(async () => {
    await server.stop()
  })

  describe('POST /map-child', () => {
    it('responds with 200 with valid request payload', async () => {
      const res = await server.inject({
        method: 'POST',
        url: '/map-child',
        payload: {},
      })
      expect(res.statusCode).toBe(200)
      expect(JSON.stringify(res.result)).toBe(JSON.stringify([]))
    })

    it('responds with 400 with invalid request payload', async () => {
      const res = await server.inject({
        method: 'POST',
        url: '/map-child',
      })
      expect(res.statusCode).toBe(400)
      expect(JSON.stringify(res.result)).toBe(
        JSON.stringify({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Invalid request payload input',
        })
      )
    })
  })

  describe('GET /github', () => {
    beforeEach(() => {
      // @ts-ignore
      GithubUseCase.mockClear()
    })

    it('responds with 200 with no parameters passed', async () => {
      const res = await server.inject({
        method: 'GET',
        url: '/github',
      })
      expect(res.statusCode).toBe(200)
      expect(res.result.page).toBe(1)
      expect(res.result.perPage).toBe(10)
      expect(res.result.prevPage).toBe(1)
      expect(res.result.nextPage).toBe(2)
      expect(res.result.repositories).toBeDefined()
    })

    it('responds with 200 with defined parameters', async () => {
      const res = await server.inject({
        method: 'GET',
        url: '/github?page=3',
      })
      expect(res.statusCode).toBe(200)
      expect(res.result.page).toBe(3)
      expect(res.result.perPage).toBe(10)
      expect(res.result.prevPage).toBe(2)
      expect(res.result.nextPage).toBe(4)
      expect(res.result.repositories).toBeDefined()
    })

    it('responds with eror when Github API returns an error', async () => {
      const res = await server.inject({
        method: 'GET',
        url: '/github?page=12345',
      })
      expect(res.statusCode).toBe(422)
      expect(res.result.details).toBe('Test error response')
    })
  })
})
