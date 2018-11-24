import { Schema, Document, model } from 'mongoose';
import { IUserModel } from './user';

export const statuses = [
	'Need To Apply',
	'Applied',
	'Interview',
	'Received Offer',
	'Accepted Offer',
	'Denied'
];

export interface IJobModel extends Document {
	user: IUserModel;
	company: string;
	// TODO: add more fields
	role: string;
	email: string;
	status: string;
	coverLetter: boolean;
	location: string;
	recruiter: string;
	blockers: string;
	nextSteps: string;
	additionalInformation: string;
}

const schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		company: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: statuses,
			default: statuses[0]
		},
		coverLetter: {
			type: Boolean,
			default: false
		},
		location: {
			type: String,
			default: ''
		},
		recruiter: {
			type: String,
			default: ''
		},
		blockers: {
			type: String,
			default: ''
		},
		nextSteps: {
			type: String,
			default: ''
		},
		additionalInformation: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
);

export const Job = model<IJobModel>('Job', schema, 'jobs');
