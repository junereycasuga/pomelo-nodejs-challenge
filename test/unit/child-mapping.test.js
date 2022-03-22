"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_mapping_usecase_1 = __importDefault(require("../../src/child-mapping/child-mapping.usecase"));
const child_mapping_cases_1 = __importDefault(require("./child-mapping-cases"));
let childMappingUseCase;
describe('ChildMappingUseCase', () => {
    describe('processChildMap', () => {
        beforeAll(() => {
            childMappingUseCase = new child_mapping_usecase_1.default();
        });
        test.each(child_mapping_cases_1.default)('%s', (testName, input, expectedResult) => {
            const result = childMappingUseCase.processChildMap(input);
            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
        });
    });
});
