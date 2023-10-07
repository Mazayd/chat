const ws = require('ws');
const { config } = require('dotenv');
const { SocketDispatcherController } = require('./src/controllers/socket.dispatcher.controller');

const socketDispatcherController = new SocketDispatcherController();
config();
const port = process.env.PORT || 4000;

const wss = new ws.Server({ port }, () => console.log(`Server started on ${port}`));

wss.on('connection', (ws, req) => {
	console.log('User connected');
	ws.send('you connected');
	ws.on('message', async (message) => {
		const ms = JSON.parse(message);
		await socketDispatcherController.test(ws, ms, wss);
	});
});
