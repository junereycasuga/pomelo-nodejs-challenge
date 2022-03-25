import { Request, ResponseToolkit } from '@hapi/hapi'
import GithubUseCase from '@src/usecases/github.usecase'

export default class GithubHandler {
  constructor(private githubUseCase: GithubUseCase) {
    this.getRepositories = this.getRepositories.bind(this)
  }

  async getRepositories(request: Request, h: ResponseToolkit) {
    const { query, page = 1, perPage = 10 } = request.query
    const { data } = await this.githubUseCase.getRepositories(
      perPage,
      page,
      query
    )
    const pageCount = Math.ceil(data.total_count / perPage)
    const prevPage = page - 1 <= 0 ? 1 : page - 1
    const nextPage = page + 1 >= data.total_count ? data.total_count : page + 1

    // @ts-ignore
    // for some reason, React hooks are not working with hapi-react-views
    // opted-in on pulling data from the backend side and pass it into the view instead
    return h.view('github', {
      page,
      perPage,
      pageCount,
      prevPage,
      nextPage,
      repositories: data,
    })
  }
}
