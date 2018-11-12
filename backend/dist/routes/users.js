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
const user_1 = require("../models/user");
const utils_1 = require("../utils");
const bson_1 = require("bson");
const passport_1 = require("../middleware/passport");
exports.router = express.Router();
exports.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find().exec();
        return utils_1.successRes(res, users);
    }
    catch (error) {
        console.error(error);
        return utils_1.errorRes(res, 500, error);
    }
}));
exports.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!bson_1.ObjectId.isValid(req.params.id))
            return utils_1.errorRes(res, 400, 'Invalid user ID');
        const user = yield user_1.User.findById(req.params.id).exec();
        if (!user)
            return utils_1.errorRes(res, 400, 'User does not exist');
        return utils_1.successRes(res, user);
    }
    catch (error) {
        console.error(error);
        return utils_1.errorRes(res, 500, error);
    }
}));
exports.router.get('/:id/posts', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!bson_1.ObjectId.isValid(req.params.id))
            return utils_1.errorRes(res, 400, 'Invalid user ID');
        const user = yield user_1.User.findById(req.params.id)
            .populate({
            path: 'posts',
            model: 'Post'
        })
            .exec();
        if (!user)
            return utils_1.errorRes(res, 400, 'User does not exist');
        return utils_1.successRes(res, user);
    }
    catch (error) {
        console.error(error);
        return utils_1.errorRes(res, 500, error);
    }
}));
exports.router.post('/:id/follow', passport_1.auth(), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!bson_1.ObjectId.isValid(req.params.id))
            return utils_1.errorRes(res, 400, 'Invalid user ID');
        let user = yield user_1.User.findById(req.params.id).exec();
        if (!user)
            return utils_1.errorRes(res, 400, 'User does not exist');
        [user, req.user] = yield Promise.all([
            user_1.User.findByIdAndUpdate(req.params.id, {
                $push: {
                    followers: req.user._id
                }
            }, { new: true }).exec(),
            user_1.User.findByIdAndUpdate(req.user._id, {
                $push: {
                    following: req.user._id
                }
            }, { new: true }).exec()
        ]);
        return utils_1.successRes(res, user);
    }
    catch (error) {
        console.error(error);
        return utils_1.errorRes(res, 500, error);
    }
}));
exports.router.post('/:id/unfollow', passport_1.auth(), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (!bson_1.ObjectId.isValid(req.params.id))
            return utils_1.errorRes(res, 400, 'Invalid user ID');
        let user = yield user_1.User.findById(req.params.id).exec();
        if (!user)
            return utils_1.errorRes(res, 400, 'User does not exist');
        [user, req.user] = yield Promise.all([
            user_1.User.findByIdAndUpdate(req.params.id, {
                $pull: {
                    followers: req.user._id
                }
            }, { new: true }).exec(),
            user_1.User.findByIdAndUpdate(req.user._id, {
                $pull: {
                    following: req.user._id
                }
            }, { new: true }).exec()
        ]);
        return utils_1.successRes(res, user);
    }
    catch (error) {
        console.error(error);
        return utils_1.errorRes(res, 500, error);
    }
}));
//# sourceMappingURL=users.js.map