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
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.Schema = mongoose.Schema;
const schema = new exports.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        default: ''
    },
    phone: {
        type: String,
        required: true
    },
    cards: {
        type: [exports.Schema.Types.ObjectId],
        ref: 'Card',
        default: []
    }
}, { timestamps: true });
schema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password') || user.isNew) {
            try {
                const salt = yield bcrypt.genSalt(10);
                const hash = yield bcrypt.hash(user.password, salt);
                user.password = hash;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        }
        next();
    });
});
schema.methods.comparePassword = function (password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
};
exports.User = mongoose.model('User', schema, 'users');
//# sourceMappingURL=user.js.map