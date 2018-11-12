import * as express from 'express';
import { isEmail, isMobilePhone } from 'validator';
import * as jwt from 'jsonwebtoken';
import CONFIG from '../config';
import { User } from '../models/user';
import { auth } from '../middleware/passport';
import { successRes, errorRes, multer } from '../utils';

export const router = express.Router();

router.post('/signup', multer.any(), async (req, res) => {
	try {
		const files: Express.Multer.File[] = req.files
			? (req.files as Express.Multer.File[])
			: [];

		const { name, email, password, passwordConfirm, phone } = req.body;
		if (!name)
			return errorRes(
				res,
				400,
				'Please provide your first and last name'
			);
		if (!email) return errorRes(res, 400, 'Please provide your email');
		if (!isEmail(email)) return errorRes(res, 400, 'Invalid email');
		if (!phone) return errorRes(res, 400, 'Please provide a phone number');
		// if (!isMobilePhone(phone, 'en-US'))
		// 	return errorRes(res, 400, 'Please provide a valid US phone number');
		if (!password || password.length < 5)
			return errorRes(
				res,
				400,
				'A password longer than 5 characters is required'
			);
		if (!passwordConfirm)
			return errorRes(res, 400, 'Please confirm your password');
		if (passwordConfirm !== password)
			return errorRes(res, 400, 'Passwords did not match');

		let user = await User.findOne({ email }).exec();
		if (user)
			return errorRes(
				res,
				400,
				'An account already exists with that email'
			);

		user = new User({
			name,
			email,
			password,
			phone
		});

		await user.save();

		const u = user.toJSON();
		delete u.password;
		const token = jwt.sign(
			{
				_id: u._id
			},
			CONFIG.SECRET,
			{ expiresIn: '7 days' }
		);
		return successRes(res, {
			user: u,
			token
		});
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email }, '+password').exec();
		if (!user) return errorRes(res, 401, 'User not found');

		// Check if password matches
		if (!user.comparePassword(password))
			return errorRes(res, 401, 'Wrong password');

		const u = user.toJSON();
		delete u.password;

		// If user is found and password is right create a token
		const token = jwt.sign(
			{
				_id: u._id,
				name: u.name,
				email: u.email
			},
			CONFIG.SECRET,
			{ expiresIn: '7 days' }
		);

		return successRes(res, {
			user: u,
			token
		});
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.get('/me', auth(), async (req, res) => {
	try {
		const user = await User.findById(req.user._id).exec();
		if (!user) return errorRes(res, 401, 'Member not found.');

		// If user is found and password is right create a token
		const token = jwt.sign(
			{
				_id: user._id,
				name: user.name,
				email: user.email
			},
			CONFIG.SECRET,
			{ expiresIn: '7 days' }
		);

		return successRes(res, {
			user,
			token
		});
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

// router.post('/forgot', async (req, res) => {
// 	try {
// 		const { email } = req.body;
// 		if (!email || !isEmail(email))
// 			return errorRes(res, 400, 'Please provide a valid email');
// 		const member = await User.findOne({ email }).exec();
// 		if (!member)
// 			return errorRes(
// 				res,
// 				400,
// 				`There is no member with the email: ${email}`
// 			);
// 		await sendResetEmail(member, req);
// 		return successRes(
// 			res,
// 			`A link to reset your password has been sent to: ${email}`
// 		);
// 	} catch (error) {
// 		console.error(error);
// 		return errorRes(res, 500, error);
// 	}
// });

// router.post('/reset', async (req, res) => {
// 	try {
// 		const { password, passwordConfirm, token } = req.body;
// 		if (!password || password.length < 5)
// 			return errorRes(
// 				res,
// 				400,
// 				'A password longer than 5 characters is required'
// 			);
// 		if (!passwordConfirm)
// 			return errorRes(res, 400, 'Please confirm your password');
// 		if (passwordConfirm !== password)
// 			return errorRes(res, 400, 'Passwords did not match');
// 		if (!token) return errorRes(res, 401, 'Invalid reset password token');
// 		let payload;
// 		try {
// 			payload = jwt.verify(token, CONFIG.SECRET) as object;
// 		} catch (error) {
// 			return errorRes(res, 400, 'Invalid reset password token');
// 		}
// 		if (!payload) return errorRes(res, 400, 'Invalid reset password token');
// 		const { id } = payload;
// 		if (!id || !ObjectId.isValid(id))
// 			return errorRes(
// 				res,
// 				400,
// 				'Reset password token corresponds to an invalid member'
// 			);
// 		const member = await User.findById(id).exec();
// 		if (!member)
// 			return errorRes(
// 				res,
// 				400,
// 				'Reset password token corresponds to a non existing member'
// 			);

// 		if (member.resetPasswordToken !== token)
// 			return errorRes(
// 				res,
// 				401,
// 				'Wrong reset password token for this member'
// 			);
// 		member.password = password;
// 		member.resetPasswordToken = '';
// 		await member.save();
// 		return successRes(
// 			res,
// 			`Successfully changed password for: ${member.name}`
// 		);
// 	} catch (error) {
// 		console.error(error);
// 		return errorRes(res, 500, error);
// 	}
// });
