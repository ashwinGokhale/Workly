import * as mongoose from 'mongoose';
import { IUserModel } from './user';

export let Schema = mongoose.Schema;

export interface IJobModel extends mongoose.Document {
	user: IUserModel;
	name: string;
	// TODO: add more fields
}

const schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		name: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

export const Job = mongoose.model<IJobModel>('Job', schema, 'jobs');
