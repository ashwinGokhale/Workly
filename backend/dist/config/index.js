"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const env = process.env;
const config = {
    PORT: env.PORT || 5000,
    SECRET: env.SECRET || 'my-secret',
    EXPIRES_IN: env.EXPIRES_IN || 10000,
    NODE_ENV: env.NODE_ENV || 'development',
    DB: env.NODE_ENV === 'test'
        ? 'mongodb://localhost:27017/Workly_Test'
        : env.DB
            ? env.DB
            : 'mongodb://localhost:27017/Workly'
};
exports.default = config;
//# sourceMappingURL=index.js.map