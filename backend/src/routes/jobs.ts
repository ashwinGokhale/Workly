import * as express from 'express';
import { successRes, errorRes } from '../utils';
import { ObjectId } from 'bson';
import { auth } from '../middleware/passport';
import { Job } from '../models/job';
export const router = express.Router();

router.get('/', auth(), async (req, res) => {
	try {
		const jobs = await Job.find({
			user: req.user
		})
		.exec();
		return successRes(res, jobs);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.post('/', auth(), async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) return errorRes(res, 400, 'Please enter company name');
		const job = new Job({
			user: req.user,
			name
		});
		await job.save();
		return successRes(res, job);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});
