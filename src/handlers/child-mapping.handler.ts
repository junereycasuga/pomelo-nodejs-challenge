import { Request } from '@hapi/hapi'
import ChildMapUseCase from '@src/usecases/child-mapping.usecase'
import {
  ChildMappingInput,
  ChildMappingOutput,
} from '@src/types/child-mapping.types'

export interface ChildMapHandlerInterface {
  handleChildMapping(request: Request): ChildMappingOutput[]
}

export default class ChildMapHandler implements ChildMapHandlerInterface {
  constructor(private childMapUseCase: ChildMapUseCase) {
    this.handleChildMapping = this.handleChildMapping.bind(this)
  }

  handleChildMapping(request: Request) {
    const payload = request.payload as ChildMappingInput
    return this.childMapUseCase.processChildMap(payload)
  }
}
