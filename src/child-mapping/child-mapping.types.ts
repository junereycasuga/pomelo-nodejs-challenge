export type ChildMappingOutput = {
  id: number
  title: string
  level: number
  children?: ChildMappingOutput[]
  parent_id?: number
}

export type ChildMappingInput = {
  [id: string]: ChildMappingOutput[]
}
