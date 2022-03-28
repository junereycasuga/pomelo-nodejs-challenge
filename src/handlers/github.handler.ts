import { Request, ResponseToolkit } from '@hapi/hapi'
import GithubUseCase from '@src/usecases/github.usecase'

export default class GithubHandler {
  constructor(private githubUseCase: GithubUseCase) {
    this.getRepositories = this.getRepositories.bind(this)
    this.getRepositoriesJSON = this.getRepositoriesJSON.bind(this)
  }

  async getRepositories(request: Request, h: ResponseToolkit) {
    const { query, page = 1, perPage = 10 } = request.query
    try {
      const { data } = await this.githubUseCase.getRepositories(
        perPage,
        page,
        query
      )
      const pageCount = Math.ceil(data.total_count / perPage)
      const prevPage = page - 1 <= 0 ? 1 : page - 1
      const nextPage =
        page + 1 >= data.total_count ? data.total_count : page + 1

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
    } catch (err) {
      return h.view('error', {
        error: err.response.data.message,
      })
    }
  }

  // NOTE: This endpoint was created for the purpose of being able to test the params
  // being passed into the view file in `getRepositories` endpoint.
  // The reason for this is that running the integration test on the endpoint
  // that returns with the view fails as it cannot find the jsx file for it as
  // it needs to compile first from tsx
  async getRepositoriesJSON(request: Request, h: ResponseToolkit) {
    const { query, page = 1, perPage = 10 } = request.query

    try {
      const response = await this.githubUseCase.getRepositories(
        perPage,
        page,
        query
      )
      console.log(response)
      const { data } = response
      const pageCount = Math.ceil(data.total_count / perPage)
      const prevPage = page - 1 <= 0 ? 1 : page - 1
      const nextPage =
        page + 1 >= data.total_count ? data.total_count : page + 1

      return {
        page,
        perPage,
        pageCount,
        prevPage,
        nextPage,
        repositories: data,
      }
    } catch (err) {
      const statusCode = err.response?.status || 500
      const error = err.response?.statusText || 'Internal Server Error'
      const details = err.response?.data?.message || 'Something went wrong'
      return h
        .response({
          statusCode,
          error,
          details,
        })
        .code(statusCode)
    }
  }
}
