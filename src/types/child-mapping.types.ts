import Joi from 'joi'

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

export const ChildMappingSuccessResponse = Joi.array()
  .items(
    Joi.object({
      id: Joi.number(),
      title: Joi.string(),
      level: Joi.number(),
      children: Joi.array().items(Joi.object()),
      parent_id: Joi.number(),
    })
  )
  .label('Map Child Response')
