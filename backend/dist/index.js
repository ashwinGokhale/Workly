"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const config_1 = require("./config");
const { PORT } = config_1.default;
const start = () => __awaiter(this, void 0, void 0, function* () {
    const server = yield server_1.default.createInstance();
    server.app.listen(PORT, () => console.log('CONFIG: ', config_1.default, `\nListening on port: ${PORT}`));
    return server;
});
start();
//# sourceMappingURL=index.js.map