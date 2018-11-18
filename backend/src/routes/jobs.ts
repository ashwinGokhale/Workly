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
		}).exec();
		return successRes(res, jobs);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.post('/', auth(), async (req, res) => {
	try {
		const {
			company,
			role,
			email,
			status,
			coverLetter,
			location,
			recruiter,
			blockers,
			nextSteps
		} = req.body;
		if (!company) return errorRes(res, 400, 'Please enter company name');
		if (!role) return errorRes(res, 400, 'Please enter the role you are applying for');
		if (!email) return errorRes(res, 400, 'Please enter the email you applied with');
		const job = new Job({
			user: req.user,
			company,
			role,
			email,
			status,
			coverLetter,
			location,
			recruiter,
			blockers,
			nextSteps
		});
		await job.save();
		return successRes(res, job);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});
