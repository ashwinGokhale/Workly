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
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const path_1 = require("path");
const config_1 = require("./config");
const passport_1 = require("./middleware/passport");
const home_1 = require("./routes/home");
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const { NODE_ENV, DB } = config_1.default;
class Server {
    static createInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = new Server();
            yield server.mongoSetup();
            return server;
        });
    }
    constructor() {
        this.app = express();
        this.setup();
    }
    setup() {
        this.setupMiddleware();
        this.setupRoutes();
    }
    setupMiddleware() {
        this.app.use(helmet());
        if (NODE_ENV !== 'test')
            NODE_ENV !== 'production'
                ? this.app.use(logger('dev'))
                : this.app.use(logger('tiny'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(passport_1.default(passport).initialize());
        this.app.use(passport_1.extractUser());
        this.app.use(cors());
        this.app.use(express.static(path_1.join(__dirname, '../frontend/build')));
    }
    setupRoutes() {
        this.app.use('/api', home_1.router);
        this.app.use('/api/auth', auth_1.router);
        this.app.use('/api/users', users_1.router);
        this.app.get('*', (req, res) => res.sendFile(path_1.resolve(__dirname, '../../frontend/build/index.html')));
    }
    mongoSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.mongoose = yield mongoose.connect(DB, { useNewUrlParser: true });
                this.mongoose.Promise = Promise;
                return this.mongoose;
            }
            catch (error) {
                console.error('Error connecting to mongo:', error);
                return process.exit(1);
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map