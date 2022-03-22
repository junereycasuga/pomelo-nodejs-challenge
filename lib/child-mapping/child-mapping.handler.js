"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChildMapHandler {
    constructor(childMapUseCase) {
        this.childMapUseCase = childMapUseCase;
        this.handleChildMapping = this.handleChildMapping.bind(this);
    }
    handleChildMapping(request) {
        const payload = request.payload;
        return this.childMapUseCase.processChildMap(payload);
    }
}
exports.default = ChildMapHandler;
