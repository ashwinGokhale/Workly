import Server from './server';
import CONFIG from './config';
const { PORT } = CONFIG;

const start = async () => {
	const server = await Server.createInstance();
	const listener = server.app.listen(PORT, () =>
		console.log('CONFIG: ', CONFIG, `\nListening on port: ${PORT}`)
	);
	return {
		server,
		listener
	};
};

start().then(({ server, listener }) =>
	// Graceful shutdown
	process.on('SIGTERM', async () => {
		listener.close();
		await server.mongoose.disconnect();
		process.exit(0);
	})
);
