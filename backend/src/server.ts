import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import mongoose = require('mongoose');
import * as passport from 'passport';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { join, resolve } from 'path';
import CONFIG from './config';
import passportMiddleWare, { extractUser } from './middleware/passport';
import { router as home } from './routes/home';
import { router as auth } from './routes/auth';
import { router as users } from './routes/users';
const { NODE_ENV, DB } = CONFIG;

export default class Server {
	public static async createInstance() {
		const server = new Server();
		await server.mongoSetup();
		return server;
	}
	public app: express.Application;
	public mongoose: typeof mongoose;

	private constructor() {
		this.app = express();
		this.setup();
	}

	private setup(): void {
		this.setupMiddleware();
		this.setupRoutes();
	}

	private setupMiddleware() {
		this.app.use(helmet());
		if (NODE_ENV !== 'test')
			NODE_ENV !== 'production'
				? this.app.use(logger('dev'))
				: this.app.use(logger('tiny'));

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(passportMiddleWare(passport).initialize());
		this.app.use(extractUser());
		this.app.use(cors());
	}

	private setupRoutes() {
		this.app.use('/api', home);
		this.app.use('/api/auth', auth);
		this.app.use('/api/users', users);
	}

	private async mongoSetup() {
		try {
			this.mongoose = await mongoose.connect(
				DB,
				{ useNewUrlParser: true }
			);
			this.mongoose.Promise = Promise;
			return this.mongoose;
		} catch (error) {
			console.error('Error connecting to mongo:', error);
			return process.exit(1);
		}
	}
}
