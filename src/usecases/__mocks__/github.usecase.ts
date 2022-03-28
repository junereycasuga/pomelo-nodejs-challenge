export const getRepositoriesMock = jest
  .fn()
  .mockImplementation((perPage, page) => {
    // error case
    if (page === 12345) {
      return Promise.reject({
        response: {
          status: 422,
          statusText: 'Unprocessable Entity',
          data: {
            message: 'Test error response',
          },
        },
      })
    } else {
      return Promise.resolve({
        data: {
          total_count: 100,
          items: [],
        },
      })
    }
  })

const GithubUseCaseMock = jest.fn().mockImplementation(() => {
  return { getRepositories: getRepositoriesMock }
})

export default GithubUseCaseMock
