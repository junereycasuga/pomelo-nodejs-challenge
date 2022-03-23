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
    let output: ChildMappingOutput[] = []

    if (!input || typeof input === undefined || typeof input !== 'object') {
      return output
    }

    // flatten the input into single array
    // and sort by level in descending order
    const flattenedData = this.flatten(input).sort((a, b) => a.level - b.level)

    // assign childrens to its parent
    output = this.assignChildren(flattenedData)

    return output
  }

  /**
   * Assigns childrens to its parent
   * @param items ChildMappingOutput[]
   * @returns ChildMappingOutput[]
   */
  private assignChildren(items: ChildMappingOutput[]): ChildMappingOutput[] {
    // go through each item
    for (let i = items.length - 1; i >= 0; i--) {
      // check if a parent_id exists and if the parent can be found in the items
      if (items[i].parent_id) {
        const parent = items.find((p) => p.id === items[i].parent_id)
        if (parent) {
          // if the parent is found, push the item into the parent's children array
          parent.children.push(items[i])

          // pop the current item
          items.pop()
        }
      }
    }

    return items
  }

  /**
   * Internal recursive function for flattening the array
   * Same thing can be possibly achieved using built-in array function, flatMap
   * @param items ChildMappingInput
   * @returns ChildMappingOutput[]
   */
  private flatten(items: ChildMappingInput): ChildMappingOutput[] {
    const flat = []

    function inner(input) {
      if (Array.isArray(input)) {
        input.forEach(inner)
      } else {
        flat.push(input)
      }
    }

    inner(Object.values(items))

    return flat
  }
}
