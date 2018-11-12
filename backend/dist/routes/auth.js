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
const validator_1 = require("validator");
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
const user_1 = require("../models/user");
const passport_1 = require("../middleware/passport");
const utils_1 = require("../utils");
exports.router = express.Router();
exports.router.post('/signup', utils_1.multer.any(), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const files = req.files
            ? req.files
            : [];
        const { name, email, password, passwordConfirm, phone } = req.body;
        if (!name)
            return utils_1.errorRes(res, 400, 'Please provide your first and last name');
        if (!email)
            return utils_1.errorRes(res, 400, 'Please provide your email');
        if (!validator_1.isEmail(email))
            return utils_1.errorRes(res, 400, 'Invalid email');
        if (!phone)
            return utils_1.errorRes(res, 400, 'Please provide a phone number');
        if (!password || password.length < 5)
            return utils_1.errorRes(res, 400, 'A password longer than 5 characters is required');
        if (!passwordConfirm)
            return utils_1.errorRes(res, 400, 'Please confirm your password');
        if (passwordConfirm !== password)
            return utils_1.errorRes(res, 400, 'Passwords did not match');
        let user = yield user_1.User.findOne({ email }).exec();
        if (user)
            return utils_1.errorRes(res, 400, 'An account already exists with that email');
        user = new user_1.User({
            name,
            email,
            password,
            phone
        });
        yield user.save();
        const u = user.toJSON();
        delete u.password;
        const token = jwt.sign({
            _id: u._id
        }, config_1.default.SECRET, { expiresIn: '7 days' });
        return utils_1.successRes(res, {
            user: u,
            token
        });
    }
    catch (error) {
        console.error(error);
        return utils_1.errorRes(res, 500, error);
    }
}));
exports.router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.User.findOne({ email }, '+password').exec();
        if (!user)
            return utils_1.errorRes(res, 401, 'User not found');
        if (!user.comparePassword(password))
            return utils_1.errorRes(res, 401, 'Wrong password');
        const u = user.toJSON();
        delete u.password;
        const token = jwt.sign({
            _id: u._id,
            name: u.name,
            email: u.email
        }, config_1.default.SECRET, { expiresIn: '7 days' });
        return utils_1.successRes(res, {
            user: u,
            token
        });
    }
    catch (error) {
        console.error(error);
        return utils_1.errorRes(res, 500, error);
    }
}));
exports.router.get('/me', passport_1.auth(), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.user._id).exec();
        if (!user)
            return utils_1.errorRes(res, 401, 'Member not found.');
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email
        }, config_1.default.SECRET, { expiresIn: '7 days' });
        return utils_1.successRes(res, {
            user,
            token
        });
    }
    catch (error) {
        console.error(error);
        return utils_1.errorRes(res, 500, error);
    }
}));
//# sourceMappingURL=auth.js.map