"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("@usefultools/utils");
const hapi_1 = __importDefault(require("@hapi/hapi"));
const child_mapping_handler_1 = __importDefault(require("./child-mapping/child-mapping.handler"));
const child_mapping_usecase_1 = __importDefault(require("./child-mapping/child-mapping.usecase"));
dotenv_1.default.config();
let server;
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    // initialize the server
    server = hapi_1.default.server({
        port: utils_1.env.getAsInt('PORT'),
        host: utils_1.env.getAsStr('HOST'),
    });
    const childMapUseCase = new child_mapping_usecase_1.default();
    const childMapHandler = new child_mapping_handler_1.default(childMapUseCase);
    server.route({
        method: 'POST',
        path: '/map-child',
        handler: childMapHandler.handleChildMapping,
    });
    yield server.start();
    console.log(`Server is running on ${server.info.uri} 🚀`);
});
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});
init();
