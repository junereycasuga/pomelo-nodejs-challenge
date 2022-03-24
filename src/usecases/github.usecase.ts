import axios, { AxiosInstance, AxiosResponse } from 'axios'

export default class GithubUseCase {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.github.com',
    })
  }

  /**
   * Fetches a list of repositories from Github
   * @param perPage number number of items per page
   * @param page number
   * @param query string
   * @returns Promise<AxiosResponse>
   */
  getRepositories(
    perPage?: number,
    page?: number,
    query?: string
  ): Promise<AxiosResponse> {
    return this.client.get('/search/repositories', {
      params: {
        page: page || 0,
        per_page: perPage || 0,
        q: query || 'nodejs',
      },
    })
  }
}
