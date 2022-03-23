import { init } from './app'

const serve = async () => {
  const server = await init()
  server.start()
  console.log('API is running')
}

serve()
