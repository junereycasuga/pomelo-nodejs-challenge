import {
  ChildMappingInput,
  ChildMappingOutput,
} from '@src/child-mapping/child-mapping.types'

export default class ChildMapUseCase {
  /**
   * Maps the correct children of a parent object
   * @param input ChildMappingInput
   * @returns ChildMappingOutput[]
   */
  processChildMap(input: ChildMappingInput): ChildMappingOutput[] {
    const output: ChildMappingOutput[] = []

    return output
  }
}
