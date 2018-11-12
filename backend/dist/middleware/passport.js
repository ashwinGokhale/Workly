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
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("../config");
const user_1 = require("../models/user");
const utils_1 = require("../utils");
passport.serializeUser((user, done) => {
    console.log('Passport serialize user:', user);
    done(undefined, user.id);
});
passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(id).exec();
        console.log('Passport serialize user:', user);
        done(null, user);
    }
    catch (error) {
        done(error, undefined);
    }
}));
exports.default = (pass) => pass.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.SECRET
}, (payload, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(payload._id)
            .lean()
            .exec();
        return user ? done(null, user) : done(null, false);
    }
    catch (error) {
        console.error('Strategy error:', error);
        return done(error, false);
    }
})));
exports.auth = () => (req, res, next) => req.user ? next() : utils_1.errorRes(res, 401, 'Unauthorized');
exports.extractUser = () => (req, res, next) => passport.authenticate('jwt', { session: false }, (err, data, info) => {
    req.user = data || null;
    next();
})(req, res, next);
//# sourceMappingURL=passport.js.map