import { Request, ResponseToolkit } from '@hapi/hapi'
import GithubUseCase from '@src/usecases/github.usecase'

export default class GithubHandler {
  constructor(private githubUseCase: GithubUseCase) {
    this.getRepositories = this.getRepositories.bind(this)
  }

  async getRepositories(request: Request, h: ResponseToolkit) {
    const { query, page, perPage } = request.query
    const { data } = await this.githubUseCase.getRepositories(
      perPage,
      page,
      query
    )

    // @ts-ignore
    return h.view('github', {
      repositories: data,
    })
  }
}
