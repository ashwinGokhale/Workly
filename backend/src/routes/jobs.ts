import * as express from 'express';
import { successRes, errorRes } from '../utils';
import { ObjectId } from 'bson';
import { auth } from '../middleware/passport';
import { Job, statuses } from '../models/job';
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
			nextSteps,
			additionalInformation
		} = req.body;
		if (!company) return errorRes(res, 400, 'Please enter company name');
		if (!role)
			return errorRes(
				res,
				400,
				'Please enter the role you are applying for'
			);
		if (!email)
			return errorRes(
				res,
				400,
				'Please enter the email you applied with'
			);
		if (status && !statuses.find(stat => stat === status))
			return errorRes(res, 400, 'Invalid job status');
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
			nextSteps,
			additionalInformation
		});
		await job.save();
		return successRes(res, job);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.get('/:id', auth(), async (req, res) => {
	try {
		const { id } = req.params;
		if (!ObjectId.isValid(id)) return errorRes(res, 400, 'Invalid Job ID');
		const job = await Job.findById(id).exec();
		if (!job) return errorRes(res, 400, 'Job not found');
		const equals = req.user._id.equals(job.user);
		if (!equals) return errorRes(res, 401, 'Denied access to this job');
		return successRes(res, job);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.delete('/:id', auth(), async (req, res) => {
	try {
		const { id } = req.params;
		if (!ObjectId.isValid(id)) return errorRes(res, 400, 'Invalid Job ID');
		const job = await Job.findById(id).exec();
		if (!job) return errorRes(res, 400, 'Job not found');
		const equals = req.user._id.equals(job.user);
		if (!equals) return errorRes(res, 401, 'Denied access to this job');
		await job.remove();
		return successRes(res, job);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});

router.put('/:id', auth(), async (req, res) => {
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
		const { id } = req.params;
		if (!ObjectId.isValid(id)) return errorRes(res, 400, 'Invalid Job ID');
		const job = await Job.findById(id)
			.lean()
			.exec();
		if (!job) return errorRes(res, 400, 'Job not found');
		const equals = req.user._id.equals(job.user);
		if (!equals) return errorRes(res, 401, 'Denied access to this job');
		if (!company) return errorRes(res, 400, 'Please enter company name');
		if (!role)
			return errorRes(
				res,
				400,
				'Please enter the role you are applying for'
			);
		if (!email)
			return errorRes(
				res,
				400,
				'Please enter the email you applied with'
			);
		if (status && !statuses.find(stat => stat === status))
			return errorRes(res, 400, 'Invalid job status');

		const jobBuilder = {
			...job,
			company,
			role,
			email,
			status,
			coverLetter,
			location,
			recruiter,
			blockers,
			nextSteps
		};

		const updatedJob = await Job.findByIdAndUpdate(id, jobBuilder, {
			new: true
		}).exec();

		// await job.save();
		return successRes(res, updatedJob);
	} catch (error) {
		console.error(error);
		return errorRes(res, 500, error);
	}
});
