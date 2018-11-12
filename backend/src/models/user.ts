import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export let Schema = mongoose.Schema;

export interface IUserModel extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	phone: string;
	// TODO: Add roles (job seeker or recruiter)
	comparePassword(password: string): boolean;
}

const schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			select: false,
			default: ''
		},
		phone: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

schema.pre('save', async function(next) {
	const user = this as IUserModel;
	if (user.isModified('password') || user.isNew) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(user.password, salt);
			user.password = hash;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	next();
});

schema.methods.comparePassword = function(password: string) {
	const user = this as IUserModel;
	return bcrypt.compareSync(password, user.password);
};

export const User = mongoose.model<IUserModel>('User', schema, 'users');
