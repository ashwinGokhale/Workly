import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import CONFIG from '../config';
import { User, IUserModel } from '../models/user';
import { errorRes } from '../utils';

passport.serializeUser<any, any>((user, done) => {
	console.log('Passport serialize user:', user);
	done(undefined, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id).exec();
		console.log('Passport serialize user:', user);
		done(null, user as IUserModel);
	} catch (error) {
		done(error, undefined);
	}
});

export default (pass: passport.PassportStatic) =>
	pass.use(
		new Strategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: CONFIG.SECRET
			},
			async (payload, done) => {
				try {
					const user = await User.findById(payload._id)
						.lean()
						.exec();
					return user ? done(null, user) : done(null, false);
				} catch (error) {
					console.error('Strategy error:', error);
					return done(error, false);
				}
			}
		)
	);

export const auth = () => (req: Request, res: Response, next: NextFunction) =>
	req.user ? next() : errorRes(res, 401, 'Unauthorized');

export const extractUser = () => (
	req: Request,
	res: Response,
	next: NextFunction
) =>
	passport.authenticate('jwt', { session: false }, (err, data, info) => {
		req.user = data || null;
		next();
	})(req, res, next);
