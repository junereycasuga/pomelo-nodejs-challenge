import { init } from '../../src/app'

describe('POST /map-child', () => {
  let server

  beforeEach(async () => {
    server = await init()
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

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
