import * as express from 'express';
import { User } from '../models/user';
import { successRes, errorRes } from '../utils';
import { ObjectId } from 'bson';
import { auth } from '../middleware/passport';
export const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const users = await User.find().exec();
		return successRes(res, users);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id))
			return errorRes(res, 400, 'Invalid user ID');
		const user = await User.findById(req.params.id).exec();
		if (!user) return errorRes(res, 400, 'User does not exist');
		return successRes(res, user);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.get('/:id/posts', async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id))
			return errorRes(res, 400, 'Invalid user ID');
		const user = await User.findById(req.params.id)
			.populate({
				path: 'posts',
				model: 'Post'
			})
			.exec();
		if (!user) return errorRes(res, 400, 'User does not exist');
		return successRes(res, user);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.post('/:id/follow', auth(), async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id))
			return errorRes(res, 400, 'Invalid user ID');
		let user = await User.findById(req.params.id).exec();
		if (!user) return errorRes(res, 400, 'User does not exist');
		[user, req.user] = await Promise.all([
			User.findByIdAndUpdate(
				req.params.id,
				{
					$push: {
						followers: req.user._id
					}
				},
				{ new: true }
			).exec(),
			User.findByIdAndUpdate(
				req.user._id,
				{
					$push: {
						following: req.user._id
					}
				},
				{ new: true }
			).exec()
		]);
		return successRes(res, user);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.post('/:id/unfollow', auth(), async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id))
			return errorRes(res, 400, 'Invalid user ID');
		let user = await User.findById(req.params.id).exec();
		if (!user) return errorRes(res, 400, 'User does not exist');
		[user, req.user] = await Promise.all([
			User.findByIdAndUpdate(
				req.params.id,
				{
					$pull: {
						followers: req.user._id
					}
				},
				{ new: true }
			).exec(),
			User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: {
						following: req.user._id
					}
				},
				{ new: true }
			).exec()
		]);
		return successRes(res, user);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});
