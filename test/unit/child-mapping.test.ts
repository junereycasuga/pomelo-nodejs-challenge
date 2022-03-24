import ChildMapUseCase from '../../src/usecases/child-mapping.usecase'
import testCases from './child-mapping-cases'

let childMappingUseCase

describe('ChildMappingUseCase', () => {
  describe('processChildMap', () => {
    beforeAll(() => {
      childMappingUseCase = new ChildMapUseCase()
    })

    test.each(testCases)('%s', (testName, input, expectedResult) => {
      const result = childMappingUseCase.processChildMap(input)
      expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult))
    })
  })
})
