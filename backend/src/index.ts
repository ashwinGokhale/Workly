import Server from './server';
import CONFIG from './config';
const { PORT } = CONFIG;

const start = async () => {
	const server = await Server.createInstance();
	server.app.listen(PORT, () =>
		console.log('CONFIG: ', CONFIG, `\nListening on port: ${PORT}`)
	);
	return server;
};

start();
