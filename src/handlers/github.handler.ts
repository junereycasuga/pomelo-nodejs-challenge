import { Request, ResponseToolkit } from '@hapi/hapi'
import axios from 'axios'

export default class GithubHandler {
  async getRepositories(request: Request, h: ResponseToolkit) {
    const { data } = await axios.get(
      'https://api.github.com/search/repositories?q=nodejs&per_page=10&page=2'
    )
    // @ts-ignore
    return h.view('github', {
      repositories: data,
    })
  }
}
